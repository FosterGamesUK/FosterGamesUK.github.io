//=============================================================================
// ICF-Soft Plugins - Adition for mog hunter's Chrono Engine
// ICFSoft_MOG_ToolHud.js
//=============================================================================

var Imported = Imported || {};
Imported.ICF_MOG_ToolHud = true;

var ICF = ICF || {};
ICF.MOG_ToolHud = ICF.MOG_ToolHud || {};

ICF.MOG_ToolHud.Version = 100; // 1.00

/*:
 * @plugindesc v1.00 Adition for mog hunter's Chrono Engine.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Skill Hud 2 X-Axis
 * @desc X axis for this skill slot.
 * @default 350
 * 
 * @param Skill Hud 2 Y-Axis
 * @desc Y axis for this skill slot.
 * @default 512
 * 
 * @param Skill Hud 3 X-Axis
 * @desc X axis for this skill slot.
 * @default 392
 * 
 * @param Skill Hud 3 Y-Axis
 * @desc Y axis for this skill slot.
 * @default 512
 * 
 * @param Skill Hud 4 X-Axis
 * @desc X axis for this skill slot.
 * @default 434
 * 
 * @param Skill Hud 4 Y-Axis
 * @desc Y axis for this skill slot.
 * @default 512
 * 
 * @param Skill Hud 5 X-Axis
 * @desc X axis for this skill slot.
 * @default 480
 * 
 * @param Skill Hud 5 Y-Axis
 * @desc Y axis for this skill slot.
 * @default 512
 * 
 * @help  
 * =============================================================================
 * Commisioned by Judahfoster
 * 
 * This plugin is based on MOG Chrono ToolHud v1.2 and must be placed below it.
 * 
 * Allows to show 4 extra skill slots. This plugin is visual and needs the
 * plugin that enable and use them.
 * 
 * ============================================================================
 * Plugin commands
 * ============================================================================
 * 
 * The following plugin commands have been modified to include all skill slots:
 * 
 *    -tool_skill_visible
 *    -tool_hud_visible
 * 
 * When skill slot is enabled all skill slots become enabled too. Same for
 * disable. To show all skill slots just use "tool_skill_visible" plugin
 * command.
 * 
 * =============================================================================
 */
 
//=============================================================================
// PLUGIN PARAMETERS
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_MOG_ToolHud');

ICF.MOG_ToolHud.skillHud2X = Number(ICF.Parameters['Skill Hud 2 X-Axis'] || 350);
ICF.MOG_ToolHud.skillHud2Y = Number(ICF.Parameters['Skill Hud 2 Y-Axis'] || 512);
ICF.MOG_ToolHud.skillHud3X = Number(ICF.Parameters['Skill Hud 3 X-Axis'] || 392);
ICF.MOG_ToolHud.skillHud3Y = Number(ICF.Parameters['Skill Hud 3 Y-Axis'] || 512);
ICF.MOG_ToolHud.skillHud4X = Number(ICF.Parameters['Skill Hud 4 X-Axis'] || 434);
ICF.MOG_ToolHud.skillHud4Y = Number(ICF.Parameters['Skill Hud 4 Y-Axis'] || 512);
ICF.MOG_ToolHud.skillHud5X = Number(ICF.Parameters['Skill Hud 5 X-Axis'] || 480);
ICF.MOG_ToolHud.skillHud5Y = Number(ICF.Parameters['Skill Hud 5 Y-Axis'] || 512);

//=============================================================================
// Game_System
//=============================================================================

ICF.MOG_ToolHud.gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	ICF.MOG_ToolHud.gsys_initialize.call(this);
	var v = String(Moghunter.toolHud_StartVisible) === 'true' ? true : false;
	for (var i = 4; i < 8; i++) {
	     this._toolHudVisible[i] = v
	};
};

//=============================================================================
// Game_Interpreter
//=============================================================================

ICF.MOG_ToolHud.setChronoInterpreter = Game_Interpreter.prototype.setChronoInterpreter;
Game_Interpreter.prototype.setChronoInterpreter = function(command, args) {
	ICF.MOG_ToolHud.setChronoInterpreter.call(this,command, args);
	if (command === "tool_skill_visible")  {
		var value = String(args[1]) == "true" ? true : false;
		$gameSystem._toolHudVisible[1] = value;
		$gameSystem._toolHudVisible[4] = value;
		$gameSystem._toolHudVisible[5] = value;
		$gameSystem._toolHudVisible[6] = value;
		$gameSystem._toolHudVisible[7] = value;
	};		
	if (command === "tool_hud_visible")  {
		var value = String(args[1]) == "true" ? true : false;
		$gameSystem._toolHudVisible[0] = value;
		$gameSystem._toolHudVisible[1] = value;
		$gameSystem._toolHudVisible[2] = value;
		$gameSystem._toolHudVisible[3] = value;
		$gameSystem._toolHudVisible[4] = value;
		$gameSystem._toolHudVisible[5] = value;
		$gameSystem._toolHudVisible[6] = value;
		$gameSystem._toolHudVisible[7] = value;
	};
};

//=============================================================================
// Scene_Map
//=============================================================================

Scene_Map.prototype.createToolHud = function() {
	this._toolHud = [];
	for (var i = 0; i < 8; i++) {
        this._toolHud[i] = new ToolHud(i);
		this._toolHud[i].mz = 120;
		this._hudField.addChild(this._toolHud[i]);
	};
};

