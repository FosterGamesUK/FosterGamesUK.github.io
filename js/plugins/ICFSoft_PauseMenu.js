//=============================================================================
// ICF-Soft Plugins
// ICFSoft_PauseMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.ICFSoft_PauseMenu = true;

var ICF = ICF || {};
ICF.PauseMenu = ICF.PauseMenu || {};

ICF.PauseMenu.Version = 101; // 1.01

//=============================================================================
 /*:
 * @plugindesc v1.01b This plugin enables a pause menu to appear instead of menu.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Background Filename
 * @desc An image to overlap map in pictures folder.
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Opacity
 * @desc Opacity for background image.
 * @default 115
 *
 * @param Pause Text
 * @desc Text to show centered when paused.
 * @default Pause
 *
 * @param Font Size
 * @desc Pause text font size.
 * @default 50
 *
 * @param Pause Switch
 * @desc When specified switch is on pause menu will be triggered instead of menu.
 * @default 0
 *
 * @param Skip Switch
 * @desc When specified switch is on a skip scene option will be shown.
 * @default 0
 *
 * @param Skipping Switch
 * @desc Specified switch will be on when skip scene option is triggered.
 * @default 0
 *
 * @help
 * ============================================================================
 * Commisioned by Judahfoster
 * 
 * This plugin enables a pause menu to appear instead of menu.
 * 
 * It works with ICFSoft_ChainCommandEx.
 * 
 * 
 * ============================================================================
 * 
 * For commercial and non-commercial games.
 * Credit to ICF-Soft.
 * This entire header must be included with plugin.
 * 
 * ============================================================================
*/
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_PauseMenu');

ICF.PauseMenu.image = ICF.Parameters['Background Filename'] || '';
ICF.PauseMenu.image = ICF.PauseMenu.image.trim();
ICF.PauseMenu.opacity = Number(ICF.Parameters['Opacity']) || 200;
ICF.PauseMenu.text = ICF.Parameters['Pause Text'].trim() || 'Pause';
ICF.PauseMenu.fontSize = Number(ICF.Parameters['Font Size']) || 50;
ICF.PauseMenu.switch = Number(ICF.Parameters['Pause Switch']) || 0;
ICF.PauseMenu.skipSwitch = Number(ICF.Parameters['Skip Switch']) || 0;
ICF.PauseMenu.skippingSwitch = Number(ICF.Parameters['Skipping Switch']) || 0;

//=============================================================================
// Scene_Map
//=============================================================================

Scene_Map.prototype.updateMainMultiply = function() {
    this.updateMain();
    if (this.isFastForward()) {
        this.updateMain();
    }
    if ($gameSwitches.value(ICF.PauseMenu.switch) && this.isMenuCalled()) {
	this.menuCalling = true;
	this.callMenu();
    }
};

Scene_Map.prototype.updateCallMenu = function() {
    if ($gameSwitches.value(ICF.PauseMenu.switch) && this.isMenuCalled()) {
	this.menuCalling = true;
	this.callMenu();
    } else if (this.isMenuEnabled()) {
	if (this.isMenuCalled()) {
	    this.menuCalling = true;
	}
	if (this.menuCalling && !$gamePlayer.isMoving()) {
	    this.callMenu();
	}
    } else {
	this.menuCalling = false;
    }
};

ICF.PauseMenu.Scene_callMenu = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function() {
    if (!$gameSwitches.value(ICF.PauseMenu.switch)) {
	ICF.PauseMenu.Scene_callMenu.call(this);
	return;
    }
    SoundManager.playOk();
    SceneManager.push(Scene_Pause);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};

//=============================================================================
// Scene_Pause
//=============================================================================

function Scene_Pause() {
	this.initialize.apply(this, arguments);
}

Scene_Pause.prototype = Object.create(Scene_Base.prototype);
Scene_Pause.prototype.constructor = Scene_Pause;

Scene_Pause.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createSpriteset();
};

Scene_Pause.prototype.createBackground = function() {
    this.addChild(new Sprite(SceneManager.backgroundBitmap()));
    this._back = new TilingSprite();
    if (ICF.PauseMenu.image) this._back.bitmap = ImageManager.loadPicture(ICF.PauseMenu.image);
    this._back.move(0, 0, Graphics.width, Graphics.height);
    this._back.opacity = ICF.PauseMenu.opacity;
    this.addChild(this._back);
    this._pauseImg = new Sprite();
    this._pauseImg.bitmap = new Bitmap(Graphics.width / 2, ICF.PauseMenu.fontSize);
    this._pauseImg.bitmap.fontSize = ICF.PauseMenu.fontSize;
    this._pauseImg.bitmap.drawText(ICF.PauseMenu.text, 0, 0, Graphics.width / 2, ICF.PauseMenu.fontSize, 'center');
    this._pauseImg.x = Graphics.width / 4;
    this._pauseImg.y = (Graphics.height - ICF.PauseMenu.fontSize) / 2;
    this.addChild(this._pauseImg);
    this._skipImg = new Sprite();
    this._skipImg.bitmap = new Bitmap(Graphics.width / 3, 22);
    this._skipImg.bitmap.fontSize = 22;
    this._skipImg.bitmap.drawText('Skip scene', 0, 0, Graphics.width / 3, 22, 'center');
    this._skipImg.x = Graphics.width / 3;
    this._skipImg.y = this._pauseImg.y + ICF.PauseMenu.fontSize + 30;
    if ($gameSwitches.value(ICF.PauseMenu.skipSwitch)) this.addChild(this._skipImg);
};

