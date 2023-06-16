//=============================================================================
// Kadafi - Disable Dual Touch
// Kadafi_DisableDualTouch.js
//=============================================================================

var Imported = Imported || {};
Imported.Kadafi_DisableDualTouch = true;

var Kadafi = Kadafi || {};
Kadafi.DDT = Kadafi.DDT || {};
Kadafi.DDT.version = 1.00;

//=============================================================================
/*:
 * @plugindesc v1.00 Disable Dual Touch
 * @author Kadafi
 *
 * @param DisableDualTouch
 * @text Disable Dual Touch
 * @type boolean
 * @default true
 * @on Yes
 * @off No
 *
 * @help
 * ============================================================================
 * Description
 * ============================================================================
 *  
 * This script allows you to disable dual touch in phone game.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished plugin!
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * - Free to use in commercial projects
 * - Credits to Kadafi in your project
 *
 */
 //=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Kadafi.Parameters = PluginManager.parameters('Kadafi_DisableDualTouch');
Kadafi.CIS.disableDualTouch = eval(Kadafi.Parameters['DisableDualTouch']);

//=============================================================================
// TouchInput
//=============================================================================

if (Kadafi.CIS.disableDualTouch) {
    TouchInput.isCancelled = function() {
        return false;
    };
};