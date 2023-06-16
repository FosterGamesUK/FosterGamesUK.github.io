//=============================================================================
// ICF-Soft Plugins - Adition for mog hunter's actor hud
// ICFSoft_MOG_ActorHud.js
//=============================================================================

var Imported = Imported || {};
Imported.ICF_MOG_ActorHud = true;

var ICF = ICF || {};
ICF.MOG_ActorHud = ICF.MOG_ActorHud || {};

ICF.MOG_ActorHud.Version = 100; // 1.00

/*:
 * @plugindesc v1.00 Adition for mog hunter's actor hud.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Background layer X
 * @desc X position for background layer.
 * @default 0
 *
 * @param Background layer Y
 * @desc Y position for background layer.
 * @default 50
 *
 * @param Second Actor hud X
 * @desc X position for second actor hud.
 * @default 500
 *
 * @param Second Actor hud Y
 * @desc Y position for second actor hud.
 * @default 440
 *
 * @param Layers
 * @desc All item layers from front to back separated by spaces.
 * @default face hpm mpm tpm hpi mpi tpi exp hp mhp mp mmp tp lvl mtp states name back
 *
 * @help  
 * =============================================================================
 * Commisioned by Judahfoster
 * 
 * This plugin is based on MOG Actor Hud v1.9 and must be placed below it.
 * 
 * Allows to move hud background, to have a hud for second character and
 * layering elements.
 * 
 * =============================================================================
 * Layers
 * =============================================================================
 * 
 * face: face graphic
 * hpm hpi hp mhp: hp meter, hp icon, hp number and max hp number
 * mpm mpi mp mmp: mp meter, mp icon, mp number and max mp number
 * tpm tpi tp mtp: tp meter, tp icon, tp number and max tp number
 * exp: experience meter
 * lvl: level number
 * states: status effects
 * name: character name
 * back: background or layer image
 * 
 * =============================================================================
 */
 
//=============================================================================
// PLUGIN PARAMETERS
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_MOG_ActorHud');

ICF.MOG_ActorHud.layerX = Number(ICF.Parameters['Background layer X']) || 0;
ICF.MOG_ActorHud.layerY = Number(ICF.Parameters['Background layer Y']) || 50;

ICF.MOG_ActorHud.secondaryX = Number(ICF.Parameters['Second Actor hud X']) || 500;
ICF.MOG_ActorHud.secondaryY = Number(ICF.Parameters['Second Actor hud Y']) || 440;
   
ICF.MOG_ActorHud.layers = ICF.Parameters['Layers'].trim().split(/\s+/);

//=============================================================================
// Scene Map
//=============================================================================

Scene_Map.prototype.createActorHud = function() {
    this._actorHud = new Actor_Hud();
    this._actorHud.mz = 101;
    this._actorHud2 = new Actor_Hud();
    this._actorHud2.mz = 101;
    this._actorHud2.basedIs = 1;
    this._hudField.addChild(this._actorHud);	
    this._hudField.addChild(this._actorHud2);	
};

//=============================================================================
// Actor_Hud
//=============================================================================

Actor_Hud.prototype.initialize = function(hud_id) {
    Sprite.prototype.initialize.call(this);
    this.visible = false;
    this.basedIs = 0;
    this._data_initial_ref = [0,true];
    this._hud_id = hud_id;
    this._hud_size = [-1,-1,-1,-1];
    this.base_parameter_clear();
    this.load_img();
    if (!$gameSystem._ahud_visible) {this.opacity = 0};
    this.update();
};

Actor_Hud.prototype.need_refreh_bhud = function() {
    if (this._data_initial_ref[1]) {return true};
    if (this._battler != $gameParty.members()[this.basedIs]) {return true};
    return false;
};

Actor_Hud.prototype.refresh_bhud = function() {
    this._data_initial_ref[1] = false;
    this._battler = $gameParty.members()[this.basedIs];
    this._hud_size = [0,0];
    this.base_parameter_clear();
    this.create_base_sprites();
};

Actor_Hud.prototype.refresh_position = function() {
    this.set_hud_position();	 
    this.visible = true;     
    this.create_sprites();
    if (this._layout) {
	this._layout.x = this._pos_x + ICF.MOG_ActorHud.layerX;
	this._layout.y = this._pos_y + ICF.MOG_ActorHud.layerY;
    };
    if (this._face) {
	this._face.x = this._pos_x + Moghunter.ahud_face_pos_x;
	this._face.y = this._pos_y + Moghunter.ahud_face_pos_y;
	this._battler._face_pos = [this._face.x,this._face.y]; 
    };
};

