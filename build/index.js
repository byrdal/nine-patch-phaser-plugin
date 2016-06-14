'use strict';

var NinePatchCache = require('./NinePatchCache');
/**
 * This function should be called when the image/spritesheet/texture has been loaded
 * @param {String} name - the key to refer to the created NinePatchCache
 * @param {String} imageKey   - REF NinePatchCache
 * @param {String} imageFrame - REF NinePatchCache
 * @param {Number} left       - REF NinePatchCache
 * @param {Number} right      - REF NinePatchCache
 * @param {Number} top        - REF NinePatchCache
 * @param {Number} bottom     - REF NinePatchCache
 */
Phaser.Cache.prototype.addNinePatch = function (name, imageKey, imageFrame, left, right, top, bottom) {
  var _ninePatches = this._cacheMap.ninePatches = this._cacheMap.ninePatches || {};

  if (_ninePatches[name]) {
    //Already added to the cache
    return;
  }

  _ninePatches[name] = new NinePatchCache(this.game, imageKey, imageFrame, left, right, top, bottom);
};
/** Return an instance of NinePatchCache match with the name */
Phaser.Cache.prototype.getNinePatch = function (name) {
  var _ninePatches = this._cacheMap.ninePatches = this._cacheMap.ninePatches || {};
  return _ninePatches[name];
};

/**
 * Remove the patch from the cache
 * @param name
 */
Phaser.Cache.prototype.removeNinePatch = function (name) {
  var _ninePatches = this._cacheMap.ninePatches = this._cacheMap.ninePatches || {};
  delete _ninePatches[name];
};

Phaser.NinePatchImage = require('./NinePatchImage');