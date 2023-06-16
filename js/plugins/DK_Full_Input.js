/*
Title: Full Input
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 5.0.0
Release: 21.08.2020
First release: 30.01.2016
*/

/*ru
Название: Полный Ввод
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 5.0.0
Релиз: 21.08.2020
Первый релиз: 30.01.2016
*/

/*:
* @plugindesc v.5.0.0 All keys of the keyboard and gamepad
* @author DKPlugins
* @url https://dk-plugins.ru
* @target MZ
* @help

 ### Info about plugin ###
 Title: DK_Full_Input
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 5.0.0
 Release: 21.08.2020
 First release: 30.01.2016

 ###===========================================================================
 ## Compatibility
 ###===========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###===========================================================================
 ## Important information
 ###===========================================================================
 The plugin changes the default behavior for handling keystrokes.
 In RPG Maker, the keypress time is always counted for the last key pressed.
 This plugin changes this system and now the time of pressing each key is counted separately.

 Default RPG Maker MV values for Alt, Space, Insert, Q, W, X, Z
 Alt: 'control'
 Space: 'ok'
 Insert: 'escape'
 Q: 'pageup'
 W: 'pagedown'
 X: 'escape'
 Z: 'ok'

 The values of this plugin for Alt, Space, Insert, Q, W, X, Z
 Alt: 'alt'
 Space: 'space'
 Insert: 'insert'
 Q: 'q'
 W: 'w'
 X: 'x'
 Z: 'z'

 ###===========================================================================
 ## Added functions
 ###===========================================================================
 Added tracking of gamepad triggers pressing and axis tilts
 Tested on Xbox One Wireless Gamepad
 Use to get values:
 Input.gamepad.lt - left trigger (float value of the force of pressing in the range from 0 to 1)
 Input.gamepad.rt - right trigger (float value of the force of pressing in the range from 0 to 1)
 Input.gamepad.axes - axes (Array with 4 float values)
 The axes have the following structure:
 [X-axis (left stick), Y-axis (left stick), X-axis (right stick), Y-axis (right stick)]

 Input.preferGamepad () - Returns true if the player is playing a gamepad

 Input.isAnyPressed(keys) - Returns true if at least one key is pressed (keys not specified).
 Returns true if at least one key from the keys array is pressed (keys is an array of keys).

 Input.isAnyTriggered(keys) - Returns true if at least one key is pressed and released (keys not specified).
 Returns true if at least one key from the keys array is pressed and released (keys is an array of keys).

 Input.isAnyRepeated(keys) - Returns true if pressing at least one key is repeated (keys not specified).
 Returns true if pressing at least one key from the keys array is repeated (keys is an array of keys).

 Input.isAnyLongPressed(keys) - Returns true if at least one key is pressed for a long time (keys not specified).
 Returns true if at least one key from the keys array is pressed for a long time (keys is an array of keys).

 Input.getPressedTime (keyName) - Returns the time the keyName was pressed in frames.

 If you create a plugin based on this:
 Before using any function, make sure that the user has installed the plugin:
 if (Imported.DK_Full_Input) {}

 Get plugin version:
 var version = Imported.DK_Full_Input;

 ###===========================================================================
 ## License and terms of use
 ###===========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 To use the plugin in commercial projects, you must be my subscriber on patreon
 https://www.patreon.com/dkplugins

 ###===========================================================================
 ## Support
 ###===========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins

 * @param Keyboard
 * @desc Customizing the keyboard keys
 * @type struct<Keyboard>
 * @default {"8":"backspace","9":"tab","13":"ok","16":"shift","17":"control","18":"alt","19":"pause","20":"capslock","27":"escape","32":"space","33":"pageup","34":"pagedown","35":"end","36":"home","37":"left","38":"up","39":"right","40":"down","44":"printscreen","45":"insert","46":"delete","47":"/","48":"0","49":"1","50":"2","51":"3","52":"4","53":"5","54":"6","55":"7","56":"8","57":"9","65":"a","66":"b","67":"c","68":"d","69":"e","70":"f","71":"g","72":"h","73":"i","74":"j","75":"k","76":"l","77":"m","78":"n","79":"o","80":"p","81":"q","82":"r","83":"s","84":"t","85":"u","86":"v","87":"w","88":"x","89":"y","90":"z","96":"escape","97":"numpad1","98":"down","99":"numpad3","100":"left","101":"numpad5","102":"right","103":"numpad7","104":"up","105":"numpad9","106":"*","107":"+","109":"-","110":".","111":"/","112":"f1","113":"f2","114":"f3","115":"f4","116":"f5","117":"f6","118":"f7","119":"f8","120":"debug","121":"f10","122":"f11","123":"f12","144":"numlock","145":"scrolllock","186":";","187":"=","188":"<","189":"-","190":">","191":"?","192":"`","219":"[","220":"|","221":"]","222":"\""}

 * @param Gamepad
 * @desc Customizing the gamepad keys
 * @type struct<Gamepad>
 * @default {"0":"ok","1":"cancel","2":"shift","3":"menu","4":"lb","5":"rb","6":"lt","7":"rt","8":"select","9":"start","10":"l3","11":"r3","12":"up","13":"down","14":"left","15":"right","16":"up","17":"down","18":"left","19":"right","20":"r_up","21":"r_down","22":"r_left","23":"r_right"}

 * @param Threshold
 * @desc The stick tilt value at which it is considered pressed
 * @type number
 * @decimals 2
 * @min 0.05
 * @max 1.00
 * @default 0.50

 * @param Key Repeat Wait
 * @desc Frames indicating long key press
 * @type number
 * @min 1
 * @default 24

 * @param Key Repeat Interval
 * @desc Frames indicating the time between repeated keystrokes
 * @type number
 * @min 1
 * @default 6

 * @param Switches
 * @desc List of switches
 * @type struct<Switches>[]
 * @default []

*/