Actor_Hud.prototype.set_hud_position = function() {
    this._hud_size[0] = Moghunter.ahud_pos_x - ($gameMap.tileWidth() / 2);
    this._hud_size[1] = Moghunter.ahud_pos_y - ($gameMap.tileHeight() / 2);
    this._hud_size[2] = Moghunter.ahud_pos_x + this._layout_img.width - $gameMap.tileWidth();
    this._hud_size[3] = Moghunter.ahud_pos_y + this._layout_img.height;	 
    this._pos_x = Moghunter.ahud_pos_x;
    this._pos_y = Moghunter.ahud_pos_y;
    if (this.basedIs == 1) {
	this._pos_x = ICF.MOG_ActorHud.secondaryX;
	this._pos_y = ICF.MOG_ActorHud.secondaryY;
    }
};

Actor_Hud.prototype.create_base_sprites = function() {
    for (var i = ICF.MOG_ActorHud.layers.length - 1; i >= 0; i--) {
	if (ICF.MOG_ActorHud.layers[i] == "face") {
	    this.create_face();
	} else if (ICF.MOG_ActorHud.layers[i] == "back") {
	    this.create_layout();
	} else if (ICF.MOG_ActorHud.layers[i] == "hpm") {
	    this.create_hp_meter();
	} else if (ICF.MOG_ActorHud.layers[i] == "mpm") {
	    this.create_mp_meter();
	} else if (ICF.MOG_ActorHud.layers[i] == "tpm") {
	    this.create_tp_meter();
	} else if (ICF.MOG_ActorHud.layers[i] == "hpi") {
	    this.create_hp_icon();
	} else if (ICF.MOG_ActorHud.layers[i] == "mpi") {
	    this.create_mp_icon();
	} else if (ICF.MOG_ActorHud.layers[i] == "tpi") {
	    this.create_tp_icon();
	} else if (ICF.MOG_ActorHud.layers[i] == "exp") {
	    this.create_exp_meter();
	} else if (ICF.MOG_ActorHud.layers[i] == "hp") {
	    this.create_hp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "mp") {
	    this.create_mp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "tp") {
	    this.create_tp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "mhp") {
	    this.create_maxhp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "mmp") {
	    this.create_maxmp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "mtp") {
	    this.create_maxtp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "lvl") {
	    this.create_level_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "states") {
	    this.create_states();
	} else if (ICF.MOG_ActorHud.layers[i] == "name") {
	    this.create_name();
	}
    }
};

Actor_Hud.prototype.create_sprites = function() {
    for (var i = ICF.MOG_ActorHud.layers.length - 1; i >= 0; i--) {
	if (ICF.MOG_ActorHud.layers[i] == "face") {
	    this.create_face();
	} else if (ICF.MOG_ActorHud.layers[i] == "back") {
	    this.create_layout();
	} else if (ICF.MOG_ActorHud.layers[i] == "hpm") {
	    this.create_hp_meter();
	} else if (ICF.MOG_ActorHud.layers[i] == "mpm") {
	    this.create_mp_meter();
	} else if (ICF.MOG_ActorHud.layers[i] == "tpm") {
	    this.create_tp_meter();
	} else if (ICF.MOG_ActorHud.layers[i] == "hpi") {
	    this.create_hp_icon();
	} else if (ICF.MOG_ActorHud.layers[i] == "mpi") {
	    this.create_mp_icon();
	} else if (ICF.MOG_ActorHud.layers[i] == "tpi") {
	    this.create_tp_icon();
	} else if (ICF.MOG_ActorHud.layers[i] == "exp") {
	    this.create_exp_meter();
	} else if (ICF.MOG_ActorHud.layers[i] == "hp") {
	    this.create_hp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "mp") {
	    this.create_mp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "tp") {
	    this.create_tp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "mhp") {
	    this.create_maxhp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "mmp") {
	    this.create_maxmp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "mtp") {
	    this.create_maxtp_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "lvl") {
	    this.create_level_number();
	} else if (ICF.MOG_ActorHud.layers[i] == "states") {
	    this.create_states();
	} else if (ICF.MOG_ActorHud.layers[i] == "name") {
	    this.create_name();
	}
    }
};

//=============================================================================
// End of File
//=============================================================================