//=============================================================================
// ToolHud
//=============================================================================

ToolHud.prototype.setItemID = function() {
	if (this._index === 0) {
	    var toolID = $gameSystem._toolActorMode ? this._actor._toolItemId : $gameParty.tool_id();
		this._itemID = toolID;
	} else if (this._index === 1) {
	    var toolID = this._actor._toolSkillId;
		this._itemID = toolID;	
	} else if (this._index === 2) {
		var toolID = this._actor.equips()[0] ? this._actor.equips()[0].id : null;
		this._itemID = toolID;
	} else if (this._index === 3) {
		var toolID = this._actor.equips()[1] ? this._actor.equips()[1].id : null;
		this._itemID = toolID;
	} else if (this._index === 4) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[0] : null;
		this._itemID = toolID;
	} else if (this._index === 5) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[1] : null;
		this._itemID = toolID;
	} else if (this._index === 6) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[2] : null;
		this._itemID = toolID;
	} else if (this._index === 7) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[3] : null;
		this._itemID = toolID;
	};
};

ToolHud.prototype.getItems = function() {
	if (!this._actor) {return null};
	if (this._index === 0) {
	    var toolID = $gameSystem._toolActorMode ? this._actor._toolItemId : $gameParty.tool_id();
		return $dataItems[toolID];
	};
	if (this._index === 1) {
	    var toolID = this._actor._toolSkillId;
		return $dataSkills[toolID];		
	};
	if (this._index === 2) {
		return this._actor.equips()[0];
	};
	if (this._index === 3) {
		return this._actor.equips()[1];
	};
	if (this._index === 4) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[0] : null;
		return $dataSkills[toolID];		
	};
	if (this._index === 5) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[1] : null;
		return $dataSkills[toolID];		
	};
	if (this._index === 6) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[2] : null;
		return $dataSkills[toolID];		
	};
	if (this._index === 7) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[3] : null;
		return $dataSkills[toolID];		
	};
	return null;
};

ToolHud.prototype.getBitmap = function() {
	if (this._index === 0) {return ImageManager.loadRas("Tool_Item")};
	if ([1,4,5,6,7].contains(this._index)) {return ImageManager.loadRas("Tool_Skill")};
	if (this._index === 2) {return ImageManager.loadRas("Tool_Weapon")};
	if (this._index === 3) {return ImageManager.loadRas("Tool_Shield")};
	return null;
};

ToolHud.prototype.getPosition = function(type) {
	if (this._index === 0) {
		if (type === 0) {
	        return Number(Moghunter.toolHud_ItemX);
		} else {
		    return Number(Moghunter.toolHud_ItemY);
		};
	} else if (this._index === 1) {
		if (type === 0) {
			return Number(Moghunter.toolHud_SkillX);
		} else {
			return Number(Moghunter.toolHud_SkillY);
		};
	} else if (this._index === 2) {
		if (type === 0) {
			return Number(Moghunter.toolHud_WeaponX);
		} else {
			return Number(Moghunter.toolHud_WeaponY);
		};
	} else if (this._index === 3) {
		if (type === 0) {
			return Number(Moghunter.toolHud_ShieldX);
		} else {
			return Number(Moghunter.toolHud_ShieldY);
		};
	} else if (this._index === 4) {
		if (type === 0) {
			return Number(ICF.MOG_ToolHud.skillHud2X);
		} else {
			return Number(ICF.MOG_ToolHud.skillHud2Y);
		};
	} else if (this._index === 5) {
		if (type === 0) {
			return Number(ICF.MOG_ToolHud.skillHud3X);
		} else {
			return Number(ICF.MOG_ToolHud.skillHud3Y);
		};
	} else if (this._index === 6) {
		if (type === 0) {
			return Number(ICF.MOG_ToolHud.skillHud4X);
		} else {
			return Number(ICF.MOG_ToolHud.skillHud4Y);
		};
	} else if (this._index === 7) {
		if (type === 0) {
			return Number(ICF.MOG_ToolHud.skillHud5X);
		} else {
			return Number(ICF.MOG_ToolHud.skillHud5Y);
		};
	};
};
	
ToolHud.prototype.needRefreshByID = function() {
	if (this._index === 0) {
	    var toolID = $gameSystem._toolActorMode ? this._actor._toolItemId : $gameParty.tool_id();
		if (toolID != this._itemID) {return true};
	} else if (this._index === 1) {
	    var toolID = this._actor._toolSkillId;
		if (toolID != this._itemID) {return true};	
	} else if (this._index === 2) {
		var toolID = this._actor.equips()[0] ? this._actor.equips()[0].id : null;
		if (toolID != this._itemID) {return true};
	} else if (this._index === 3) {
		var toolID = this._actor.equips()[1] ? this._actor.equips()[1].id : null;
		if (toolID != this._itemID) {return true};
	} else if (this._index === 4) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[0] : null;
		if (toolID != this._itemID) {return true};
	} else if (this._index === 5) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[1] : null;
		if (toolID != this._itemID) {return true};
	} else if (this._index === 6) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[2] : null;
		if (toolID != this._itemID) {return true};
	} else if (this._index === 7) {
		var toolID = this._actor._toolSkillSlots ? this._actor._toolSkillSlots[3] : null;
		if (toolID != this._itemID) {return true};
	};
	return false;
};

//=============================================================================
// End of File
//=============================================================================
