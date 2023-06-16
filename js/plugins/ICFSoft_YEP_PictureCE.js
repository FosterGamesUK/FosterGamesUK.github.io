//=============================================================================
// ICF-Soft Plugins - Adition for Yanfly's picture common events
// ICFSoft_YEP_PictureCE.js
//=============================================================================

var Imported = Imported || {};
Imported.ICF_YEP_PictureCE = true;

var ICF = ICF || {};
ICF.YEP_PictureCE = ICF.YEP_PictureCE || {};

ICF.YEP_PictureCE.Version = 100; // 1.00

/*:
 * @plugindesc v1.00 Adition for Yanfly's picture common events.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @help  
 * =============================================================================
 * Commisioned by Judahfoster
 * 
 * This plugin is based on YEP picture common events and must be placed below it.
 * 
 * It add commands that allow to hold and release buttons.
 * 
 * 
 * ============================================================================
 * Plugin commands
 * ============================================================================
 * 
 * HoldButton x
 * 
 *  - Activates a button as held.
 * 
 * ReleaseButton x
 * 
 *  - Releases a button from being helded.
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
// Game_Interpreter
//=============================================================================

ICF.YEP_PictureCE.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    ICF.YEP_PictureCE.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'HoldButton') {
      this.holdButton(args)
    } else if (command === 'ReleaseButton') {
      this.releaseButton(args)
    }
};

Game_Interpreter.prototype.holdButton = function(args) {
  if (!args) return;
  var button = args[0].toLowerCase();
  if (button === 'cancel') button = 'escape';
  if (button === 'dash') button = 'shift';
  if (Input._latestButton != button) {
	Input._latestButton = button;
	Input._pressedTime = 0;
        Input._currentState[button] = true;
  }
};

Game_Interpreter.prototype.releaseButton = function(args) {
  if (!args) return;
  var button = args[0].toLowerCase();
  if (button === 'cancel') button = 'escape';
  if (button === 'dash') button = 'shift';
  Input._currentState[button] = false;
};

//=============================================================================
// End of File
//=============================================================================
