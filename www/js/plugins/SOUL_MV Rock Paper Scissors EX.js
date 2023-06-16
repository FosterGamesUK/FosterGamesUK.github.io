// -------------------------------------------------------------------------------------------------------------------------------
// SOUL_MV Rock Paper Scissors EX.js
// Author: Soulpour777
// -------------------------------------------------------------------------------------------------------------------------------
/*:
* @plugindesc v1.0 Adds a Rock Paper Scissors mini game in your RPG.
* @author Soulpour777 - soulxregalia.wordpress.com
*

* @help

SOUL_MV Rock Paper Scissors EX
Author: Soulpour777

Note: Never rename the plugin, or else, it will not work. I
insist that you stick to how I named it.

Plugin Commands:

load_rps_game 				starts / loads the RPS game.
rps actor_portrait x 		where x is the actor portrait you want to show for the actor.
rps enemy_portrait x 		where x is the enemy portrait you want to show for the enemy.
reset rps 					resets the actor and enemy's score as well as the turn phases.
set rps turns x 			where x is the number of turns you want to have a Rock Paper Scissors match with the enemy

set rps music n v p z
where n is the bgm name
where v is the bgm volume
where p is the bgm pitch
where z is the bgm pan. (always use 0 if you're not familiar how Pan works) 

set actor voice n v p z
where n is the actor voice name
where v is the actor voice volume
where p is the actor voice pitch
where z is the actor voice pan

set enemy voice n v p z
where n is the enemy voice name
where v is the enemy voice volume
where p is the enemy voice pitch
where z is the enemy voice pan

set rps stage background x	where x is the background image you want to use
set rps stage still_frame x	where x is the frame image you want to use
set actor_name_image x		where x is the actor's name image you want to show
set actor_name x value		where value is the x axis of the actor name image
set actor_name y value		where value is the y axis of the actor name image
set enemy_name_image x		where x is the enemy's name image you want to show
set enemy_name x value		where value is the x axis of the enemy name image
set enemy_name y value		where value is the y axis of the enemy name image
set actor_portrait x		where x is the x axis of the actor's portrait
set actor_portrait y		where y is the y axis of the actor's portrait
set enemy_portrait x		where x is the x axis of the enemy's portrait
set enemy_portrait y		where y is the y axis of the enemy's portrait

Troubleshooting:

Q: I have no background and still frame shown in my mini game.
What happened?

A: You must set it in the stage you want to change. By default,
it uses the stock backgrounds I provided or those that you
provided from the Plugin Manager.

Q: How does the Slide Animation really work for my portraits?
I tried turning it off. I set my values to a reasonable
number but they are not showing.

A: The slide animation is a way to give a bit of an effect
for the actors. If you are not using the slide animation,
what you need to understand is that the portraits
stay on the top of the Still Frame. So if you set the
x and y of the Portrait, make sure they are on the
x and y location visible from the Still Frame's top.
If you are using the Slide Animation, make sure that you
set the x and y to the outside offset of the screen,
so when the game starts, it slides them until it reaches
the range you indicated from the Plugin Manager.

Actor Portrait goes from Left Offset to Right Offset
while Enemy Portraits goes from Right Offset to Left Offset.

Q: How can I make more than 1 match in the mini game?

Use the plugin command set rps turns. For example,
you want to have 10 matches. In a plugin command,
do:

set rps turns 10

This means that the match will end its judgement
after 10 match turns. If you cancel during
the match and it has not yet finished, you
get to choose to forfeit or continue.

Terms of Use:

 - You are free to use this for commercial and
 non commercial use.
 - You must give credit to Soulpour777 upon usage.
 - You can use this plugin for any IGMC purposes.
 - You can adapt or change this plugin, as long as
 Soulpour777 is still credited and the original
 terms are in tact.
 - You are not allowed to sell this plugin,
 even if you modified it.


* @param -- MAIN --
*
* @param Default Background
* @desc The default background used on your RPS Mini Game.
* @default CrossedSwords
*
* @param Default Frame
* @desc The default still frame used on your RPS Mini Game.
* @default StillFrame
*
* @param Scores Name
* @desc The Text value name for the actor and enemy scores.
* @default Score
*
* @param Match Name
* @desc The Text value name for the match phases.
* @default Match Remaining
*
*
* @param Slide Portraits
* @desc Would you like to use the sliding of actors? (true / false). You have to set the x and y properly if you choose false.
* @default true
*
* @param Slide Speed
* @desc Speed of the sliding motion for the portraits.
* @default 40
*
* @param Actor Slide Range
* @desc The x axis needed before the Actor's Portrait actually stops. (Left to Right)
* @default -80
*
* @param Enemy Slide Range
* @desc The x axis needed before the Enemy's Portrait actually stops. (Right to Left)
* @default 600
*
* @param -- IMAGES --
*
* @param Ready Image
* @desc The image used to show the 'Ready' message.
* @default Ready Image
*
* @param Ready Image X
* @desc X axis of the image used to show the 'Ready' message.
* @default 408
*
* @param Ready Image Y
* @desc Y axis of the image used to show the 'Ready' message.
* @default 200
*
* @param Win Image
* @desc The image used to show the 'Win' message.
* @default Win Image
*
* @param Win Image X
* @desc X axis of the image used to show the 'Win' message.
* @default 208
*
* @param Win Image Y
* @desc X axis of the image used to show the 'Win' message.
* @default 100
*
* @param Lose Image
* @desc The image used to show the 'Lose' message.
* @default Lose Image
*
* @param Lose Image X
* @desc X axis of the image used to show the 'Lose' message.
* @default 208
*
* @param Lose Image Y
* @desc X axis of the image used to show the 'Lose' message.
* @default 100
*
* @param Draw Image
* @desc The image used to show the 'Draw' message.
* @default Draw Image
*
* @param Draw Image X
* @desc X axis of the image used to show the 'Draw' message.
* @default 208
*
* @param Draw Image Y
* @desc X axis of the image used to show the 'Draw' message.
* @default 100
*
* @param Rock Image
* @desc The image used to show the Rock button.
* @default Rock
*
* @param Rock Image X
* @desc X axis of the image used to show the Rock button.
* @default 240
*
* @param Rock Image Y
* @desc Y axis of the image used to show the Rock button.
* @default 400
*
* @param Paper Image
* @desc The image used to show the Paper button.
* @default Paper
*
* @param Paper Image X
* @desc X axis of the image used to show the Paper button.
* @default 385
*
* @param Paper Image Y
* @desc Y axis of the image used to show the Paper button.
* @default 350
*
* @param Scissors Image
* @desc The image used to show the Scissors button.
* @default Scissors
*
* @param Scissors Image X
* @desc X axis of the image used to show the Scissors button.
* @default 540
*
* @param Scissors Image Y
* @desc Y axis of the image used to show the Scissors button.
* @default 400
*
* @param -- SCORE VARIABLES --
*
* @param Actor Score Variable
* @desc The variable ID that will contain your Actor's Score.
* @default 1
*
* @param Enemy Score Variable
* @desc The variable ID that will contain your Enemy's Score.
* @default 2
*
* @param -- TURN WINDOWS --
*
* @param Turn Window Width
* @desc Width of the turns window
* @default 350
*
* @param Turn Window X
* @desc X axis of the turn window.
* @default 208
*
* @param Turn Window Y
* @desc Y axis of the turn window.
* @default 520
*
* @param Turn Window Opacity
* @desc Opacity of the turn window.
* @default 255
*
* @param -- SCORE WINDOWS --
*
* @param Actor Window Width
* @desc The width of the score board window for the actor's score.
* @default 200
*
* @param Actor Window X
* @desc X axis of the score board window for the actor's score.
* @default 0
*
* @param Actor Window Y
* @desc Y axis of the score board window for the actor's score.
* @default 0
*
* @param Actor Window Opacity
* @desc Opacity of the score board window for the actor's score.
* @default 255
*
* @param Enemy Window Width
* @desc The width of the score board window for the actor's score.
* @default 200
*
* @param Enemy Window X
* @desc X axis of the score board window for the enemy's score.
* @default 615
*
* @param Enemy Window Y
* @desc Y axis of the score board window for the enemy's score.
* @default 0
*
* @param Enemy Window Opacity
* @desc Opacity of the score board window for the enemy's score.
* @default 255
*
* @param -- CHOICE IMAGES --
*
* @param C Movement Angle
* @desc Angle value of the choice image's breathing movement.
* @default 0
*
* @param C Center Scale
* @desc The scaling value of the choice image's centering.
* @default 1
*
* @param C Movement Range
* @desc The range of the movement.
* @default 0.1
*
* @param C Movement Speed
* @desc The speed of the pulse movement for the choice image.
* @default 0.3
*
* @param -- ACTOR PORTRAIT --
*
* @param Movement Angle
* @desc Angle value of the portrait's breathing movement.
* @default 0
*
* @param Center Scale
* @desc The scaling value of the portrait's centering.
* @default 1
*
* @param Movement Range
* @desc The range of the movement.
* @default 0.01
*
* @param Movement Speed
* @desc The speed of the breathing movement for the portrait.
* @default 0.1
*
* @param -- ENEMY PORTRAIT --
*
* @param Z Movement Angle
* @desc Angle value of the portrait's breathing movement.
* @default 0
*
* @param Z Center Scale
* @desc The scaling value of the portrait's centering.
* @default 1
*
* @param Z Movement Range
* @desc The range of the movement.
* @default 0.01
*
* @param Z Movement Speed
* @desc The speed of the breathing movement for the portrait.
* @default 0.1
*
*/
(function(){
	var SOUL_MV = SOUL_MV || {};
	SOUL_MV.RPS = SOUL_MV.RPS || {};
	var angle = 0;
	var centerScale = 1;
	var range = 0.1;
	var speed = 0.3;

	SOUL_MV.RPS.defBG = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Default Background'] || 'CrossedSwords';
	SOUL_MV.RPS.defFrame = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Default Frame'] || 'StillFrame';

	SOUL_MV.RPS.scoreName = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Score Name'] || 'Score';
	SOUL_MV.RPS.matchName = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Match Name'] || 'Match Remaining';

	SOUL_MV.RPS.slide = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Slide Portraits'] === 'true' ? true : false;
	SOUL_MV.RPS.slideSpeed = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Slide Speed'] || 40);
	SOUL_MV.RPS.slideX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Actor Slide Range'] || -80);
	SOUL_MV.RPS.slideZ = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Enemy Slide Range'] || 600);

	SOUL_MV.RPS.ReadyImage = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Ready Image'] || 'Ready Image';
	SOUL_MV.RPS.ReadyImageX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Ready Image X'] || 408);
	SOUL_MV.RPS.ReadyImageY = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Ready Image Y'] || 200);

	SOUL_MV.RPS.WinImage = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Win Image'] || 'Win Image';
	SOUL_MV.RPS.WinImageX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Win Image X'] || 208);
	SOUL_MV.RPS.WinImageY = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Win Image Y'] || 100);

	SOUL_MV.RPS.DrawImage = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Draw Image'] || 'Draw Image';
	SOUL_MV.RPS.DrawImageX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Draw Image X'] || 208);
	SOUL_MV.RPS.DrawImageY = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Draw Image Y'] || 100);

	SOUL_MV.RPS.LoseImage = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Lose Image'] || 'Lose Image';
	SOUL_MV.RPS.LoseImageX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Lose Image X'] || 208);
	SOUL_MV.RPS.LoseImageY = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Lose Image Y'] || 100);

	SOUL_MV.RPS.RockImage = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Rock Image'] || 'Rock';
	SOUL_MV.RPS.RockImageX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Rock Image X'] || 240);
	SOUL_MV.RPS.RockImageY = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Rock Image Y'] || 400);

	SOUL_MV.RPS.PaperImage = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Paper Image'] || 'Paper';
	SOUL_MV.RPS.PaperImageX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Paper Image X'] || 385);
	SOUL_MV.RPS.PaperImageY = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Paper Image Y'] || 350);

	SOUL_MV.RPS.ScissorsImage = PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Scissors Image'] || 'Scissors';
	SOUL_MV.RPS.ScissorsImageX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Scissors Image X'] || 540);
	SOUL_MV.RPS.ScissorsImageY = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Scissors Image Y'] || 400);

	SOUL_MV.RPS.actorScoreWindowW = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Actor Window Width'] || 200);
	SOUL_MV.RPS.actorScoreWindowX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Actor Window X'] || 0);
	SOUL_MV.RPS.actorScoreWindowY = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Actor Window Y'] || 0);
	SOUL_MV.RPS.actorScoreWindowOpacity = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Actor Window Opacity'] || 255);

	SOUL_MV.RPS.enemyScoreWindowW = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Enemy Window Width'] || 200);
	SOUL_MV.RPS.enemyScoreWindowX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Enemy Window X'] || 615);
	SOUL_MV.RPS.enemyScoreWindowY = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Enemy Window Y'] || 0);
	SOUL_MV.RPS.enemyScoreWindowOpacity = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Enemy Window Opacity'] || 255);

	SOUL_MV.RPS.turnWindowW = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Turn Window Width'] || 350);
	SOUL_MV.RPS.turnWindowX = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Turn Window X'] || 208);
	SOUL_MV.RPS.turnWindowY = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Turn Window Y'] || 520);
	SOUL_MV.RPS.turnWindowOpacity = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Turn Window Opacity'] || 255);

	SOUL_MV.RPS.actorScoreVariableID = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Actor Score Variable'] || 1);
	SOUL_MV.RPS.enemyScoreVariableID = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Enemy Score Variable'] || 2);

	SOUL_MV.RPS.xAngle = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Movement Angle'] || 0);
	SOUL_MV.RPS.xCenterScale = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Center Scale'] || 1);
	SOUL_MV.RPS.xRange = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Movement Range'] || 0.01);
	SOUL_MV.RPS.xSpeed = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Movement Speed'] || 0.1);

	SOUL_MV.RPS.zAngle = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Z Movement Angle'] || 0);
	SOUL_MV.RPS.zCenterScale = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Z Center Scale'] || 1);
	SOUL_MV.RPS.zRange = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Z Movement Range'] || 0.01);
	SOUL_MV.RPS.zSpeed = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['Z Movement Speed'] || 0.1);

	SOUL_MV.RPS.angle = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['C Movement Angle'] || 0);
	SOUL_MV.RPS.centerScale = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['C Center Scale'] || 1);
	SOUL_MV.RPS.range = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['C Movement Range'] || 0.1);
	SOUL_MV.RPS.speed = Number(PluginManager.parameters('SOUL_MV Rock Paper Scissors EX')['C Movement Speed'] || 0.3);

	SOUL_MV.RPS._systemInitialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		SOUL_MV.RPS._systemInitialize.call(this);
		this._actorVoiceWin = null;
		this._actorVoiceVol = 100;
		this._actorVoicePitch = 100;
		this._actorVoicePan = 0;
		this._enemyVoiceWin = null;
		this._enemyVoiceVol = 100;
		this._enemyVoicePitch = 100;
		this._enemyVoicePan = 0;		
		this._backgroundForRPS = SOUL_MV.RPS.defBG;
		this._stillFrame = SOUL_MV.RPS.defFrame;
		this._audioName = null;
		this._audioVolume = 100;
		this._audioPitch = 100;
		this._audioPan = 0;
		this._rpsPhase = 0;
		this._actorScore = 0;
		this._enemyScore = 0;
		this._condition = null;
		this._actorPortrait = null;
		this._enemyPortrait = null;
		this._aPortraitX = 0;
		this._aPortraitY = 0;
		this._ePortraitX = 0;
		this._ePortraitY = 0;
		this._slide = true;
		this._actorName = null;
		this._actorNameX = 0;
		this._actorNameY = 0;
		this._enemyName = null;
		this._enemyNameX = 0;
		this._enemyNameY = 0;		
	};

	Game_System.prototype.resetRPS = function() {
		this._rpsPhase = 0;
		this._actorScore = 0;
		this._enemyScore = 0;
	}

	SOUL_MV.RPS._interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		switch(command) {
			case 'load_rps_game':
				SceneManager.push(SOUL_MV_Scene_RPS);
				break;
			case 'rps':
				if(args[0] === 'actor_portrait') {
					$gameSystem._actorPortrait = args[1];
				}
				if(args[0] === 'enemy_portrait') {
					$gameSystem._enemyPortrait = args[1];
				}
				break;
			case 'reset':
				if (args[0] === 'rps') {
					$gameSystem.resetRPS();
				}
				break;
			case 'set':
				if (args[0] === 'actor') {
					if (args[1] === 'voice') {
						$gameSystem._actorVoiceWin = args[2];
						$gameSystem._actorVoiceVol = Number(args[3]);
						$gameSystem._actorVoicePitch = Number(args[4]);
						$gameSystem._actorVoicePan = Number(args[5]);
					}
				}
				if (args[0] === 'enemy') {
					if (args[1] === 'voice') {
						$gameSystem._enemyVoiceWin = args[2];
						$gameSystem._enemyVoiceVol = Number(args[3]);
						$gameSystem._enemyVoicePitch = Number(args[4]);
						$gameSystem._enemyVoicePan = Number(args[5]);						
					}
				}				
				if (args[0] === 'rps') {
					if (args[1] === 'turns') {
						$gameSystem._rpsPhase = Number(args[2]);
					}
					if (args[1] === 'music') {
						$gameSystem._audioName = args[2];
						$gameSystem._audioVolume = Number(args[3]);
						$gameSystem._audioPitch = Number(args[4]);
						$gameSystem._audioPan = Number(args[5]);

					}
					if (args[1] === 'stage') {
						if (args[2] === 'background') {
							$gameSystem._backgroundForRPS = args[3];
						}
						if (args[2] === 'still_frame') {
							$gameSystem._stillFrame = args[3];
						}
					} 
				}
				if (args[0] === 'actor_name_image') {
					$gameSystem._actorName = args[1];
				}
				if (args[0] === 'actor_name') {
					if (args[1] === 'x') {
						$gameSystem._actorNameX = Number(args[2]);
					}
					if (args[1] === 'y') {
						$gameSystem._actorNameY = Number(args[2]);
					}					
				}	
				if (args[0] === 'enemy_name_image') {
					$gameSystem._enemyName = args[1];
				}
				if (args[0] === 'enemy_name') {
					if (args[1] === 'x') {
						$gameSystem._enemyNameX = Number(args[2]);
					}
					if (args[1] === 'y') {
						$gameSystem._enemyNameY = Number(args[2]);
					}					
				}							

				if (args[0] === 'actor_portrait') {
					if (args[1] === 'x') {
						$gameSystem._aPortraitX = Number(args[2]);
					}
					if (args[1] === 'y') {
						$gameSystem._aPortraitY = Number(args[2]);
					}					
				}
				if (args[0] === 'enemy_portrait') {
					if (args[1] === 'x') {
						$gameSystem._ePortraitX = Number(args[2]);
					}
					if (args[1] === 'y') {
						$gameSystem._ePortraitY = Number(args[2]);
					}					
				}
				break;

		}

	    SOUL_MV.RPS._interpreter_pluginCommand.call(this, command, args);

	};

	function Window_RPS_ScoreActor() {
	    this.initialize.apply(this, arguments);
	}

	Window_RPS_ScoreActor.prototype = Object.create(Window_Base.prototype);
	Window_RPS_ScoreActor.prototype.constructor = Window_RPS_ScoreActor;

	Window_RPS_ScoreActor.prototype.initialize = function(x, y) {
	    var width = this.windowWidth();
	    var height = this.windowHeight();
	    Window_Base.prototype.initialize.call(this, x, y, width, height);
	    this.refresh();
	};

	Window_RPS_ScoreActor.prototype.windowWidth = function() {
	    return SOUL_MV.RPS.actorScoreWindowW;
	};

	Window_RPS_ScoreActor.prototype.windowHeight = function() {
	    return this.fittingHeight(1);
	};

	Window_RPS_ScoreActor.prototype.refresh = function() {
	    var x = this.textPadding();
	    var width = this.contents.width - this.textPadding() * 2;
	    this.contents.clear();
	    this.drawTextEx(SOUL_MV.RPS.scoreName + ' : ' + String($gameSystem._actorScore),0, 0);
	};

	Window_RPS_ScoreActor.prototype.open = function() {
	    this.refresh();
	    Window_Base.prototype.open.call(this);
	};

	function Window_RPS_ScoreEnemy() {
	    this.initialize.apply(this, arguments);
	}

	Window_RPS_ScoreEnemy.prototype = Object.create(Window_Base.prototype);
	Window_RPS_ScoreEnemy.prototype.constructor = Window_RPS_ScoreEnemy;

	Window_RPS_ScoreEnemy.prototype.initialize = function(x, y) {
	    var width = this.windowWidth();
	    var height = this.windowHeight();
	    Window_Base.prototype.initialize.call(this, x, y, width, height);
	    this.refresh();
	};

	Window_RPS_ScoreEnemy.prototype.windowWidth = function() {
	    return SOUL_MV.RPS.enemyScoreWindowW;
	};

	Window_RPS_ScoreEnemy.prototype.windowHeight = function() {
	    return this.fittingHeight(1);
	};

	Window_RPS_ScoreEnemy.prototype.refresh = function() {
	    var x = this.textPadding();
	    var width = this.contents.width - this.textPadding() * 2;
	    this.contents.clear();
	    this.drawTextEx(SOUL_MV.RPS.scoreName + ' : ' + String($gameSystem._enemyScore),0, 0);
	};

	Window_RPS_ScoreEnemy.prototype.open = function() {
	    this.refresh();
	    Window_Base.prototype.open.call(this);
	};

	ImageManager.loadSoulRPS = function(filename, hue) {
	    return this.loadBitmap('img/soul_rps/', filename, hue, true);
	};


	function SOUL_MV_Scene_RPS() {
	    this.initialize.apply(this, arguments);
	}

	SOUL_MV_Scene_RPS.prototype = Object.create(Scene_Base.prototype);
	SOUL_MV_Scene_RPS.prototype.constructor = SOUL_MV_Scene_RPS;

	SOUL_MV_Scene_RPS.prototype.initialize = function() {
	    Scene_Base.prototype.initialize.call(this);
	    this._actorChoice = null;
	    this._phaseValue = 0;
	    this.phaseCount = false;
	    this._slidePortrait = false;
	    this._winConditionWait = 0;
	};	

	SOUL_MV_Scene_RPS.prototype.create = function() {
	    Scene_Base.prototype.create.call(this);
	    this.createBackground();
	    this.createStillFrame();
	    this.createReadyFrame();
	    this.createReadySprite();
	    this.createAllPortraits();
	    this.createAllNames();
	    this.playSceneSound();
	    
	};

	SOUL_MV_Scene_RPS.prototype.playSceneSound = function() {
		AudioManager.stopAll();
		var audio = {
			name: $gameSystem._audioName,
			volume: $gameSystem._audioVolume,
			pitch: $gameSystem._audioPitch,
			pan: $gameSystem._audioPan
		};
		AudioManager.playBgm(audio);
	}

	SOUL_MV_Scene_RPS.prototype.createReadySprite = function() {
		this._readySpriteImage = new Sprite_Button();
		this._readySpriteImage.bitmap = ImageManager.loadSoulRPS(SOUL_MV.RPS.ReadyImage);
		this._readySpriteImage.x = SOUL_MV.RPS.ReadyImageX;
		this._readySpriteImage.y = SOUL_MV.RPS.ReadyImageY;
		this._readySpriteImage.setClickHandler(this.commandStart.bind(this));
		this.addChild(this._readySpriteImage);
	}

	SOUL_MV_Scene_RPS.prototype.createScoreWindow = function() {
		this._actorScoreWindow = new Window_RPS_ScoreActor();
		this._actorScoreWindow.opacity = SOUL_MV.RPS.actorScoreWindowOpacity;
		this._actorScoreWindow.x = SOUL_MV.RPS.actorScoreWindowX;
		this._actorScoreWindow.y = SOUL_MV.RPS.actorScoreWindowY;		
		this.addChild(this._actorScoreWindow);
	}

	SOUL_MV_Scene_RPS.prototype.createEnemyScoreWindow = function() {
		this._enemyScoreWindow = new Window_RPS_ScoreEnemy();
		this._enemyScoreWindow.opacity = SOUL_MV.RPS.enemyScoreWindowOpacity;
		this._enemyScoreWindow.x = SOUL_MV.RPS.enemyScoreWindowX;
		this._enemyScoreWindow.y = SOUL_MV.RPS.enemyScoreWindowY;
		this.addChild(this._enemyScoreWindow);
	}

	SOUL_MV_Scene_RPS.prototype.createAllPortraits = function() {
		this._actorPortrait = new Sprite();
		this._actorPortrait.bitmap = ImageManager.loadSoulRPS($gameSystem._actorPortrait);
		this._actorPortrait.x = $gameSystem._aPortraitX;
		this._actorPortrait.y = $gameSystem._aPortraitY;

		this._enemyPortrait = new Sprite();
		this._enemyPortrait.bitmap = ImageManager.loadSoulRPS($gameSystem._enemyPortrait);
		this._enemyPortrait.x = $gameSystem._ePortraitX;
		this._enemyPortrait.y = $gameSystem._ePortraitY;
	}

	SOUL_MV_Scene_RPS.prototype.createAllNames = function() {
		this._actorName = new Sprite();
		this._actorName.bitmap = ImageManager.loadSoulRPS($gameSystem._actorName);
		this._actorName.x = $gameSystem._actorNameX;
		this._actorName.y = $gameSystem._actorNameY;

		this._enemyName = new Sprite();
		this._enemyName.bitmap = ImageManager.loadSoulRPS($gameSystem._enemyName);
		this._enemyName.x = $gameSystem._enemyNameX;
		this._enemyName.y = $gameSystem._enemyNameY;
	}	

	SOUL_MV_Scene_RPS.prototype.createActorCommands = function() {
	    this._rpsCommand = new Window_RPSCommand(0, 0);
	    this._rpsCommand.x = Graphics.boxWidth * 2;
	    this._rpsCommand.y = Graphics.boxHeight * 2;
	    this._rpsCommand.setHandler('rock',      this.commandRock.bind(this));
	    this._rpsCommand.setHandler('paper',     this.commandPaper.bind(this));
	    this._rpsCommand.setHandler('scissors',     this.commandScissors.bind(this));
	    this.addChild(this._rpsCommand);
	};

	SOUL_MV_Scene_RPS.prototype.commandRock = function() {
		this._actorChoice = 'P-Rock';
		this.createEnemyAction();
	};
	SOUL_MV_Scene_RPS.prototype.commandPaper = function() {
		this._actorChoice = 'P-Paper';
		this.createEnemyAction();
	};
	SOUL_MV_Scene_RPS.prototype.commandScissors = function() {
		this._actorChoice = 'P-Scissors';
		this.createEnemyAction();
	};	

	SOUL_MV_Scene_RPS.prototype.createReadyFrame = function() {
		this._readyFrameSprite = new Window_RPSCommandStart(0, 0);
		this._readyFrameSprite.x = Graphics.boxWidth * 2;
		this._readyFrameSprite.y = Graphics.boxHeight * 2;
		this._readyFrameSprite.setHandler('start', this.commandStart.bind(this));
		this.addChild(this._readyFrameSprite);
	}

	SOUL_MV_Scene_RPS.prototype.createEnemyAction = function() {
		this._enemyChoice = Math.randomInt(3)+1;
		this._enemChoiceCommand = null;
		switch(this._enemyChoice) {
			case 1:
				this._enemChoiceCommand = 'E-Rock';
				break;
			case 2:
				this._enemChoiceCommand = 'E-Paper';
				break;
			case 3:
				this._enemChoiceCommand = 'E-Scissors';
				break;
		}
		this.createEnemyActionAnimation();
	}

	SOUL_MV_Scene_RPS.prototype.createEnemyActionAnimation = function() {
		this._enemyChoiceSprite = new Sprite();
		this._enemyChoiceSprite.opacity = 255;
		if (this._enemChoiceCommand === 'E-Rock') {
			this._enemyChoiceSprite.bitmap = ImageManager.loadSoulRPS(SOUL_MV.RPS.RockImage);
		}
		if (this._enemChoiceCommand === 'E-Paper') {
			this._enemyChoiceSprite.bitmap = ImageManager.loadSoulRPS(SOUL_MV.RPS.PaperImage);
		}
		if (this._enemChoiceCommand === 'E-Scissors') {
			this._enemyChoiceSprite.bitmap = ImageManager.loadSoulRPS(SOUL_MV.RPS.ScissorsImage);
		}			
		this._enemyChoiceSprite.x = 312;
		this._enemyChoiceSprite.y = -500;	
		this.addChild(this._enemyChoiceSprite);

		// Judge the Winner

		if (this._actorChoice === 'P-Rock') {
			if (this._enemChoiceCommand === 'E-Rock') {
				this._condition = 3;
				this.winCondition();
			}
			if (this._enemChoiceCommand === 'E-Paper') {
				this._condition = 2;
				$gameSystem._enemyScore++;
				this.winCondition();
			}
			if (this._enemChoiceCommand === 'E-Scissors') {
				this._condition = 1;
				$gameSystem._actorScore++;
				this.winCondition();
			}						
		}
		if (this._actorChoice === 'P-Paper') {
			if (this._enemChoiceCommand === 'E-Rock') {
				$gameSystem._actorScore++;
				this._condition = 1;
				this.winCondition();
			}
			if (this._enemChoiceCommand === 'E-Paper') {
				this._condition = 3;
				this.winCondition();
			}
			if (this._enemChoiceCommand === 'E-Scissors') {
				this._condition = 2;
				$gameSystem._enemyScore++;
				this.winCondition();
			}						
		}
		if (this._actorChoice === 'P-Scissors') {
			if (this._enemChoiceCommand === 'E-Rock') {
				this._condition = 2;
				$gameSystem._enemyScore++;
				this.winCondition();
			}
			if (this._enemChoiceCommand === 'E-Paper') {
				$gameSystem._actorScore++;
				this._condition = 1;
				this.winCondition();
			}
			if (this._enemChoiceCommand === 'E-Scissors') {
				this._condition = 3;
				this.winCondition();
			}						
		}		
	};

	SOUL_MV_Scene_RPS.prototype.winCondition = function() {
		this.phaseCount = true;
	}

	
	SOUL_MV_Scene_RPS.prototype.start = function() {
	    Scene_Base.prototype.start.call(this);
	    this.startFadeIn(this.slowFadeSpeed(), false);
	};

	SOUL_MV_Scene_RPS.prototype.createBackground = function() {
		this._backSprite = new Sprite();
		this._backSprite.bitmap = ImageManager.loadSoulRPS($gameSystem._backgroundForRPS);
		this.addChild(this._backSprite);
	}

	SOUL_MV_Scene_RPS.prototype.createStillFrame = function() {
		this._stillFrameSprite = new Sprite();
		this._stillFrameSprite.bitmap = ImageManager.loadSoulRPS($gameSystem._stillFrame);
		this.addChild(this._stillFrameSprite);
	}

	SOUL_MV_Scene_RPS.prototype.commandStart = function() {
		this.removeChild(this._readySpriteImage);
		this._readySpriteImage.opacity = 0;
		this.createScoreWindow();
		this.createEnemyScoreWindow();
		this._readyFrameSprite.close();
		this.createActorCommands();
		this.createActorCommandSprites();
		this.createTurnNumber();
		this.addChild(this._actorPortrait);
		this.addChild(this._enemyPortrait);
		this.addChild(this._actorName);
		this.addChild(this._enemyName);		
		this._slidePortrait = true;

	}

	SOUL_MV_Scene_RPS.prototype.createTurnNumber = function() {
		this._turnNumber = new Window_TurnNumber();
		this._turnNumber.opacity = SOUL_MV.RPS.turnWindowOpacity;
		this._turnNumber.x = SOUL_MV.RPS.turnWindowX;
		this._turnNumber.y = SOUL_MV.RPS.turnWindowY;
		this.addChild(this._turnNumber);
	}

	SOUL_MV_Scene_RPS.prototype.createActorCommandSprites = function() {
		this._rockSprite = new Sprite_Button();
		this._rockSprite.bitmap = ImageManager.loadSoulRPS(SOUL_MV.RPS.RockImage);
		this._rockSprite.x = SOUL_MV.RPS.RockImageX;
		this._rockSprite.y = SOUL_MV.RPS.RockImageY;
		this._rockSprite.anchor.x = this._rockSprite.anchor.y = 0.5;
		this.addChild(this._rockSprite);
		this._paperSprite = new Sprite_Button();
		this._paperSprite.bitmap = ImageManager.loadSoulRPS(SOUL_MV.RPS.PaperImage);
		this._paperSprite.x = SOUL_MV.RPS.PaperImageX;
		this._paperSprite.y = SOUL_MV.RPS.PaperImageY;		
		this._paperSprite.anchor.x = this._paperSprite.anchor.y = 0.5;
		this.addChild(this._paperSprite);
		this._scissorsSprite = new Sprite_Button();
		this._scissorsSprite.bitmap = ImageManager.loadSoulRPS(SOUL_MV.RPS.ScissorsImage);
		this._scissorsSprite.x = SOUL_MV.RPS.ScissorsImageX;
		this._scissorsSprite.y = SOUL_MV.RPS.ScissorsImageY;			
		this._scissorsSprite.anchor.x = this._scissorsSprite.anchor.y = 0.5;
		this._rockSprite.setClickHandler(this.onButtonDown1.bind(this));
		this._paperSprite.setClickHandler(this.onButtonDown2.bind(this));
		this._scissorsSprite.setClickHandler(this.onButtonDown3.bind(this));		
		this.addChild(this._scissorsSprite);				
	}

	SOUL_MV_Scene_RPS.prototype.onButtonDown1 = function() {
		this._rpsCommand._index = 0;
	};

	SOUL_MV_Scene_RPS.prototype.onButtonDown2 = function() {
		this._rpsCommand._index = 1;
	};

	SOUL_MV_Scene_RPS.prototype.onButtonDown3 = function() {
		this._rpsCommand._index = 2;
	};

	SOUL_MV_Scene_RPS.prototype.playChime = function() {
		var a = {
			name: $gameSystem._actorVoiceWin,
			volume: $gameSystem._actorVoiceVol,
			pitch: $gameSystem._actorVoicePitch,
			pan: $gameSystem._actorVoicePan
		};

		AudioManager.playSe(a);
	};

	SOUL_MV_Scene_RPS.prototype.playBuzzer = function() {
		var a = {
			name: $gameSystem._enemyVoiceWin,
			volume: $gameSystem._enemyVoiceVol,
			pitch: $gameSystem._enemyVoicePitch,
			pan: $gameSystem._enemyVoicePan
		};

		AudioManager.playSe(a);
	};

	SOUL_MV_Scene_RPS.prototype.showConditionImage = function() {
		if (this._condition === 1) {
			this._winImage = new Sprite();
			this._winImage.opacity = 255;
			this._winImage.bitmap = ImageManager.loadSoulRPS(SOUL_MV.RPS.WinImage);
			this._winImage.x = SOUL_MV.RPS.WinImageX;
			this._winImage.y = SOUL_MV.RPS.WinImageY;
			this.addChild(this._winImage);
			this.playChime();
			this._conditionWait = true;
		}
		if (this._condition === 2) {
			this._winImage = new Sprite();
			this._winImage.opacity = 255;
			this._winImage.bitmap = ImageManager.loadSoulRPS(SOUL_MV.RPS.LoseImage);
			this._winImage.x = SOUL_MV.RPS.LoseImageX;
			this._winImage.y = SOUL_MV.RPS.LoseImageY;
			this.addChild(this._winImage);
			this.playBuzzer();
			this._conditionWait = true;
		}
		if (this._condition === 3) {
			this._winImage = new Sprite();
			this._winImage.opacity = 255;
			this._winImage.bitmap = ImageManager.loadSoulRPS(SOUL_MV.RPS.DrawImage);
			this._winImage.x = SOUL_MV.RPS.DrawImageX;
			this._winImage.y = SOUL_MV.RPS.DrawImageY;
			this.addChild(this._winImage);
			this._conditionWait = true;
		}				
		$gameSystem._rpsPhase--;
	}

	SOUL_MV_Scene_RPS.prototype.resetGame = function() {
		
		if ($gameSystem._rpsPhase != 0) {
			this._enemyChoiceSprite.opacity = 0;
			this._enemyChoiceSprite.y = -500;
			this._winImage.opacity = 0;
			this._rpsCommand.activate();
			
		} else {
			$gameVariables.setValue(SOUL_MV.RPS.actorScoreVariableID, $gameSystem._actorScore);
			$gameVariables.setValue(SOUL_MV.RPS.enemyScoreVariableID, $gameSystem._enemyScore);
			this.removeChild(this._turnNumber);
			this.removeChild(this._actorScoreWindow);
			this.removeChild(this._enemyScoreWindow);
			this.removeChild(this._rockSprite);
			this.removeChild(this._paperSprite);
			this.removeChild(this._scissorsSprite);
			this.removeChild(this._enemyChoiceSprite);
		    this.removeChild(this._winImage);
		    this.removeChild(this._stillFrameSprite);
		    this.removeChild(this._actorPortrait);
		    this.removeChild(this._enemyPortrait);
		    this.removeChild(this._actorName);
		    this.removeChild(this._enemyName);
			this.startFadeOut(this.slowFadeSpeed(), false);
			this.popScene();
		}
	}
	SOUL_MV_Scene_RPS.prototype.terminate = function() {
	    Scene_Base.prototype.terminate.call(this);

	    AudioManager.stopAll();
	};
	SOUL_MV_Scene_RPS.prototype.update = function() {
		Scene_Base.prototype.update.call(this);

		if(this._conditionWait) {
			if(this._winConditionWait < 90) {
				this._winConditionWait++;
			} else {
				this._winConditionWait = 0;
				this._conditionWait = false;
				this.resetGame();
			}		
		}
		if (SOUL_MV.RPS.slide) {
			if (this._slidePortrait) {
				if (this._actorPortrait.x < SOUL_MV.RPS.slideX) {
					this._actorPortrait.x += SOUL_MV.RPS.slideSpeed;
				}
			}
			if (this._slidePortrait) {
				if (this._enemyPortrait.x > SOUL_MV.RPS.slideZ) {
					this._enemyPortrait.x -= SOUL_MV.RPS.slideSpeed;
				}
			}
		} else {
			this._actorPortrait.x = $gameSystem._aPortraitX;
			this._enemyPortrait.x = $gameSystem._ePortraitX;
		}

		if (this.phaseCount) {

			if (this._phaseValue != 45) {
				this._phaseValue++;	
			} else {
				//
				this.showConditionImage();
				this._phaseValue = 0;
				this.phaseCount = false;
			}
		}

		if (this._rpsCommand) {		
			this._actorPortrait.scale.x = SOUL_MV.RPS.xCenterScale + Math.sin(SOUL_MV.RPS.xAngle) * SOUL_MV.RPS.xRange;
			this._actorPortrait.scale.y = SOUL_MV.RPS.xCenterScale + Math.sin(SOUL_MV.RPS.xAngle) * SOUL_MV.RPS.xRange;

			this._enemyPortrait.scale.y = SOUL_MV.RPS.zCenterScale + Math.sin(SOUL_MV.RPS.zAngle) * SOUL_MV.RPS.zRange;
			this._enemyPortrait.scale.x = SOUL_MV.RPS.zCenterScale + Math.sin(SOUL_MV.RPS.zAngle) * SOUL_MV.RPS.zRange;			
			
			
			SOUL_MV.RPS.xAngle += SOUL_MV.RPS.xSpeed;
			SOUL_MV.RPS.zAngle += SOUL_MV.RPS.zSpeed;
		}

		if (this._readySpriteImage) {
			this._readySpriteImage.anchor.x = this._readySpriteImage.anchor.y = 0.5; 
			this._readySpriteImage.scale.x = centerScale + Math.sin(angle) * range;
			this._readySpriteImage.scale.y = centerScale + Math.sin(angle) * range;
			angle += speed;
		}

		if (this._rpsCommand) {
			switch(this._rpsCommand._index) {
				case 0:
					this._scissorsSprite.scale.x = this._scissorsSprite.scale.y = 1;
					this._paperSprite.scale.x = this._paperSprite.scale.y = 1;
				    this._rockSprite.scale.x = this._rockSprite.scale.y = SOUL_MV.RPS.centerScale + Math.sin(SOUL_MV.RPS.angle) * SOUL_MV.RPS.range;
				    SOUL_MV.RPS.angle += SOUL_MV.RPS.speed;	
				    break;
				case 1:
					this._scissorsSprite.scale.x = this._scissorsSprite.scale.y = 1;
					this._rockSprite.scale.x = this._rockSprite.scale.y = 1;
				    this._paperSprite.scale.x = this._paperSprite.scale.y = SOUL_MV.RPS.centerScale + Math.sin(SOUL_MV.RPS.angle) * SOUL_MV.RPS.range;
				    SOUL_MV.RPS.angle += SOUL_MV.RPS.speed;	
				    break;
				case 2:
					this._rockSprite.scale.x = this._rockSprite.scale.y = 1;
					this._paperSprite.scale.x = this._paperSprite.scale.y = 1;
				    this._scissorsSprite.scale.x = this._scissorsSprite.scale.y = SOUL_MV.RPS.centerScale + Math.sin(SOUL_MV.RPS.angle) * SOUL_MV.RPS.range;
				    SOUL_MV.RPS.angle += SOUL_MV.RPS.speed;	
				    break;				      
			}
		}

		if (this._enemyChoiceSprite) {
			if (this._enemyChoiceSprite.y != 50) {
				if (this._enemyChoiceSprite.y >= 50) {
					this._enemyChoiceSprite.y = 50;
					this._actorScoreWindow.refresh();
					this._enemyScoreWindow.refresh();
					this._turnNumber.refresh();
				} else {
					this._enemyChoiceSprite.y += 20;
				}
			}
		}
	}

	SOUL_MV_Scene_RPS.prototype.isTriggered = function() {
	    return Input.isTriggered('ok') || TouchInput.isTriggered();
	};


	function Window_RPSCommandStart() {
	    this.initialize.apply(this, arguments);
	}

	Window_RPSCommandStart.prototype = Object.create(Window_Command.prototype);
	Window_RPSCommandStart.prototype.constructor = Window_RPSCommandStart;

	Window_RPSCommandStart.prototype.initialize = function(x, y) {
	    Window_Command.prototype.initialize.call(this, x, y);
	    this.selectLast();
	};

	Window_RPSCommandStart._lastCommandSymbol = null;

	Window_RPSCommandStart.initCommandPosition = function() {
	    this._lastCommandSymbol = null;
	};

	Window_RPSCommandStart.prototype.windowWidth = function() {
	    return 240;
	};

	Window_RPSCommandStart.prototype.numVisibleRows = function() {
	    return this.maxItems();
	};

	Window_RPSCommandStart.prototype.makeCommandList = function() {
	    this.addMainCommands();
	};

	Window_RPSCommandStart.prototype.addMainCommands = function() {
	    this.addCommand('Start', 'start', true);
	};
	Window_RPSCommandStart.prototype.selectLast = function() {
	    this.selectSymbol(Window_RPSCommandStart._lastCommandSymbol);
	};

	function Window_RPSCommand() {
	    this.initialize.apply(this, arguments);
	}

	Window_RPSCommand.prototype = Object.create(Window_Command.prototype);
	Window_RPSCommand.prototype.constructor = Window_RPSCommand;

	Window_RPSCommand.prototype.initialize = function(x, y) {
	    Window_Command.prototype.initialize.call(this, x, y);
	    this.selectLast();
	};

	Window_RPSCommand._lastCommandSymbol = null;

	Window_RPSCommand.initCommandPosition = function() {
	    this._lastCommandSymbol = null;
	};

	Window_RPSCommand.prototype.windowWidth = function() {
	    return 240;
	};

	Window_RPSCommand.prototype.numVisibleRows = function() {
	    return this.maxItems();
	};

	Window_RPSCommand.prototype.makeCommandList = function() {
	    this.addMainCommands();
	};

	Window_RPSCommand.prototype.addMainCommands = function() {
	    this.addCommand('Rock', 'rock', true);
	    this.addCommand('Paper', 'paper', true);
	    this.addCommand('Scissors', 'scissors', true);
	};	

	Window_RPSCommand.prototype.selectLast = function() {
	    this.selectSymbol(Window_RPSCommand._lastCommandSymbol);
	};		

	Window_RPSCommand.prototype.processCursorMove = function() {
	    if (this.isCursorMovable()) {
	        var lastIndex = this.index();
	        if (Input.isRepeated('down')) {
	            this.cursorDown(Input.isTriggered('down'));
	        }
	        if (Input.isRepeated('up')) {
	            this.cursorUp(Input.isTriggered('up'));
	        }
	        if (Input.isRepeated('right')) {
	           this.cursorDown(Input.isTriggered('down'));
	        }
	        if (Input.isRepeated('left')) {
	        	this.cursorUp(Input.isTriggered('up'));
	        }
	        if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
	            this.cursorPagedown();
	        }
	        if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
	            this.cursorPageup();
	        }
	        if (this.index() !== lastIndex) {
	            SoundManager.playCursor();
	        }
	    }
	};
	function Window_TurnNumber() {
	    this.initialize.apply(this, arguments);
	}

	Window_TurnNumber.prototype = Object.create(Window_Base.prototype);
	Window_TurnNumber.prototype.constructor = Window_TurnNumber;

	Window_TurnNumber.prototype.initialize = function(x, y) {
	    var width = this.windowWidth();
	    var height = this.windowHeight();
	    Window_Base.prototype.initialize.call(this, x, y, width, height);
	    this.refresh();
	};

	Window_TurnNumber.prototype.windowWidth = function() {
	    return SOUL_MV.RPS.turnWindowW;
	};

	Window_TurnNumber.prototype.windowHeight = function() {
	    return this.fittingHeight(1);
	};

	Window_TurnNumber.prototype.refresh = function() {
	    var x = this.textPadding();
	    var width = this.contents.width - this.textPadding() * 2;
	    this.contents.clear();
	    this.drawTextEx(SOUL_MV.RPS.matchName + " : " + String($gameSystem._rpsPhase),0,0)
	};

	Window_TurnNumber.prototype.open = function() {
	    this.refresh();
	    Window_Base.prototype.open.call(this);
	};
})();