/*:ru
 * @plugindesc v.5.0.0 Использование всех кнопок клавиатуры и геймпада
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_Full_Input
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 5.0.0
 Релиз: 21.08.2020
 Первый релиз: 30.01.2016

 ###===========================================================================
 ## Совместимость
 ###===========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###===========================================================================
 ## Важная информация
 ###===========================================================================
 Плагин изменяет стандартное поведение обработки нажатий клавиш.
 В RPG Maker время нажатия клавиши всегда считается для последней нажатой клавиши.
 Этот плагин меняет данную систему, и теперь считается время нажатия каждой клавиши отдельно.

 Изменено назначение следующих клавиш:
 Alt, Space, Insert, Q, W, X, Z

 Стандартные значения клавиш в RPG Maker MV для Alt, Space, Insert, Q, W, X, Z
 Alt: 'control'
 Space: 'ok'
 Insert: 'escape'
 Q: 'pageup'
 W: 'pagedown'
 X: 'escape'
 Z: 'ok'

 Значения для клавиш в этом плагине Alt, Space, Insert, Q, W, X, Z
 Alt: 'alt'
 Space: 'space'
 Insert: 'insert'
 Q: 'q'
 W: 'w'
 X: 'x'
 Z: 'z'

 ###===========================================================================
 ## Добавленные функции
 ###===========================================================================
 Добавлено отслеживание нажатия триггеров и отклонения осей геймпада.
 Проверено на беспроводном геймпаде Xbox One
 Используйте для получения значений:
 Input.gamepad.lt - левый триггер (значение с плавающей точкой силы нажатия в диапазоне от 0 до 1)
 Input.gamepad.rt - правый триггер (значение с плавающей точкой силы нажатия в диапазоне от 0 до 1)
 Input.gamepad.axes - оси (массив с 4 значениями с плавающей точкой)
 Оси имеют следующую структуру:
 [X-axis (левый стик), Y-axis (левый стик), X-axis (правый стик), Y-axis (правый стик)]

 Input.preferGamepad() - Возвращает true, если игрок играет на геймпаде

 Input.isAnyPressed(keys) - Возвращает true, если нажата хоть одна клавиша (keys не указано).
 Возвращает true, если нажата хоть одна клавиша из массива keys (keys - массив клавиш).

 Input.isAnyTriggered(keys) - Возвращает true, если нажата и отпущена хоть одна клавиша (keys не указано).
 Возвращает true, если нажата и отпущена хоть одна клавиша из массива keys (keys - массив клавиш).

 Input.isAnyRepeated(keys) - Возвращает true, если нажатие хоть одной клавиши повторяется (keys не указано).
 Возвращает true, если нажатие хоть одной клавиши из массива keys повторяется (keys - массив клавиш).

 Input.isAnyLongPressed(keys) - Возвращает true, если долго нажата хоть одна клавиша (keys не указано).
 Возвращает true, если долго нажата хоть одна клавиша из массива keys (keys - массив клавиш).

 Input.getPressedTime(keyName) - Возвращает время нажатия кнопки keyName в кадрах.

 Если Вы создаете свой плагин на основе этого:
 Перед использованием любых функций убедитесь, что у пользователя установлен данный плагин:
 if (Imported.DK_Full_Input) {}

 Получить версию плагина:
 var version = Imported.DK_Full_Input;

 ###===========================================================================
 ## Лицензия и правила использования плагина
 ###===========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Для использования плагина в коммерческих проектах необходимо быть моим подписчиком на патреоне
 https://www.patreon.com/dkplugins

 ###===========================================================================
 ## Поддержка
 ###===========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins

 * @param Keyboard
 * @text Клавиатура
 * @desc Настройка клавиш клавиатуры
 * @type struct<Keyboard>
 * @default {"8":"backspace","9":"tab","13":"ok","16":"shift","17":"control","18":"alt","19":"pause","20":"capslock","27":"escape","32":"space","33":"pageup","34":"pagedown","35":"end","36":"home","37":"left","38":"up","39":"right","40":"down","44":"printscreen","45":"insert","46":"delete","47":"/","48":"0","49":"1","50":"2","51":"3","52":"4","53":"5","54":"6","55":"7","56":"8","57":"9","65":"a","66":"b","67":"c","68":"d","69":"e","70":"f","71":"g","72":"h","73":"i","74":"j","75":"k","76":"l","77":"m","78":"n","79":"o","80":"p","81":"q","82":"r","83":"s","84":"t","85":"u","86":"v","87":"w","88":"x","89":"y","90":"z","96":"escape","97":"numpad1","98":"down","99":"numpad3","100":"left","101":"numpad5","102":"right","103":"numpad7","104":"up","105":"numpad9","106":"*","107":"+","109":"-","110":".","111":"/","112":"f1","113":"f2","114":"f3","115":"f4","116":"f5","117":"f6","118":"f7","119":"f8","120":"debug","121":"f10","122":"f11","123":"f12","144":"numlock","145":"scrolllock","186":";","187":"=","188":"<","189":"-","190":">","191":"?","192":"`","219":"[","220":"|","221":"]","222":"\""}

 * @param Gamepad
 * @text Геймпад
 * @desc Настройка клавиш геймпада
 * @type struct<Gamepad>
 * @default {"0":"ok","1":"cancel","2":"shift","3":"menu","4":"lb","5":"rb","6":"lt","7":"rt","8":"select","9":"start","10":"l3","11":"r3","12":"up","13":"down","14":"left","15":"right","16":"up","17":"down","18":"left","19":"right","20":"r_up","21":"r_down","22":"r_left","23":"r_right"}

 * @param Threshold
 * @text Отклонение стика
 * @desc Значение отклонения стика при котором он считается нажатым
 * @type number
 * @decimals 2
 * @min 0.05
 * @max 1.00
 * @default 0.50

 * @param Key Repeat Wait
 * @text Время длительного нажатия
 * @desc Количество кадров, обозначающее длительное нажатие клавиши
 * @type number
 * @min 1
 * @default 24

 * @param Key Repeat Interval
 * @text Интервал повторения нажатия
 * @desc Количество кадров, обозначающее время между повторами нажатия клавиши
 * @type number
 * @min 1
 * @default 6

 * @param Switches
 * @text Переключатели
 * @desc Список переключателей
 * @type struct<Switches>[]
 * @default []

*/

