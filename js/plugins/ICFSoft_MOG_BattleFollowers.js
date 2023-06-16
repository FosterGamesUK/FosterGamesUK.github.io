//=============================================================================
// ICF-Soft Plugins - Adition for mog hunter's Chrono Engine
// ICFSoft_MOG_BattleFollowers.js
//=============================================================================

var Imported = Imported || {};
Imported.ICF_MOG_BattleFollowers = true;

var ICF = ICF || {};
ICF.MOG_BattleFollowers = ICF.MOG_BattleFollowers || {};
ICF.NotetagsProcessor = ICF.NotetagsProcessor || {};

ICF.MOG_BattleFollowers.Version = 103; // 1.03

/*:
 * @plugindesc v1.03b Adition for mog hunter's Chrono Engine.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Command Distance
 * @desc Max distance for an enemy to count to be attackable.
 * @default 10
 * 
 * @param Figthing Distance
 * @desc Followers will return if this distance is reached.
 * @default 12
 * 
 * @param Equip Slot Menu Name
 * @desc Name to show in the command menu for equip slots scene.
 * @default Equip Slots
 * 
 * @param Empty Slot Icon
 * @desc Icon to use to draw an emty slot in equip slot menu.
 * @default 16
 * 
 * @param Attack Delay
 * @desc How many frames follower will wait after attacking.
 * @default 10
 * 
 * @param Skill Delay
 * @desc How many frames follower will wait after using an offensive skill.
 * @default 10
 * 
 * @param Healing Delay
 * @desc How many frames follower will wait after healing an ally.
 * @default 10
 * 
 * @help  
 * =============================================================================
 * Commisioned by Judahfoster
 * 
 * This plugin is based on MOG Chrono Engine v0.2b and must be placed below it.
 * 
 * Allows followers to figth enemies automatically. It needs activation
 * througth plugin command.
 * Also allow enemies to notice if a follower has casted an unavoidable skill
 * upon them in a short timelapse, and targeting noticed actors.
 * Enemies can now being reverted to a npc.
 * 
 * =============================================================================
 * Skill and Item Notetags
 * =============================================================================
 *
 * heal tool
 *    Allow followers to use specified skill or item to heal a character with
 *    less than 75% hp automatically.
 *
 * =============================================================================
 * Enemy events (comments)
 * =============================================================================
 *
 * deactivation time : X
 *    Makes an enemy to lose it's enemy behaviour so it stops detecting player
 *    and followers, attacking or been attackable.
 *
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * Command Distance:
 * The maximun distance for an enemy from follower to be considered attackable.
 * 
 * Figthing Distance:
 * If a follower goes too far from player, will forget enemy and go to player.
 * 
 * Equip Slot Menu Name:
 * Name to show in the main menu command for equip slots scene.
 * 
 * Empty Slot Icon:
 * Icon to use to draw an emty slot in equip slot menu.
 * 
 * Attack/Skill/Healing Delay:
 * How many frames follower will wait after performing an action.
 * 
 * ============================================================================
 * Plugin commands
 * ============================================================================
 * 
 * activatefollowersattack
 * 
 *  - Activate the followers attacking functionality.
 * 
 * deactivatefollowersattack
 * 
 *  - Dectivate the followers attacking functionality.
 * 
 * set_actor_skill : ACTOR_ID : TOOL_ID
 * set_actor_skill2 : ACTOR_ID : TOOL_ID
 * set_actor_skill3 : ACTOR_ID : TOOL_ID
 * set_actor_skill4 : ACTOR_ID : TOOL_ID
 * set_actor_skill5 : ACTOR_ID : TOOL_ID
 * 
 *  - Force equips a skill to an actor in specified index.
 * 
 * add_actor_skill : ACTOR_ID : TOOL_ID
 * 
 *  - Force equips a skill to an actor if there is an empty slot.
 * 
 * remove_actor_skill : ACTOR_ID : INDEX
 * 
 *  - Empties a skill slot of an actor.
 * 
 * remove_actor_skills : ACTOR_ID
 * 
 *  - Empties all skill slots of an actor.
 * 
 * =============================================================================
 * CHARACTER SCRIPT COMMANDS
 * =============================================================================
 * 
 * SUBJECT.setTargetAquire(mode)
 * 
 *  - Changes target aquisition mode for enemies.
 *    0: normal, closest actor
 *    1: player only
 *    2: random actor
 *    3: noticed
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

ICF.Parameters = PluginManager.parameters('ICFSoft_MOG_BattleFollowers');

ICF.MOG_BattleFollowers.commandDistance = Number(ICF.Parameters['Command Distance'] || 10);
ICF.MOG_BattleFollowers.figthingDistance = Number(ICF.Parameters['Figthing Distance'] || 12);

ICF.MOG_BattleFollowers.menuName = String(ICF.Parameters['Equip Slot Menu Name'] || 'Equip Slots');
//ICF.MOG_BattleFollowers.emptyName = String(ICF.Parameters['Empty Slot Name'] || 'Empty');
ICF.MOG_BattleFollowers.emptySlot = Number(ICF.Parameters['Empty Slot Icon'] || 16);

ICF.MOG_BattleFollowers.attackDelay = Number(ICF.Parameters['Attack Delay'] || 10);
ICF.MOG_BattleFollowers.skillDelay = Number(ICF.Parameters['Skill Delay'] || 10);
ICF.MOG_BattleFollowers.healDelay = Number(ICF.Parameters['Healing Delay'] || 10);

//=============================================================================
// DataManager
//=============================================================================

ICF.MOG_BattleFollowers.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!ICF.MOG_BattleFollowers.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!ICF.MOG_BattleFollowers.Procesed) {
	ICF.NotetagsProcessor.MOG_BattleFollowers($dataSkills);
	ICF.NotetagsProcessor.MOG_BattleFollowers($dataItems);
	ICF.MOG_BattleFollowers.Procesed = true;
    }
    return true;
};

ICF.NotetagsProcessor.MOG_BattleFollowers = function(group) {
    for (var n = 1; n < group.length; n++) {
	var obj = group[n];
	var notedata = obj.note.split(/[\r\n]+/);

	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i].split(' : ');
		if (line[0].toLowerCase() == "heal tool") {
			obj.isHealItem = true;
		}
	}
    }
};

//=============================================================================
// Input
//=============================================================================

Input.keyMapper[69] = 'e';   // E
Input.keyMapper[82] = 'r';   // R

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.toolSkillID = function(index) {
    if (index == -1) return this._toolSkillActionId;
    if (this._toolSkillSlotActionIds && this._toolSkillSlotActionIds[index]) return this._toolSkillSlotActionIds[index];
    return 0;
};

Game_Actor.prototype.equipToolSkillSlotID = function(index, itemid) {
    if (index < 0) {
	if (!this._toolSkillActionId || this._toolSkillActionId == 0) {
		this.equipToolSkillSlotID(0, itemid);
		return;
	};
	if (!this._toolSkillSlots) this._toolSkillSlots = [];
	if (!this._toolSkillSlotActionIds) this._toolSkillSlotActionIds = [];
	for (var i = 0; i < 4; i++) {
		if (!this._toolSkillSlotActionIds[i] || this._toolSkillSlotActionIds[i] == 0) {
			this.equipToolSkillSlotID(i + 1, itemid);
			return;
		};
	};
    } else if (index == 0) {
	this._toolSkillId = itemid;
	var item = $dataSkills[itemid];
	if (item) {
		this._toolSkillActionId = this.getToolActionID(item);
	} else {
		this._toolSkillActionId = 0;
	};
    } else if (index < 5) {
	if (!this._toolSkillSlots) this._toolSkillSlots = [];
	if (!this._toolSkillSlotActionIds) this._toolSkillSlotActionIds = [];
	this._toolSkillSlots[index] = itemid;
	var item = $dataSkills[itemid];
	if (item) {
		this._toolSkillSlotActionIds[index] = this.getToolActionID(item);
	} else {
		this._toolSkillSlotActionIds[index] = 0;
	};
    }
};

Game_Actor.prototype.removeToolSkillSlotID = function(index) {
    if (index <= 0) {
	this._toolSkillId = 0;
	this._toolSkillActionId = 0;
    } else if (index < 5) {
	if (!this._toolSkillSlots) this._toolSkillSlots = [];
	if (!this._toolSkillSlotActionIds) this._toolSkillSlotActionIds = [];
	this._toolSkillSlots[index] = 0;
	this._toolSkillSlotActionIds[index] = 0;
    }
};

Game_Actor.prototype.removeToolSkillSlots = function() {
    this._toolSkillId = 0;
    this._toolSkillActionId = 0;
    if (!this._toolSkillSlots) this._toolSkillSlots = [];
    if (!this._toolSkillSlotActionIds) this._toolSkillSlotActionIds = [];
    for (var i = 0; i < 4; i++) {
	this._toolSkillSlots[i] = 0;
	this._toolSkillSlotActionIds[i] = 0;
    }
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Game_CharacterBase.prototype.getDistanceTo = function(character) {
	if (!character) return 0;
	return Math.sqrt(Math.pow(this.x - character.x, 2) + Math.pow(this.y - character.y, 2));	
};

Game_CharacterBase.prototype.noticeChar = function(character) {};

//=============================================================================
// Game_Character
//=============================================================================

Game_Character.prototype.setTargetAquire = function(mode) {
    this._targetAquire = mode;
};

Game_Character.prototype.getTarget = function() {
    var target = $gamePlayer;
    if (this._targetAquire == 1) return target;
    if (this._targetAquire == 2) {
	target = [$gamePlayer];
	for (var i = 0; i < characters.length; i++) {
	    if (characters[i].battler() && characters[i].battler().hp > 0) {
		target.push(characters[i]);
	    }
	}
	target = target[Math.randomInt(target.length)];
	if (target) return target;
	return $gamePlayer;
    }
    if (this._targetAquire == 3) {
	if (!this._noticingChars) this._noticingChars = [];
	if (!this._noticingCharFrames) this._noticingCharFrames = [];
	target = this._noticingChars[Math.randomInt(this._noticingChars.length)];
	if (target) return target;
    }
    var distance = Math.abs($gamePlayer.x - this.x) + Math.abs($gamePlayer.y - this.y);
    var characters = $gamePlayer._followers._data;
    for (var i = 0; i < characters.length; i++) {
	if (characters[i].battler() && characters[i].battler().hp > 0 && distance > (Math.abs(characters[i].x - this.x) + Math.abs(characters[i].y - this.y))) {
	    distance = Math.abs(characters[i].x - this.x) + Math.abs(characters[i].y - this.y);
	    target = characters[i];
	}
    }
    return target;
};

Game_Character.prototype.turnTowardPlayer = function() {
    if (!$gameSystem._chronoMode.enabled && (this.battler() instanceof Game_Enemy) && (this.battler().hp > 0)) {
		this.turnTowardCharacter(this.getTarget());
		return;
    }
    this.turnTowardCharacter($gamePlayer);
};

Game_Character.prototype.turnAwayFromPlayer = function() {
    if (!$gameSystem._chronoMode.enabled && (this.battler() instanceof Game_Enemy) && (this.battler().hp > 0)) {
		this.turnAwayFromCharacter(this.getTarget());
		return;
    }
    this.turnAwayFromCharacter($gamePlayer);
};

Game_Character.prototype.moveTowardPlayer = function() {
    if (!$gameSystem._chronoMode.enabled && (this.battler() instanceof Game_Enemy) && (this.battler().hp > 0)) {
		this.moveTowardCharacter(this.getTarget());
		return;
    }
    this.moveTowardCharacter($gamePlayer);
};

Game_Character.prototype.moveAwayFromPlayer = function() {
    if (!$gameSystem._chronoMode.enabled && (this.battler() instanceof Game_Enemy) && (this.battler().hp > 0)) {
		this.moveAwayFromCharacter(this.getTarget());
		return;
    }
    this.moveAwayFromCharacter($gamePlayer);
};

Game_Character.prototype.getTargetCN = function() {  
    if ($gameSystem.isChronoMode()) {return this.battler()._chrono.targets[0]};
    if (this.battler().isEnemy()) {return this.getTarget();}
    return null;
};

//=============================================================================
// Game_Player
//=============================================================================

Game_Player.prototype.commandSkillUsable = function() {
	if (!$gameSystem._chronoCom.skill) {return -1};
	if (Input.isTriggered(Moghunter.ras_buttonSkill)) {return 0};
	if (Input.isTriggered('pageup')) {return 1};
	if (Input.isTriggered('pagedown')) {return 2};
	if (Input.isTriggered('e')) {return 3};
	if (Input.isTriggered('r')) {return 4};
	return -1;		
};

Game_Player.prototype.commandRasSkill = function(index) {
	var actionID =  this.battler().toolSkillID(index - 1);
	if (this.battler()._ras.combo.id != 0) {
		if (this.battler()._ras.combo.type != 1) {
		    this.battler().clearRasCombo();
		   return	
		};
		var actionID = this.battler()._ras.combo.id
	};
	this.act(actionID);
	this.prepareCombo(actionID,1);
};

Game_Player.prototype.updateToolCommand = function() {
	this.battler()._ras.guard.active = false;
	if (this.commandGuardUsable()) {
	    this.commandRasGuard();	
		this.battler()._ras.charge.time = 0;
		this.battler()._ras.charge.time2 = 0;
		this.battler()._ras.charge.charging = false;		
	} else if (this.commandToolUsable()) {
		if (this.commandAttackUsable()) {
			this.commandRasWeapon();
		} else if (this.commandChargeUsable()) {
			this.battler()._ras.charge.time2++;
			if (this.battler()._ras.charge.time2 > 5) {
				if (!this.battler()._ras.charge.charging) {
				   SoundManager.playSoundMX(Moghunter.ras_ChargingSE);
				};
			    this.battler()._ras.charge.charging = true;
				this.battler()._ras.charge.time2 = 6;
			};
			return;
		} else if (this.battler().isChargeMax()) {
			this.commandRasCharge();
			return
		} else if (this.commandItemUsable()) {
			this.commandRasItem();
		} else if (this.commandSkillUsable() > -1) {
			this.commandRasSkill(this.commandSkillUsable());
		};
		this.battler()._ras.charge.time = 0;
		this.battler()._ras.charge.time2 = 0;
		this.battler()._ras.charge.charging = false;		
	};
};

Game_Player.prototype.performTransfer = function() {

    if (this.isTransferring()) {

	this.followers().forgetEnemies();		
        this.setDirection(this._newDirection);

        if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {

            $gameMap.setup(this._newMapId);

            this._needsMapReload = false;

        }

        this.locate(this._newX, this._newY);

        this.refresh();

        this.clearTransferInfo();

    }
};

//=============================================================================
// Game_Follower
//=============================================================================

Game_Follower.prototype.updateChronoFollowerPhase0 = function() {
	if (this.isMoving() || this.isActing() || this.isCasting()) {
		return;
	};
	if (this._waitAction > 0) {
		this._waitAction--;
		return;
	};
	if (this._currentEnemy && !this._currentEnemy.battler()) {
		this._currentEnemy = false;
		this.clearActing();
		if (this.checkHealing()) return;
	};
	if (this._currentEnemy && this._currentEnemy.battler().hp <= 0) {
		this._currentEnemy = false;
		this.clearActing();
		if (this.checkHealing()) return;
	};
	if (this._currentEnemy && this.battler().hp <= 0) {
		this._currentEnemy = false;
		this.clearActing();
		return;
	};
	if (!this._currentEnemy) {
		this.getEnemy();
	};
	if (this._currentEnemy && this.getDistanceTo($gamePlayer) > ICF.MOG_BattleFollowers.figthingDistance) {
		this._currentEnemy = false;
		this.chaseCharacter($gamePlayer);
		return;
	};
	if (this._currentEnemy) {
		var distance = this.getDistanceTo(this._currentEnemy);
		if (distance >= 2) {
			var skills = [];
			var battler = this.battler();
			if (this.checkSkill(battler._toolSkillActionId)) skills.push(0);
			if (!battler._toolSkillSlotActionIds) battler._toolSkillSlotActionIds = [];
			if (this.checkSkill(battler._toolSkillSlotActionIds[0])) skills.push(1);
			if (this.checkSkill(battler._toolSkillSlotActionIds[1])) skills.push(2);
			if (this.checkSkill(battler._toolSkillSlotActionIds[2])) skills.push(3);
			if (this.checkSkill(battler._toolSkillSlotActionIds[3])) skills.push(4);
			if (skills.length > 0) {
				this.turnTowardCharacter(this._currentEnemy);
				this.commandRasSkill(skills[Math.randomInt(skills.length)]);
				this._waitAction = ICF.MOG_BattleFollowers.skillDelay;
			} else {
				this.chaseCharacter(this._currentEnemy);
			}
		} else if (distance > 1) {
			this.moveStraight(this._direction);
		} else if (distance < 1) {
			this.moveBackward();
		} else if (distance == 1) {
			this.turnTowardCharacter(this._currentEnemy);
			this.commandRasWeapon();
			this._waitAction = ICF.MOG_BattleFollowers.attackDelay;
		};
	};
	if (!this._currentEnemy && (!this.battler() || this.battler().hp > 0)) {
		if (!this.checkHealing() && (this.getDistanceTo($gamePlayer) > (this._memberIndex + 0.5))) {
			this.chaseCharacter($gamePlayer);
		}
	};
};

ICF.MOG_BattleFollowers.updateChronoFollower = Game_Follower.prototype.updateChronoFollower;
Game_Follower.prototype.updateChronoFollower = function() {
	if ($gameTemp._followerAttack && !$gameSystem._chronoMode.enabled) this.updateChronoFollowerPhase0();
        ICF.MOG_BattleFollowers.updateChronoFollower.call(this);
};

ICF.MOG_BattleFollowers.initFollower = Game_Follower.prototype.initialize;
Game_Follower.prototype.initialize = function(memberIndex) {
        ICF.MOG_BattleFollowers.initFollower.call(this, memberIndex);
        this.setThrough(false);
        this._waitAction = 0;
};

Game_Follower.prototype.checkSkill = function(skill) {
	if (!skill || skill < 1) return false;
	var tool = $gameMap.toolMapEvents()[skill - 1]._tool;
	var battler = this.battler();
	if (battler.mp < tool.mpCost || battler.tp < tool.tpCost) return false;
	if (!([1, 2, 3, 4, 5, 6].contains(tool.skill.scope))) return false;
	if (tool.position == 1 && tool.autoTarget && this.getDistanceTo(this._currentEnemy) < 8) return true;
	if (tool.position == 2 && tool.projectile && ((this._currentEnemy.x == this.x) || (this._currentEnemy.y == this.y))) return true;
	if (tool.position == 2 && !tool.projectile && this.getDistanceTo(this._currentEnemy) < 4) return true;
	return false;	   	        
};

Game_Follower.prototype.checkHealing = function() {
	this._healTargets = [];
	var characters = $gamePlayer._followers._data;
	if ($gamePlayer.battler().hpRate() < 0.75 && $gamePlayer.battler().hpRate() > 0) {
		this._healTargets.push($gamePlayer);
	}
	for (var i = 0; i < characters.length; i++) {
		if (characters[i].battler() && characters[i].battler().hpRate() < 0.75 && characters[i].battler().hpRate() > 0) {
			this._healTargets.push(characters[i]);
		}
	}
	if (this._healTargets.length < 1) return false;
	var battler = this.battler();
	if (!battler) return false;
	var skill = $dataSkills[battler._toolSkillId];
	if (skill && skill.isHealItem && battler.mp >= skill.mpCost && battler.tp >= skill.tpCost) {
		this.commandRasSkill(0);
		this._waitAction = ICF.MOG_BattleFollowers.healDelay;
		return true;
	}
	if (!battler._toolSkillSlots) battler._toolSkillSlots = [];
	for (var i = 0; i < 4; i++) {
		skill = $dataSkills[battler._toolSkillSlots[i]];
		if (skill && skill.isHealItem && battler.mp >= skill.mpCost && battler.tp >= skill.tpCost) {
			this.commandRasSkill(i + 1);
			this._waitAction = ICF.MOG_BattleFollowers.healDelay;
			return true;
		}
	}
	skill = $dataItems[battler._toolItemId];
	if (skill && skill.isHealItem) {
		this.commandRasItem();
		this._waitAction = ICF.MOG_BattleFollowers.healDelay;
		return true;
	}
	return false;
};

Game_Follower.prototype.getEnemy = function() {
	var enemies = [];
	for (var i = 0; i < $gameMap.events().length; i++) {
	    var enemy = $gameMap.events()[i];
	    if ((enemy.battler() instanceof Game_Enemy) && (enemy.battler().hp > 0)) {
		enemies.push(enemy);
	    }
	}
	var maxDistance = ICF.MOG_BattleFollowers.commandDistance;
	var enemy = null;
	for (var i = 0; i < enemies.length; i++) {
	    var dist = this.getDistanceTo(enemies[i]);
	    if (dist < maxDistance) {
		enemy = enemies[i];
		maxDistance = dist;
	    }
	}
	if (enemy != null) {
		this.setEnemy(enemy);		
	}
};

Game_Follower.prototype.setEnemy = function(enemy) {
	if (!this.battler() || !enemy) {
		this._currentEnemy = false;
		//this.clearActing();
		return;
	};
	if (this._currentEnemy && this._currentEnemy.battler().hp > 0) return;
	this._currentEnemy = enemy;
};

Game_Follower.prototype.isDashing = function() {
	if (this.battler() && this.battler()._ras.hookshotUser[0]) {return false};
	return this._dashing || ($gameTemp._followerAttack && this._currentEnemy);
};

Game_Follower.prototype.commandRasSkill = function(index) {
	var actionID =  this.battler().toolSkillID(index - 1);
	if (this.battler()._ras.combo.id != 0) {
		if (this.battler()._ras.combo.type != 1) {
		    this.battler().clearRasCombo();
		   return	
		};
		var actionID = this.battler()._ras.combo.id
	};
	this.act(actionID);
	this.prepareCombo(actionID,1);
};

Game_Follower.prototype.commandRasWeapon = function() {
	var actionID =  this.battler().toolWeaponID();
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

Game_Follower.prototype.commandRasItem = function() {
	var actionID = $gameSystem._toolActorMode ? this.battler().toolItemID() : $gameParty.tool_id();
	if (this.battler()._ras.combo.id != 0) {
		if (this.battler()._ras.combo.type != 2) {
		    this.battler().clearRasCombo();
		   return	
		};
		var actionID = this.battler()._ras.combo.id
	};
	this.act(actionID);
	this.prepareCombo(actionID,2);
};

Game_Follower.prototype.prepareCombo = function (actionID,type) {
	if (this.isComboAction(actionID,type)) {
		var tool = $gameMap.tool(actionID);
		this.battler()._ras.combo.id = tool.combo.id;
		this.battler()._ras.combo.time = tool.combo.time;
	} else {
		this.battler().clearRasCombo();
	};	
}
;

Game_Follower.prototype.isComboAction = function (actionID,type) {
     if (!$gameMap.toolIsExist(actionID)) {return false};
     var tool = $gameMap.tool(actionID);
     if (tool.combo.id === 0) {return false};
     if (tool.combo.type != type) {return false};
     return true;
};

Game_Follower.prototype.executeAutoTarget = function(toolID) {
	if (this._user.isLeader) {$gameTemp.clearToolCursor()};
	var action = $gameMap.toolEvent(toolID);
	var item = action.item();	
	this._user.autoTarget = null;
	$gameMap.targetsOnScreen();
	var sOpponent = [1, 2, 3, 4, 5, 6];
	var sFriend = [7, 8, 9, 10, 11];
	var scope = item.scope;		
	var scopeOpponent = sOpponent.contains(scope) ? true : false;
	var scopeFriend = sFriend.contains(scope) ? true : false;	
	var battler = [];
	if (scopeFriend) {
		   var battler = this._healTargets? this._healTargets : $gameMap._actorsOnScreen;
		   $gameTemp._autoTarget.targetType = 1;
	} else {
		   var battler = this._currentEnemy? [this._currentEnemy] : $gameMap._enemiesOnScreen;
		   $gameTemp._autoTarget.targetType = 0;
	};
	if (this._user.isLeader) {
	    SoundManager.playEquip();
	    $gameTemp._autoTarget.actionID = toolID;
	    $gameTemp._autoTarget.enabled = true;
	} else {
		var rb = Math.randomInt(battler.length);
		var battler = battler[rb];
		if (battler) {this._user.autoTarget = battler; battler.noticeChar(this)};
	};
};

Game_Follower.prototype.setDirection = function(d) {
    if (!this.isDirectionFixed() && d) {
        this._direction = d;
    }
    this.resetStopCount();
    if (d && this.isDiagonal(d)) {this._user.diagonal = [true,d]};
};

//=============================================================================
// Game_Followers
//=============================================================================

Game_Followers.prototype.chargeToEnemy = function(enemy) {
	for (var i = this._data.length - 1; i >= 0; i--) {

		this._data[i].setEnemy(enemy);
	}

};

Game_Followers.prototype.forgetEnemies = function(enemy) {
	for (var i = this._data.length - 1; i >= 0; i--) {

		this._data[i].setEnemy();
	}

};

_mog_chrono_gfollowers_updateMove = function () {

    for (var i = this._data.length - 1; i >= 0; i--) {

        var precedingCharacter = (i > 0 ? this._data[i - 1] : $gamePlayer);

        if ((!$gameTemp._followerAttack || !this._data[i]._currentEnemy) && (!this._data[i].battler() || this._data[i].battler().hp > 0)) {
	    this._data[i].chaseCharacter(precedingCharacter);

	}
    }

};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.eventDis = function() {
    if ($gameSystem._chronoMode.enabled) {return Math.abs($gamePlayer.x - this.x) + Math.abs($gamePlayer.y - this.y)};
    var distance = Math.abs($gamePlayer.x - this.x) + Math.abs($gamePlayer.y - this.y);
    var characters = $gamePlayer._followers._data;
    for (var i = 0; i < characters.length; i++) {
	if (characters[i].battler() && characters[i].battler().hp > 0) {
	    distance = Math.min(distance, Math.abs(characters[i].x - this.x) + Math.abs(characters[i].y - this.y));
	}
    }
    return distance;
};

Game_Event.prototype.sensor_dis = function() {
    if ($gameSystem._chronoMode.enabled) {return Math.abs($gamePlayer.x - this.x) + Math.abs($gamePlayer.y - this.y)};
    var distance = Math.abs($gamePlayer.x - this.x) + Math.abs($gamePlayer.y - this.y);
    var characters = $gamePlayer._followers._data;
    for (var i = 0; i < characters.length; i++) {
	if (characters[i].battler() && characters[i].battler().hp > 0) {
	    distance = Math.min(distance, Math.abs(characters[i].x - this.x) + Math.abs(characters[i].y - this.y));
	}
    }
    return distance;
};

Game_Event.prototype.noticeChar = function(character) {
    if (!this._noticingChars) this._noticingChars = [];
    if (!this._noticingCharFrames) this._noticingCharFrames = [];
    if (this._noticingChars.indexOf(character) < 0) this._noticingChars.push(character);
    this._noticingCharFrames[this._noticingChars.indexOf(character)] = 600;
};

ICF.MOG_BattleFollowers.eventUpdate = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    ICF.MOG_BattleFollowers.eventUpdate.call(this);
    if (!this._noticingChars) this._noticingChars = [];
    if (!this._noticingCharFrames) this._noticingCharFrames = [];
    if (!this.battler()) return;
    for (var i = this._noticingCharFrames.length - 1; i >= 0; i--) {
	if (this._noticingCharFrames[i] <= 1) {
	    this._noticingChars.splice(i, 1);
	    this._noticingCharFrames.splice(i, 1);
	} else {
	    this._noticingCharFrames[i] = this._noticingCharFrames[i] - 1;
	}
    }
//if(this._user.deactivation && this._user.deactivation % 60 == 0) {
//console.log(this._user.deactivation);}
    if (this._user.deactivation && this._user.initDeactivTime) {
	this._user.deactivation--;
	if (this._user.deactivation <= 0) {
	    this.enemyDeactivate();
	}
    }
    if(this._user.battler && this._user.deactivated) this._user.battler = null;
};

ICF.MOG_BattleFollowers.eventCheckToolComments = Game_Event.prototype.checkToolComments;
Game_Event.prototype.checkToolComments = function() {
    ICF.MOG_BattleFollowers.eventCheckToolComments.call(this);
    if (!this._erased && this.page()) {this.list().forEach(function(l) {
	if (l.code === 108) {var comment = l.parameters[0].split(' : ')
	    if (comment[0].toLowerCase() == "deactivation time"){
		if (!this._user.deactivation) this._user.deactivation = Number(comment[1]);
	    };
	};
    }, this);};
    if (this._user.battler && this._user.deactivated) {
	this._user.battler = null;
	this._user.deactivation = 0;
	this.touchDamage(false);
	this.sensor_effect(false);
    };
//if(this._user.battler && !this._user.deactivated) {
//console.log("Enemy creation");
//console.log(this._user.deactivation);
//console.log(this._user.battler);}
};

Game_Event.prototype.update_sensor = function() {
    if (this._user.deactivated) return;
    var enable   = (this.sensor_dis() <=  this._sensor_range[1]);
    var last_enable = $gameSelfSwitches.value(this.sensor_key());
    if (enable != last_enable) {this.sensor_effect(enable)};
};

Game_Event.prototype.enemyDeactivate = function() {
//console.log("Pre enemy deactivation");
//console.log(this._user.battler);
//console.log($gameSelfSwitches.value(this.sensor_key()));
    this._user.deactivated = true;
    this._user.battler = false;
    this.touchDamage(false);
    this.sensor_effect(false);
//console.log("Post enemy deactivation");
//console.log(this._user.battler);
//console.log($gameSelfSwitches.value(this.sensor_key()));
};

ICF.MOG_BattleFollowers.eventSensor_effect = Game_Event.prototype.sensor_effect;
Game_Event.prototype.sensor_effect = function(enable) {
    if (enable) this._user.initDeactivTime = true;
    ICF.MOG_BattleFollowers.eventSensor_effect.call(this, enable);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

ICF.MOG_BattleFollowers.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
        ICF.MOG_BattleFollowers.pluginCommand.call(this, command, args);
	if (command.toLowerCase() == 'activatefollowersattack') {
		$gameTemp._followerAttack = true;
	} else if (command.toLowerCase() == 'deactivatefollowersattack') {
		$gameTemp._followerAttack = false;
	} else if (command.toLowerCase() == 'set_actor_skill2')  {
		var actorID = Number(args[1]);
		var itemID = Number(args[3]);
		for (var i = 0; i < $gameParty.members().length; i++) {
			var actor = $gameParty.members()[i];
			if (actor._actorId === actorID) {
				actor.equipToolSkillSlotID(1, itemID);
			};
		};
	} else if (command.toLowerCase() == 'set_actor_skill3')  {
		var actorID = Number(args[1]);
		var itemID = Number(args[3]);
		for (var i = 0; i < $gameParty.members().length; i++) {
			var actor = $gameParty.members()[i];
			if (actor._actorId === actorID) {
				actor.equipToolSkillSlotID(2, itemID);
			};
		};
	} else if (command.toLowerCase() == 'set_actor_skill4')  {
		var actorID = Number(args[1]);
		var itemID = Number(args[3]);
		for (var i = 0; i < $gameParty.members().length; i++) {
			var actor = $gameParty.members()[i];
			if (actor._actorId === actorID) {
				actor.equipToolSkillSlotID(3, itemID);
			};
		};
	} else if (command.toLowerCase() == 'set_actor_skill5')  {
		var actorID = Number(args[1]);
		var itemID = Number(args[3]);
		for (var i = 0; i < $gameParty.members().length; i++) {
			var actor = $gameParty.members()[i];
			if (actor._actorId === actorID) {
				actor.equipToolSkillSlotID(4, itemID);
			};
		};
	} else if (command.toLowerCase() == 'add_actor_skill')  {
		var actorID = Number(args[1]);
		var itemID = Number(args[3]);
		for (var i = 0; i < $gameParty.members().length; i++) {
			var actor = $gameParty.members()[i];
			if (actor._actorId === actorID) {
				actor.equipToolSkillSlotID(-1, itemID);
			};
		};
	} else if (command.toLowerCase() == 'remove_actor_skill') {
		var actorID = Number(args[1]);
		var index = Number(args[3]);
		for (var i = 0; i < $gameParty.members().length; i++) {
			var actor = $gameParty.members()[i];
			if (actor._actorId === actorID) {
				actor.removeToolSkillSlotID(index);
			};
		};
	} else if (command.toLowerCase() == 'remove_actor_skills') {
		var actorID = Number(args[1]);
		for (var i = 0; i < $gameParty.members().length; i++) {
			var actor = $gameParty.members()[i];
			if (actor._actorId === actorID) {
				actor.removeToolSkillSlots();
			};
		};
	}
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

ICF.MOG_BattleFollowers.menuCreateCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    ICF.MOG_BattleFollowers.menuCreateCommands.call(this);
    this.addCommand(ICF.MOG_BattleFollowers.menuName, 'equipslots', true);
};

//=============================================================================
// Window_EquipSlots
//=============================================================================

function Window_EquipSlots() {
    this.initialize.apply(this, arguments);
}

Window_EquipSlots.prototype = Object.create(Window_Selectable.prototype);
Window_EquipSlots.prototype.constructor = Window_EquipSlots;

Window_EquipSlots.prototype.initialize = function(x, y) {
    Window_Selectable.prototype.initialize.call(this, x, y, Graphics.boxWidth, 144);//268
};

Window_EquipSlots.prototype.maxCols = function() {
    return 6;
};

Window_EquipSlots.prototype.maxItems = function() {
    return 6;
};

Window_EquipSlots.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    rect.width = 48;
    rect.height = 48;
    rect.x = this.contentsWidth() / 2 - 150 + index * 50;// 192 + index * 50;
    rect.y = 48;//158;
    return rect;
};

Window_EquipSlots.prototype.drawAllItems = function() {
    this.drawInfo();
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

Window_EquipSlots.prototype.drawInfo = function() {
    this.drawText(this._actor.name(), 0, 12, this.contentsWidth(), 'center');
};

Window_EquipSlots.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    var item = this.getItem(index);
    if (item) this.drawIcon(item.iconIndex, rect.x + 8, rect.y + 8);
    else this.drawIcon(ICF.MOG_BattleFollowers.emptySlot, rect.x + 8, rect.y + 8);
};

Window_EquipSlots.prototype.item = function() {
    if (this._index < 0) return null;
    if (this._index == 0) return $dataItems[this._actor._toolItemId];
    if (this._index == 1) return $dataSkills[this._actor._toolSkillId];
    if (!this._actor._toolSkillSlots) this._actor._toolSkillSlots = [];
    if (!this._actor._toolSkillSlotActionIds) this._actor._toolSkillSlotActionIds = [];
    return $dataSkills[this._actor._toolSkillSlots[this._index - 2]];
};

Window_EquipSlots.prototype.getItem = function(index) {
    if (index < 0) return null;
    if (index == 0) return $dataItems[this._actor._toolItemId];
    if (index == 1) return $dataSkills[this._actor._toolSkillId];
    if (!this._actor._toolSkillSlots) this._actor._toolSkillSlots = [];
    return $dataSkills[this._actor._toolSkillSlots[index - 2]];
};

Window_EquipSlots.prototype.setItem = function(itemId) {
    if (this._index < 0) return;
    if (this._index == 0) this._actor._toolItemId = itemId;
    else if (this._index == 1) this._actor._toolSkillId = itemId;
    else this._actor._toolSkillSlots[this._index - 2] = itemId;
};

Window_EquipSlots.prototype.setItemAction = function(itemId) {
    if (this._index < 0) return;
    if (this._index == 0) this._actor._toolItemActionId = itemId;
    else if (this._index == 1) this._actor._toolSkillActionId = itemId;
    else this._actor._toolSkillSlotActionIds[this._index - 2] = itemId;
};

Window_EquipSlots.prototype.getDisables = function() {
    var index = this._index;
    var disables = [];
    if (index == 1) {
	if (this._actor._toolSkillSlots[0] > 0) disables.push(this._actor._toolSkillSlots[0]);
	if (this._actor._toolSkillSlots[1] > 0) disables.push(this._actor._toolSkillSlots[1]);
	if (this._actor._toolSkillSlots[2] > 0) disables.push(this._actor._toolSkillSlots[2]);
	if (this._actor._toolSkillSlots[3] > 0) disables.push(this._actor._toolSkillSlots[3]);
    } else if (index > 1) {
	if (this._actor._toolSkillId > 0) disables.push(this._actor._toolSkillId);
	index = index - 2;
	for (var i = 0; i < 4; i++) {
	    if (index != i && this._actor._toolSkillSlots[i] > 0) disables.push(this._actor._toolSkillSlots[i]);
	}
    }
    return disables;
};

Window_EquipSlots.prototype.updateHelp = function() {
    this._helpWindow.clear();
    var item = this.item();
    this._helpWindow.setItem(item);
    if (this._index == 0 && this._subWindow._category != 'item') {
	this._subWindow._category = 'item';
	this._subWindow.refresh();
    } else if (this._index > 0 && this._subWindow._category != 'skill') {
	this._subWindow._category = 'skill';
	this._subWindow.refresh();
    }
};

Window_EquipSlots.prototype.setActor = function(actor) {
    this._actor = actor;
    this._helpWindow.clear();
    this.refresh();
    this.show();
    this.activate();
    this.reselect();
};

//=============================================================================
// Window_EquipSlotsList
//=============================================================================	

function Window_EquipSlotsList() {
    this.initialize.apply(this, arguments);
}

Window_EquipSlotsList.prototype = Object.create(Window_Selectable.prototype);
Window_EquipSlotsList.prototype.constructor = Window_EquipSlotsList;

Window_EquipSlotsList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._category = 'item';
    this._data = [];
    this._disables = [];
    this._actor = null;
};

Window_EquipSlotsList.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.resetScroll();
    };
};

Window_EquipSlotsList.prototype.maxCols = function() {
    return 2;
};

Window_EquipSlotsList.prototype.spacing = function() {
    return 48;
};

Window_EquipSlotsList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_EquipSlotsList.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_EquipSlotsList.prototype.isCurrentItemEnabled = function() {
    return this._disables.indexOf(this.getId()) < 0;
};

Window_EquipSlotsList.prototype.includesSkill = function(item) {
    var enable = false;
    var abs_mode = false; 
    if (!item) {return false};
    var item_notes = item.note.split(/[\r\n]+/);
    item_notes.forEach(function(note) {
    var note_data = note.split(' : ')
	if (note_data[0].toLowerCase() == "tool id"){
		item.toolID = Number(note_data[1]);
		enable = true;
	} else if (note_data[0].toLowerCase() == "abs mode"){
		abs_mode = true;
	};
    },this);
    return enable && abs_mode;
};

Window_EquipSlotsList.prototype.includesItem = function(item) {
    if (!item) {return false};
    //if (!$gameParty.canUse(item)) {return false};
    switch (this._category) {
    case 'item':
	var enable = false;
	var abs_mode = false;
        if (DataManager.isItem(item)) {;
	    var item_notes = item.note.split(/[\r\n]+/);
            item_notes.forEach(function(note) {
		var note_data = note.split(' : ')
		if (note_data[0].toLowerCase() == "tool id"){
		    item.toolID = Number(note_data[1]);
		    enable = true;
		} else if (note_data[0].toLowerCase() == "abs mode"){
		    abs_mode = true;
		};
	    },this);
	};
	return enable && abs_mode;
    default:
        return false;
    }
};

Window_EquipSlotsList.prototype.makeItemList = function() {
    this.itemIndex = 0;
    if (this._category == 'item') {
	this._data = $gameParty.allItems().filter(function(item) {
	    return this.includesItem(item);
	}, this);
	//if (this.includesItem(null)) {
	    this._data.push(null);
	//};
    } else {
	if (this._actor) {
	    this._data = this._actor.skills().filter(function(item) {
	        return this.includesSkill(item);
	    }, this);
	} else {
	    this._data = [];
	}
	    this._data.push(null);
    }	
};

Window_EquipSlotsList.prototype.selectLast = function() {
    var index = this._data.indexOf($gameParty.lastItem());
    this.select(index >= 0 ? index : 0);
};

Window_EquipSlotsList.prototype.tool = function(index) {
    return  this._data[index]? $gameMap.tool(this._data[index].toolID) : null;
};

Window_EquipSlotsList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
	item.tool = this.tool(index);
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
    } else {
        var rect = this.itemRect(index);
	this.drawIcon(ICF.MOG_BattleFollowers.emptySlot, rect.x + 2, rect.y + 2);
    }
};

Window_EquipSlotsList.prototype.drawItemNumber = function(item, x, y, width) {
    if (item.tool.itemCost) {
	var itemCost = $dataItems[item.tool.itemCost];
	if (itemCost) {
	    this.drawText(':', x, y, width - this.textWidth('00'), 'right');
            this.drawText($gameParty.numItems(itemCost), x, y, width, 'right');
	};
    } else if (item.tool.mpCost > 0) {
        this.drawText(TextManager.mpA + ' '  + item.tool.mpCost, x, y, width, 'right');
    } else if (item.tool.tpCost > 0) {
        this.drawText(TextManager.tpA + ' '  + item.tool.tpCost, x, y, width, 'right');			
    };
};

Window_EquipSlotsList.prototype.numberWidth = function() {
    return this.textWidth('000');
};

Window_EquipSlotsList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_EquipSlotsList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_EquipSlotsList.prototype.reselect = function() {
    if (this._index < 0) this.select(0);
    else this.select(this._index);
};

Window_EquipSlotsList.prototype.getId = function() {
    if (this._data.length == 0 || this._index < 0 || !this.item()) return 0;
    return this._data[this._index].id;
};

Window_EquipSlotsList.prototype.getActionId = function() {
    if (this._data.length == 0 || this._index < 0 || !this.item()) return 0;
    return this._data[this._index].toolID;
};

//=============================================================================
// Scene_EquipSlots
//=============================================================================

function Scene_EquipSlots() {
    this.initialize.apply(this, arguments);
}

Scene_EquipSlots.prototype = Object.create(Scene_ItemBase.prototype);
Scene_EquipSlots.prototype.constructor = Scene_EquipSlots;

Scene_EquipSlots.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Scene_EquipSlots.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createAvailSlotsWindow();
    this.createItemWindow();
    this.start();
};

Scene_EquipSlots.prototype.start = function() {
    Scene_ItemBase.prototype.start.call(this);
    this.refreshActor();
    this._equipSlotsWindow.show();
    this._equipSlotsWindow.activate();
};

Scene_EquipSlots.prototype.createAvailSlotsWindow = function() {
    var wy = this._helpWindow.height;
    this._equipSlotsWindow = new Window_EquipSlots(0, wy);
    this._equipSlotsWindow.setHelpWindow(this._helpWindow);
    this._equipSlotsWindow.select(0);
    this._equipSlotsWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._equipSlotsWindow.setHandler('cancel',   this.popScene.bind(this));
    this._equipSlotsWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._equipSlotsWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._equipSlotsWindow);
};

Scene_EquipSlots.prototype.createItemWindow = function() {
    var wx = 0;
    var wy = this._equipSlotsWindow.y + this._equipSlotsWindow.height;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_EquipSlotsList(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._itemWindow.select(-1);
    this.addWindow(this._itemWindow);
    this._equipSlotsWindow._subWindow = this._itemWindow;
};

Scene_EquipSlots.prototype.refreshActor = function() {
    var actor = this.actor();
    this._equipSlotsWindow.setActor(actor);
    this._itemWindow.setActor(actor);
};

Scene_EquipSlots.prototype.onSlotOk = function() {
    this._itemWindow.activate();
    this._itemWindow.reselect();
    this._itemWindow._disables = this._equipSlotsWindow.getDisables();
};

Scene_EquipSlots.prototype.onSlotCancel = function() {
    SceneManager.pop();
};

Scene_EquipSlots.prototype.onItemOk = function() {
    var itemId = this._itemWindow.getId();
    var actionId = this._itemWindow.getActionId();
    this._itemWindow.deselect();
    this._equipSlotsWindow.setItem(itemId);
    this._equipSlotsWindow.setItemAction(actionId);
    this._equipSlotsWindow.refresh();
    this._equipSlotsWindow.activate();
};

Scene_EquipSlots.prototype.onItemCancel = function() {
    this._itemWindow.deselect();
    this._equipSlotsWindow.activate();
};

Scene_EquipSlots.prototype.onActorChange = function() {
    this.refreshActor();
    this._equipSlotsWindow.activate();
};

//=============================================================================
// Scene_Menu
//=============================================================================

ICF.MOG_BattleFollowers.menuCreateCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    ICF.MOG_BattleFollowers.menuCreateCommandWindow.call(this);
    this._commandWindow.setHandler('equipslots',     this.commandPersonal.bind(this));
};

ICF.MOG_BattleFollowers.menuPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
    ICF.MOG_BattleFollowers.menuPersonalOk.call(this);
    if (this._commandWindow.currentSymbol() == 'equipslots') SceneManager.push(Scene_EquipSlots);
};

//=============================================================================
// End of File
//=============================================================================
