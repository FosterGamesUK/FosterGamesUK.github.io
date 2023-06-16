//=============================================================================
// ICF-Soft Plugins - Adition for Yanfly's weapon unleash
// ICFSoft_YEP_WUnleash.js
//=============================================================================

var Imported = Imported || {};
Imported.ICF_YEP_WUnleash = true;

var ICF = ICF || {};
ICF.YEP_WUnleash = ICF.YEP_WUnleash || {};

ICF.YEP_WUnleash.Version = 101; // 1.01

/*:
 * @plugindesc v1.01b Adition for Yanfly's weapon unleash.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Ability Skill Type
 * @desc Skill type for skills to be considered abilities.
 * @default 2
 * 
 * @param Menu Name
 * @desc Menu name for unleashes menu.
 * @default Unleashes
 * 
 * @help  
 * =============================================================================
 * Commisioned by Judahfoster
 * 
 * This plugin is based on YEP Weapon Unleash v1.05 and MOG Chrono Engine v0.2b
 * so must be placed below both.
 * 
 * Allows learned unleash skills to be activated/deactivated througth a menu and
 * compatibility for YEP Weapon Unleash and MOG Chrono Engine plugins.
 * 
 * 
 * ============================================================================
 * 
 * For commercial and non-commercial games.
 * Credit to ICF-Soft.
 * This entire header must be included with plugin.
 * 
 * =============================================================================
 */
 
//=============================================================================
// PLUGIN PARAMETERS
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_YEP_WUnleash');

ICF.YEP_WUnleash.skilType = Number(ICF.Parameters['Ability Skill Type'] || 2);
ICF.YEP_WUnleash.menuName = String(ICF.Parameters['Menu Name'] || "Unleashes");

//=============================================================================
// Game_Actor
//=============================================================================

/*ICF.YEP_WUnleash.weaponUnleashes = Game_Actor.prototype.weaponUnleashes;
Game_Actor.prototype.weaponUnleashes = function() {
    var arr = ICF.YEP_WUnleash.weaponUnleashes.call(this);
    if (!this._lockedUnleasses) this._lockedUnleasses = [];
    for (var i = arr.length - 1; i >= 0; i--) {
	if (this._lockedUnleasses.contains(arr[i])) {
	    arr.splice(i, 1);
	}
    }
    return arr;
};

ICF.YEP_WUnleash.guardUnleashes = Game_Actor.prototype.guardUnleashes;
Game_Actor.prototype.guardUnleashes = function() {
    var arr = ICF.YEP_WUnleash.guardUnleashes.call(this);
    if (!this._lockedUnleasses) this._lockedUnleasses = [];
    for (var i = arr.length - 1; i >= 0; i--) {
	if (this._lockedUnleasses.contains(arr[i])) {
	    arr.splice(i, 1);
	}
    }
    return arr;
};*/

Game_Actor.prototype.switchUnleashSkill = function(isWeapon) {
    var unleashes = [];
    if (isWeapon) {
        unleashes = this.weaponUnleashes();
    } else {
        unleashes = this.guardUnleashes();
    }
    var length = unleashes.length;
    for (var i = 0; i < length; ++i) {
       var unleash = unleashes[i];
       if (unleash.length < 3) continue;
       var skillId = unleash[0];
       var skill = $dataSkills[skillId];
       if (!skill) continue;
       if (!this.canUse(skill)) continue;
       if (skill.stypeId != ICF.YEP_WUnleash.skilType) continue;
       if (!this._skills.contains(skillId)) continue;
       if (!this._lockedUnleasses) this._lockedUnleasses = [];
       if (this._lockedUnleasses.contains(skillId)) continue;
       if (isWeapon) {
           var rate = this.getWeaponUnleashRate(unleash);
       } else {
           var rate = this.getGuardUnleashRate(unleash);
       }
       if (Math.random() > rate) continue;
       skill = this.checkActionID(skill);
       if (skill) return skill;
    }
    return 0;
};

//=============================================================================
// Game_Player
//=============================================================================