/*~struct~Keyboard:

 * @param 8
 * @text Backspace
 * @default backspace

 * @param 9
 * @text Tab
 * @default tab

 * @param 13
 * @text Enter
 * @default ok

 * @param 16
 * @text Left shift
 * @default shift

 * @param 17
 * @text Ctrl
 * @default control

 * @param 18
 * @text Alt
 * @default alt

 * @param 19
 * @text Pause
 * @default pause

 * @param 20
 * @text Caps Lock
 * @default capslock

 * @param 27
 * @text Esc
 * @default escape

 * @param 32
 * @text Space
 * @default space

 * @param 33
 * @text Page Up
 * @default pageup

 * @param 34
 * @text Page Down
 * @default pagedown

 * @param 35
 * @text End
 * @default end

 * @param 36
 * @text Home
 * @default home

 * @param 37
 * @text Left
 * @default left

 * @param 38
 * @text Up
 * @default up

 * @param 39
 * @text Right
 * @default right

 * @param 40
 * @text Down
 * @default down

 * @param 44
 * @text Print Screen
 * @default printscreen

 * @param 45
 * @text Insert
 * @default insert

 * @param 46
 * @text Del
 * @default delete

 * @param 47
 * @text /
 * @default /

 * @param 48
 * @text 0
 * @default 0

 * @param 49
 * @text 1
 * @default 1

 * @param 50
 * @text 2
 * @default 2

 * @param 51
 * @text 3
 * @default 3

 * @param 52
 * @text 4
 * @default 4

 * @param 53
 * @text 5
 * @default 5

 * @param 54
 * @text 6
 * @default 6

 * @param 55
 * @text 7
 * @default 7

 * @param 56
 * @text 8
 * @default 8

 * @param 57
 * @text 9
 * @default 9

 * @param 65
 * @text a
 * @default a

 * @param 66
 * @text b
 * @default b

 * @param 67
 * @text c
 * @default c

 * @param 68
 * @text d
 * @default d

 * @param 69
 * @text e
 * @default e

 * @param 70
 * @text f
 * @default f

 * @param 71
 * @text g
 * @default g

 * @param 72
 * @text h
 * @default h

 * @param 73
 * @text i
 * @default i

 * @param 74
 * @text j
 * @default j

 * @param 75
 * @text k
 * @default k

 * @param 76
 * @text l
 * @default l

 * @param 77
 * @text m
 * @default m

 * @param 78
 * @text n
 * @default n

 * @param 79
 * @text o
 * @default o

 * @param 80
 * @text p
 * @default p

 * @param 81
 * @text q
 * @default q

 * @param 82
 * @text r
 * @default r

 * @param 83
 * @text s
 * @default s

 * @param 84
 * @text t
 * @default t

 * @param 85
 * @text u
 * @default u

 * @param 86
 * @text v
 * @default v

 * @param 87
 * @text w
 * @default w

 * @param 88
 * @text x
 * @default x

 * @param 89
 * @text y
 * @default y

 * @param 90
 * @text z
 * @default z

 * @param 96
 * @text Numpad 0
 * @default escape

 * @param 97
 * @text Numpad 1
 * @default numpad1

 * @param 98
 * @text Numpad 2
 * @default down

 * @param 99
 * @text Numpad 3
 * @default numpad3

 * @param 100
 * @text Numpad 4
 * @default left

 * @param 101
 * @text Numpad 5
 * @default numpad5

 * @param 102
 * @text Numpad 6
 * @default right

 * @param 103
 * @text Numpad 7
 * @default numpad7

 * @param 104
 * @text Numpad 8
 * @default up

 * @param 105
 * @text Numpad 9
 * @default numpad9

 * @param 106
 * @text Numpad *
 * @default *

 * @param 107
 * @text Numpad +
 * @default +

 * @param 109
 * @text Numpad -
 * @default -

 * @param 110
 * @text Numpad .
 * @default .

 * @param 111
 * @text Numpad /
 * @default /

 * @param 112
 * @text F1
 * @default f1

 * @param 113
 * @text F2
 * @default f2

 * @param 114
 * @text F3
 * @default f3

 * @param 115
 * @text F4
 * @default f4

 * @param 116
 * @text F5
 * @default f5

 * @param 117
 * @text F6
 * @default f6

 * @param 118
 * @text F7
 * @default f7

 * @param 119
 * @text F8
 * @default f8

 * @param 120
 * @text F9
 * @default debug

 * @param 121
 * @text F10
 * @default f10

 * @param 122
 * @text F11
 * @default f11

 * @param 123
 * @text F12
 * @default f12

 * @param 144
 * @text Num Lock
 * @default numlock

 * @param 145
 * @text Scroll Lock
 * @default scrolllock

 * @param 186
 * @text ;:
 * @default ;

 * @param 187
 * @text =+
 * @default =

 * @param 188
 * @text ,<
 * @default <

 * @param 189
 * @text -_
 * @default -

 * @param 190
 * @text .>
 * @default >

 * @param 191
 * @text /?
 * @default ?

 * @param 192
 * @text `~
 * @default `

 * @param 219
 * @text [{
 * @default [

 * @param 220
 * @text \|
 * @default |

 * @param 221
 * @text ]}
 * @default ]

 * @param 222
 * @text '"
 * @default "

 */