Scene_Pause.prototype.createSpriteset = function() {
    this._pictureCommonEvents = [];
    for (var i = 0; i < $gameScreen._pictures.length; i++) {
      var picture = $gameScreen._pictures[i];
      this._pictureCommonEvents[i] = $gameScreen._pictures[i];
      if (picture) this.addChild(new Sprite_Picture(i));
    }
};

Scene_Pause.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if (this._unpausing) {
	this.popScene();
	return;
    }
    this.processInput();
};

Scene_Pause.prototype.processInput = function() {
    this.updatePictureEvents();
    if (Input.isTriggered('escape') || Input.isTriggered('cancel') || TouchInput.isCancelled()) {
	SoundManager.playOk();
	this._unpausing = true;
	Input._pressedTime++;
	$gameSwitches.setValue(ICF.PauseMenu.skippingSwitch, false);
	return;
    }
    if (TouchInput.isTriggered() && $gameSwitches.value(ICF.PauseMenu.skipSwitch) && TouchInput.x >= this._skipImg.x && TouchInput.x <= this._skipImg.x + this._skipImg.width && TouchInput.y >= this._skipImg.y && TouchInput.y <= this._skipImg.y + this._skipImg.height) {
	SoundManager.playOk();
	this._unpausing = true;
	Input._pressedTime++;
	$gameSwitches.setValue(ICF.PauseMenu.skippingSwitch, true);
	return;
    }
};

Scene_Pause.prototype.updatePictureEvents = function() {
    if (TouchInput.isTriggered()) {
      this.updatePictureEventCheck(ICF.ChainCommandEx.buttons);
    }
};

Scene_Pause.prototype.updatePictureEventCheck = function(check) {
    if (SceneManager.isSceneChanging()) return;
    var picture = this.getTriggeredPictureCommonEvent(check);
    if (!picture) return;
    Input._latestButton = check[picture.pictureId()];
    Input._pressedTime = 0;
};

Scene_Pause.prototype.getTriggeredPictureCommonEvent = function(check) {
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

Scene_Pause.prototype.getPictureSprite = function(picture) {
    this._pictureCommonEventsBind = this._pictureCommonEventsBind || {};
    return this._pictureCommonEventsBind[picture.pictureId()];
};

Scene_Pause.prototype.bindPictureSprite = function(picture, sprite) {
    this._pictureCommonEventsBind = this._pictureCommonEventsBind || {};
    this._pictureCommonEventsBind[picture] = sprite;
};

//=============================================================================
// Window_Message
//=============================================================================

ICF.PauseMenu.startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    if ($gameSwitches.value(ICF.PauseMenu.skippingSwitch)) {
	this.terminateMessage();
    } else {
	ICF.PauseMenu.startMessage.call(this);
    }
};

//=============================================================================
// Game_Picture
//=============================================================================

ICF.PauseMenu.Game_Picture_isTriggered = Game_Picture.prototype.isTriggered;
Game_Picture.prototype.isTriggered = function() {
    if (!SceneManager._scene instanceof Scene_Pause) {
        return ICF.PauseMenu.Game_Picture_isTriggered.call(this);
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
// Game_Interpreter
//=============================================================================

ICF.PauseMenu.Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
Game_Interpreter.prototype.executeCommand = function() {
    if ($gameSwitches.value(ICF.PauseMenu.skippingSwitch) && this._list._skippable) {
	$gameSwitches.setValue(ICF.PauseMenu.skippingSwitch, false);
	SceneManager._scene._messageWindow.terminateMessage();
	for (var i = this._index; i < this._list.length; i++) {
	    var command = this._list[i];
	    if (command.code === 118 && command.parameters[0].toLowerCase() === "skip") {
		this.jumpTo(i);
		return;
	    }
	}
	this.jumpTo(this._list.length - 1);
	return;
    } else {
	return ICF.PauseMenu.Game_Interpreter_executeCommand.call(this);
    }
};

//=============================================================================
// Event Utilities
//=============================================================================

ICF.PauseMenu.ProcessEvent = function(pages) {
    for (i = 0; i < pages.length; i += 1) {
	var page = pages[i];
	for (j = 0; j < page.list.length; j += 1) {
	    var command = page.list[j];
	    if (command.code === 118 && command.parameters[0].toLowerCase() === "skip") {
		page.list._skippable = true;
	    }
	}
    }
}

//=============================================================================
// Game_Event
//=============================================================================

ICF.PauseMenu.initEvent = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    ICF.PauseMenu.initEvent.call(this, mapId, eventId);
    ICF.PauseMenu.ProcessEvent(this.event().pages);
    this.refresh();
};

//=============================================================================
// End of File
//=============================================================================
