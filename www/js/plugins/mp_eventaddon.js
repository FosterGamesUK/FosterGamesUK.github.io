//==
// Multiplayer Event Addon v1.0
//==

/*:
 * @plugindesc Event name plates
 * @author Vlue
 *
 * @help Multiplayer Event Addon v1.0
 *   *  Follow me on twitter: https://twitter.com/DaimoniousTails
 *   Or facebook: https://www.facebook.com/DaimoniousTailsGames/
 *   for the most recent updates!
 *   Find all of my work here: http://daimonioustails.weebly.com/
 *
 *    Put a # in front of any event name to have a nameplate. 
 #    Will take most character codes
 *
 */

(function() {
	
	
	Game_Character.prototype.name = function() { return ""; }
	Game_Player.prototype.name = function() { return ""; }//$gameParty.members()[0].name(); }
	Game_Event.prototype.name = function() { return this.event().name; }
	
	Sprite_Character.prototype.setCharacter = function(character) {
		this._character = character;
		this.createNamePlate();
	};
	Sprite_Character.prototype.createNamePlate = function() {
		if(this._character && this._character.name() != "" && this._character.name().indexOf("#") >= 0) {
			this.namePlate = new Window_NamePlate(-48,-96,96+48,36+48);
			this.namePlate.contents.fontSize = 18;
			this.namePlate.opacity = 0;
			this.namePlate.drawTextEx(this._character.name().substr(1),2,0);
			this.addChild(this.namePlate);
		}
	}
	
	function Window_NamePlate() {
		this.initialize.apply(this, arguments);
	}
	Window_NamePlate.prototype = Object.create(Window_Base.prototype);
	Window_NamePlate.prototype.constructor = Window_NamePlate;
	Window_NamePlate.prototype.initialize = function(x, y, width, height) {
		Window_Base.prototype.initialize.call(this,x,y,width,height);
	};
	Window_NamePlate.prototype.resetFontSettings = function() {
		this.contents.fontFace = this.standardFontFace();
		this.resetTextColor();
	};
	
})();