/*~struct~Gamepad:

 * @param 0
 * @text A (xbox)/X(ps)
 * @default ok

 * @param 1
 * @text B (xbox)/O(ps)
 * @default cancel

 * @param 2
 * @text X (xbox)/Square(ps)
 * @default shift

 * @param 3
 * @text Y (xbox)/Triangle(ps)
 * @default menu

 * @param 4
 * @text LB (xbox)/L1(ps)
 * @default pageup

 * @param 5
 * @text RB (xbox)/R1(ps)
 * @default pagedown

 * @param 6
 * @text LT (xbox)/L2(ps)
 * @default lt

 * @param 7
 * @text RT (xbox)/R2(ps)
 * @default rt

 * @param 8
 * @text Select
 * @default select

 * @param 9
 * @text Start
 * @default start

 * @param 10
 * @text Left stick pressed (L3)
 * @default l3

 * @param 11
 * @text Right stick pressed (R3)
 * @default r3

 * @param 12
 * @text D-pad up
 * @default up

 * @param 13
 * @text D-pad down
 * @default down

 * @param 14
 * @text D-pad left
 * @default left

 * @param 15
 * @text D-pad right
 * @default right

 * @param 16
 * @text Left stick up
 * @default up

 * @param 17
 * @text Left stick down
 * @default down

 * @param 18
 * @text Left stick left
 * @default left

 * @param 19
 * @text Left stick right
 * @default right

 * @param 20
 * @text Right stick up
 * @default r_up

 * @param 21
 * @text Right stick down
 * @default r_down

 * @param 22
 * @text Right stick left
 * @default r_left

 * @param 23
 * @text Right stick right
 * @default r_right

 */