Game_Player.prototype.commandRasWeapon = function() {
	var actionID = this.battler().switchUnleashSkill(true);
	if (actionID > 0) {
		this.act(actionID);
		return;
	};
	actionID =  this.battler().toolWeaponID();
	if (this.battler()._ras.combo.id != 0) {
		if (this.battler()._ras.combo.type != 0) {
		    this.battler().clearRasCombo();
		   return;	
		};
		var actionID = this.battler()._ras.combo.id
	};
	this.act(actionID)
	this.prepareCombo(actionID,0);
};

//=============================================================================
// Game_Follower
//=============================================================================

Game_Follower.prototype.commandRasWeapon = function() {
	var actionID = this.battler().switchUnleashSkill(true);
	if (actionID > 0) {
		this.act(actionID);
		return;
	};
	actionID =  this.battler().toolWeaponID();
	if (this.battler()._ras.combo.id != 0) {
		if (this.battler()._ras.combo.type != 0) {
		   this.battler().clearRasCombo();
		   return;	
		};
		var actionID = this.battler()._ras.combo.id;
	};
	this.act(actionID);
	this.prepareCombo(actionID,0);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

ICF.YEP_WUnleash.menuCreateCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    ICF.YEP_WUnleash.menuCreateCommands.call(this);
    this.addCommand(ICF.YEP_WUnleash.menuName, 'equipunleash', true);
};

//=============================================================================
// Window_UnleashStatus
//=============================================================================

function Window_UnleashStatus() {
    this.initialize.apply(this, arguments);
}

Window_UnleashStatus.prototype = Object.create(Window_Base.prototype);
Window_UnleashStatus.prototype.constructor = Window_UnleashStatus;

Window_UnleashStatus.prototype.initialize = function(x, y) {
    Window_Base.prototype.initialize.call(this, x, y, 200, 260);
    this._actor = null;
    this.refresh();
};

Window_UnleashStatus.prototype.refresh = function() {
    this.contents.clear();
    if (!this._actor) return;
    this.drawText(this._actor.name(), 0, 12, this.contentsWidth(), 'center');
    this.drawActorFace(this._actor, 12, 58, 144, 144);
};

Window_UnleashStatus.prototype.setActor = function(actor) {
    this._actor = actor;
    this.refresh();
    this.show();
};

//=============================================================================
// Window_UnleashSkillList
//=============================================================================	

function Window_UnleashSkillList() {
    this.initialize.apply(this, arguments);
}

Window_UnleashSkillList.prototype = Object.create(Window_Selectable.prototype);
Window_UnleashSkillList.prototype.constructor = Window_UnleashSkillList;

Window_UnleashSkillList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._data = [];
    this._actor = null;
};

Window_UnleashSkillList.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
	if (this._index >= this.maxItems()) this.select(this.maxItems() - 1);
        this.resetScroll();
    };
};

Window_UnleashSkillList.prototype.maxCols = function() {
    return 1;
};

Window_UnleashSkillList.prototype.spacing = function() {
    return 48;
};

Window_UnleashSkillList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_UnleashSkillList.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_UnleashSkillList.prototype.isCurrentItemEnabled = function() {
    return true;
};

Window_UnleashSkillList.prototype.includesSkill = function(item) {
    if (!item) {return false};
    return item.stypeId == ICF.YEP_WUnleash.skilType;
};

Window_UnleashSkillList.prototype.makeItemList = function() {
    if (this._actor) {
	this._data = this._actor.skills().filter(function(item) {
	    return this.includesSkill(item);
	}, this);
    } else {
	this._data = [];
    }
};

Window_UnleashSkillList.prototype.selectLast = function() {
    var index = this._data.indexOf($gameParty.lastItem());
    this.select(index >= 0 ? index : 0);
};

