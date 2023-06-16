//=============================================================================
// ICF-Soft Plugins
// ICFSoft_ChainCommandEx.js
//=============================================================================

var Imported = Imported || {};
Imported.ICFSoft_ChainCommandEx = true;

var ICF = ICF || {};
ICF.ChainCommandEx = ICF.ChainCommandEx || {};

ICF.ChainCommandEx.Version = 100; // 1.00

//=============================================================================
 /*:
 * @plugindesc v1.00 This plugin adds an exit button and makes Chain commands
 * plugin with YEP PCE compatible.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Exit Button X
 * @desc X position for exit button.
 * @default Graphics.width - 45
 *
 * @param Exit Button Y
 * @desc Y position for exit button.
 * @default 5
 *
 * @param Command Buttons
 * @desc New way to add NParams.
 * @type struct<ButtonSet>[]
 * @default ["{\"Id\":\"0\",\"Code\":\"ok\"}"]
 *
 * @help
 * ============================================================================
 * Commisioned by Judahfoster
 * 
 * This plugin adds an exit button to menus and makes Chain commands plugin
 * with Yanfly's picture common events compatible.
 * 
 * Due to how ChainCommands is done buttons have to be configured here.
 * 
 * A file called CloseButton should be placed in "img/system" folder.
 * 
 * ============================================================================
 * 
 * For commercial and non-commercial games.
 * Credit to ICF-Soft.
 * This entire header must be included with plugin.
 * 
 * ============================================================================
*/
/*~struct~ButtonSet:
 * @param Id
 * @desc Id of image to be used.
 * @default 0
 *
 * @param Code
 * @desc Button code that will be triggered when image is touched.
 * @default ok
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_ChainCommandEx');

ICF.ChainCommandEx.buttonX = ICF.Parameters['Exit Button X'] || 'Graphics.width - 45';
ICF.ChainCommandEx.buttonY = ICF.Parameters['Exit Button Y'] || '5';

ICF.ChainCommandEx.buttons = [];

ICF.temp = JSON.parse(ICF.Parameters['Command Buttons']);
for (var i = 0; i < ICF.temp.length; i++) {
	ICF.temp[i] = JSON.parse(ICF.temp[i]);
	if (Number(ICF.temp[i]['Id'])) ICF.ChainCommandEx.buttons[Number(ICF.temp[i]['Id'])] = ICF.temp[i]['Code'];
}

//=============================================================================
// Scene_MenuBase
//=============================================================================

Scene_MenuBase.prototype.createChainCommandEx = function() {
    this.ChainCommandEx = new Sprite_Button();
    this.ChainCommandEx.bitmap = ImageManager.loadSystem('CloseButton');
    this.ChainCommandEx.x = eval(ICF.ChainCommandEx.buttonX);
    this.ChainCommandEx.y = eval(ICF.ChainCommandEx.buttonY);
    this.ChainCommandEx.setClickHandler(this.ChainCommandExFunction.bind(this));
    this.addChild(this.ChainCommandEx);
}

Scene_MenuBase.prototype.ChainCommandExFunction = function() {
    SceneManager.pop();
}

//=============================================================================
// Scene_Menus
//=============================================================================

ICF.ChainCommandEx.createMenu = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    ICF.ChainCommandEx.createMenu.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createMenuOptions = Scene_Options.prototype.create;
Scene_Options.prototype.create = function() {
    ICF.ChainCommandEx.createMenuOptions.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createMenuFile = Scene_File.prototype.create;
Scene_File.prototype.create = function() {
    ICF.ChainCommandEx.createMenuFile.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createMenuSkill = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
    ICF.ChainCommandEx.createMenuSkill.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createMenuStatus = Scene_Status.prototype.create;
Scene_Status.prototype.create = function() {
    ICF.ChainCommandEx.createMenuStatus.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createMenuItem = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
    ICF.ChainCommandEx.createMenuItem.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createMenuName = Scene_Name.prototype.create;
Scene_Name.prototype.create = function() {
    ICF.ChainCommandEx.createMenuName.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createMenuEquip = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
    ICF.ChainCommandEx.createMenuEquip.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createMenuShop = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    ICF.ChainCommandEx.createMenuShop.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createEquipSlotsMenu = Scene_EquipSlots.prototype.create;
Scene_EquipSlots.prototype.create = function() {
    ICF.ChainCommandEx.createEquipSlotsMenu.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createUnleashMenu = Scene_EquipUnleash.prototype.create;
Scene_EquipUnleash.prototype.create = function() {
    ICF.ChainCommandEx.createUnleashMenu.call(this);
    this.createChainCommandEx();
};

ICF.ChainCommandEx.createGameEndMenu = Scene_GameEnd.prototype.create;
Scene_GameEnd.prototype.create = function() {
    ICF.ChainCommandEx.createGameEndMenu.call(this);
    this.createChainCommandEx();
};

//=============================================================================
// Scene_Map
//=============================================================================

ICF.ChainCommandEx.Scene_ChainCommand_create = Scene_ChainCommand.prototype.create;
Scene_ChainCommand.prototype.create = function() {
	ICF.ChainCommandEx.Scene_ChainCommand_create.call(this);
	this.createSpriteset();
};

Scene_ChainCommand.prototype.createSpriteset = function() {
    this._pictureCommonEvents = [];
    for (var i = 0; i < $gameScreen._pictures.length; i++) {
      var picture = $gameScreen._pictures[i];
      this._pictureCommonEvents[i] = $gameScreen._pictures[i];
      if (picture) this.addChild(new Sprite_Picture(i));
    }
};

ICF.ChainCommandEx.Scene_ChainCommand_processInput = Scene_ChainCommand.prototype.processInput;
Scene_ChainCommand.prototype.processInput = function() {
    this.updatePictureEvents();
    ICF.ChainCommandEx.Scene_ChainCommand_processInput.call(this);
};

Scene_ChainCommand.prototype.updatePictureEvents = function() {
    if (TouchInput.isTriggered()) {
      this.updatePictureEventCheck(ICF.ChainCommandEx.buttons);
    }
};

Scene_ChainCommand.prototype.updatePictureEventCheck = function(check) {
    if (SceneManager.isSceneChanging()) return;
    var picture = this.getTriggeredPictureCommonEvent(check);
    if (!picture) return;
    Input._latestButton = check[picture.pictureId()];
    Input._pressedTime = 0;
};

Scene_ChainCommand.prototype.getTriggeredPictureCommonEvent = function(check) {
    var length = check.length;
    var lastpicture = null;
    for (var i = 1; i < length; ++i) {
      var picture = $gameScreen.picture(i);
      if (!check[i]) continue;
      if (!picture) continue;
      var rect = picture.getSpriteRect(this.getPictureSprite(picture));
      lastpicture = picture;
      if (picture.isTriggered()) return picture;
    }
    return null;
};

Scene_ChainCommand.prototype.getPictureSprite = function(picture) {
    this._pictureCommonEventsBind = this._pictureCommonEventsBind || {};
    return this._pictureCommonEventsBind[picture.pictureId()];
};

Scene_ChainCommand.prototype.bindPictureSprite = function(picture, sprite) {
    this._pictureCommonEventsBind = this._pictureCommonEventsBind || {};
    this._pictureCommonEventsBind[picture] = sprite;
};

//=============================================================================
// Game_Picture
//=============================================================================

ICF.ChainCommandEx.Game_Picture_isTriggered = Game_Picture.prototype.isTriggered;
Game_Picture.prototype.isTriggered = function() {
    if (!SceneManager._scene instanceof Scene_ChainCommand) {
        return ICF.ChainCommandEx.Game_Picture_isTriggered.call(this);
    }
    if (this.opacity() <= 0) return false;
    var sp = SceneManager._scene.getPictureSprite(this);
    if (!sp) return false;
    var mx = this.getLocalTouchInputX();
    var my = this.getLocalTouchInputY();
    var rect = this.getSpriteRect(sp);
    return mx >= rect.x &&
           my >= rect.y &&
           mx < (rect.x + rect.width) &&
           my < (rect.y + rect.height);
};

//=============================================================================
// End of File
//=============================================================================