/*~struct~Switches:

 * @param Key Name
 * @desc Key Name

 * @param Switch
 * @desc Switch that is controlled by pressing a key
 * @type switch

 */

/*~struct~Switches:ru

 * @param Key Name
 * @text Название клавиши
 * @desc Название клавиши

 * @param Switch
 * @text Переключатель
 * @desc Переключатель, который управляется нажатием клавиши
 * @type switch

 */

'use strict';

var Imported = Imported || {};
Imported['DK_Full_Input'] = '5.0.0';

//===========================================================================
// initialize parameters
//===========================================================================

(function() {
    const parameters = PluginManager.parameters('DK_Full_Input');

    Input.keyMapper = JSON.parse(parameters['Keyboard']);
    Input.gamepadMapper = JSON.parse(parameters['Gamepad']);
    Input.keyRepeatWait = parseInt(parameters['Key Repeat Wait']) || 24;
    Input.keyRepeatInterval = parseInt(parameters['Key Repeat Interval']) || 6;
    Input.threshold = parseFloat(parameters['Threshold']) || 0.5;

    Input.__switches__ = JSON.parse(parameters['Switches']).reduce((acc, json) => {
        const object = JSON.parse(json);
        const keyName = object['Key Name'];
        const switches = acc[keyName] || (acc[keyName] = []);
        const switchId = parseInt(object['Switch']);

        if (switchId > 0) {
            switches.push(switchId);
        }

        return acc;
    }, {});

}());