Window_UnleashSkillList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(!this.isLocked(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};

Window_UnleashSkillList.prototype.drawItemNumber = function(item, x, y, width) {
    if (item.itemCost) {
	var itemCost = $dataItems[item.itemCost];
	if (itemCost) {
	    this.drawText(':', x, y, width - this.textWidth('00'), 'right');
            this.drawText($gameParty.numItems(itemCost), x, y, width, 'right');
	};
    } else if (item.mpCost > 0) {
        this.drawText(TextManager.mpA + ' '  + item.mpCost, x, y, width, 'right');
    } else if (item.tpCost > 0) {
        this.drawText(TextManager.tpA + ' '  + item.tpCost, x, y, width, 'right');			
    };
};

Window_UnleashSkillList.prototype.isLocked = function(item) {
    var actor = this._actor;
    var skillId = item.id;
    if (!actor._lockedUnleasses) actor._lockedUnleasses = [];
    return actor._lockedUnleasses.contains(skillId);
};

Window_UnleashSkillList.prototype.numberWidth = function() {
    return this.textWidth('000');
};

Window_UnleashSkillList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_UnleashSkillList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_UnleashSkillList.prototype.reselect = function() {
    if (this._index < 0) this.select(0);
    else this.select(this._index);
};

//=============================================================================
// Scene_EquipUnleash
//=============================================================================

function Scene_EquipUnleash() {
    this.initialize.apply(this, arguments);
}

Scene_EquipUnleash.prototype = Object.create(Scene_ItemBase.prototype);
Scene_EquipUnleash.prototype.constructor = Scene_EquipUnleash;

Scene_EquipUnleash.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Scene_EquipUnleash.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createStatusWindow();
    this.createSkillsWindow();
    this.start();
};

Scene_EquipUnleash.prototype.start = function() {
    Scene_ItemBase.prototype.start.call(this);
    this.refreshActor();
    this._statusWindow.show();
    this._skillWindow.activate();
    this._skillWindow.select(0);
};

Scene_EquipUnleash.prototype.createStatusWindow = function() {
    var wy = this._helpWindow.height;
    this._statusWindow = new Window_UnleashStatus(0, wy);
    this.addWindow(this._statusWindow);
};

Scene_EquipUnleash.prototype.createSkillsWindow = function() {
    var wx = this._statusWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = Graphics.boxHeight - wy;
    this._skillWindow = new Window_UnleashSkillList(wx, wy, ww, wh);
    this._skillWindow.setHelpWindow(this._helpWindow);
    this._skillWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._skillWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._skillWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._skillWindow.setHandler('pageup',   this.previousActor.bind(this));
    this._skillWindow.select(0);
    this.addWindow(this._skillWindow);
};

Scene_EquipUnleash.prototype.refreshActor = function() {
    var actor = this.actor();
    this._statusWindow.setActor(actor);
    this._skillWindow.setActor(actor);
};

Scene_EquipUnleash.prototype.onItemOk = function() {
    var actor = this.actor();
    if (!this._skillWindow.item()) {
	this._skillWindow.activate();
	return;
    }
    var skillId = this._skillWindow.item().id;
    if (!actor._lockedUnleasses) actor._lockedUnleasses = [];
    if (actor._lockedUnleasses.contains(skillId)) {
	actor._lockedUnleasses.splice(actor._lockedUnleasses.indexOf(skillId), 1);
    } else {
	actor._lockedUnleasses.push(skillId);
    }
    this._skillWindow.refresh();
    this._skillWindow.activate();
};

Scene_EquipUnleash.prototype.onItemCancel = function() {
    SceneManager.pop();
};

Scene_EquipUnleash.prototype.onActorChange = function() {
    this.refreshActor();
    this._skillWindow.activate();
};

//=============================================================================
// Scene_Menu
//=============================================================================

ICF.YEP_WUnleash.menuCreateCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    ICF.YEP_WUnleash.menuCreateCommandWindow.call(this);
    this._commandWindow.setHandler('equipunleash',     this.commandPersonal.bind(this));
};

ICF.YEP_WUnleash.menuPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
    ICF.YEP_WUnleash.menuPersonalOk.call(this);
    if (this._commandWindow.currentSymbol() == 'equipunleash') SceneManager.push(Scene_EquipUnleash);
};

//=============================================================================
// End of File
//=============================================================================