//===========================================================================
// Input
//===========================================================================

// properties

Object.defineProperties(Input, {

	/**
	 * @type {Object}
	 * @memberof Input
	 */
	gamepad: {
        get: function() {
            return this._gamepad;
        }
    }

});

//

const Full_Input_Input_clear = Input.clear;
Input.clear = function() {
    Full_Input_Input_clear.apply(this, arguments);

	this._gamepad = { axes: [0, 0, 0, 0], lt: 0, rt: 0 };
    this._pressedTime = {};
    this._keyboardDate = 0;
    this._gamepadDate = 0;
};

Input.update = function() {
    this._pollGamepads();

    let updateDate = false;

    for (const name in this._currentState) {
        if (this._currentState[name]) {
            if (!this._previousState[name]) {
                this._pressedTime[name] = 0;

                updateDate = true;
            } else {
                this._pressedTime[name]++;
            }
        } else {
            delete this._pressedTime[name];
        }

        this._previousState[name] = this._currentState[name];
    }

    if (this._virtualButton) {
        updateDate = true;

        this._currentState[this._virtualButton] = true;
        this._pressedTime[this._virtualButton] = 0;
        this._keyboardDate = Date.now();

        this._latestButton = this._virtualButton;

        delete this._virtualButton;
    } else if (this._latestButton) {
        delete this._currentState[this._latestButton];
        delete this._pressedTime[this._latestButton];
        delete this._latestButton;
    }

    if (updateDate) {
        this._date = Date.now();
    }

    this._updateDirection();
};

Input.isTriggered = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isTriggered('escape')) {
        return true;
    }

    return this._pressedTime[keyName] === 0;
};

Input.isRepeated = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isRepeated('escape')) {
        return true;
    }

    return (this._pressedTime[keyName] === 0 ||
            (this._pressedTime[keyName] >= this.keyRepeatWait &&
                this._pressedTime[keyName] % this.keyRepeatInterval === 0));
};

Input.isLongPressed = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isLongPressed('escape')) {
        return true;
    }

    return this._pressedTime[keyName] >= this.keyRepeatWait;
};

const Full_Input_Input_onKeyDown = Input._onKeyDown;
Input._onKeyDown = function(event) {
    Full_Input_Input_onKeyDown.apply(this, arguments);

    this._keyboardDate = Date.now();

    if (this._isEscapeCompatible(this.keyMapper[event.keyCode])) {
		this._updateSwitches('escape', true);
	} else {
		this._updateSwitches(this.keyMapper[event.keyCode], true);
	}
};

const Full_Input_Input_onKeyUp = Input._onKeyUp;
Input._onKeyUp = function(event) {
    Full_Input_Input_onKeyUp.apply(this, arguments);

	if (this._isEscapeCompatible(this.keyMapper[event.keyCode])) {
		this._updateSwitches('escape', false);
	} else {
		this._updateSwitches(this.keyMapper[event.keyCode], false);
	}
};

/**
 * @private
 * @param gamepad
 */
Input._updateGamepadState = function(gamepad) {
	const lastState = this._gamepadStates[gamepad.index] || [];
    const newState = [];
    const buttons = gamepad.buttons;
    const axes = gamepad.axes;
    const threshold = this.threshold;
    const leftTriggerIndex = 6;
    const rightTriggerIndex = 7;
    let updateDate = false;

	buttons.forEach((button, index) => {
		newState[index] = button.pressed;
    });

	newState[16] = axes[1] < -threshold; // l_up
	newState[17] = axes[1] > threshold; // l_down
	newState[18] = axes[0] < -threshold; // l_left
	newState[19] = axes[0] > threshold; // l_right
	newState[20] = axes[3] < -threshold; // r_up
	newState[21] = axes[3] > threshold; // r_down
	newState[22] = axes[2] < -threshold; // r_left
	newState[23] = axes[2] > threshold; // r_right

	newState.forEach((value, index) => {
        const keyName = this.gamepadMapper[index];

        if (!keyName) {
            return;
		}

		if (lastState[index] !== value) {
			this._currentState[keyName] = value;
		}

        if (value) {
			updateDate = true;

			this._updateSwitches(keyName, true);
        } else if (!value && lastState[index]) {
            this._updateSwitches(keyName, false);
		}
    });

	if (updateDate) {
		this._gamepadDate = Date.now();
	}

	this._gamepadStates[gamepad.index] = newState;
	this._gamepad = {
        axes: gamepad.axes,
        lt: buttons[leftTriggerIndex] && buttons[leftTriggerIndex].value,
        rt: buttons[rightTriggerIndex] && buttons[rightTriggerIndex].value
    };
};

Input._updateSwitches = function(keyName, state) {
    (Input.__switches__[keyName] || []).forEach((switchId) => {
        $gameSwitches.setValue(switchId, state);
    });
};

//

/**
 * @static
 * @param [String[]] - Keys
 * @returns {Boolean}
 */
Input.isAnyPressed = function(keys) {
	return Array.isArray(keys) ?
		keys.some(key => this.isPressed(key))
		: Object.keys(this._pressedTime).length > 0;
};

/**
 * @static
 * @param [String[]] - Keys
 * @returns {Boolean}
 */
Input.isAnyTriggered = function(keys) {
	return Array.isArray(keys) ?
		keys.some(key => this.isTriggered(key))
		: Object.keys(this._pressedTime).some(key => this.isTriggered(key));
};

/**
 * @static
 * @param [String[]] - Keys
 * @returns {Boolean}
 */
Input.isAnyRepeated = function(keys) {
	return Array.isArray(keys) ?
		keys.some(key => this.isRepeated(key))
		: Object.keys(this._pressedTime).some(key => this.isRepeated(key));
};

/**
 * @static
 * @param [String[]] - Keys
 * @returns {Boolean}
 */
Input.isAnyLongPressed = function(keys) {
	return Array.isArray(keys) ?
		keys.some(key => this.isLongPressed(key))
		: Object.keys(this._pressedTime).some(key => this.isLongPressed(key));
};

/**
 * @static
 * @param {String} keyName - Key name
 * @returns {Number}
 */
Input.getPressedTime = function(keyName) {
	return this._pressedTime[keyName] || 0;
};

/**
 * @static
 * @returns {Boolean}
 */
Input.preferGamepad = function() {
	return this._gamepadDate > this._keyboardDate;
};
