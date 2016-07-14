"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NinePatchCache = function () {
	/**
  * * @param {Phaser.Game} game - A reference to the currently running game.
  * @param {String} imageKey - The reference to the Cache entry of the texture to cut from.
  * @param {String|Number} imageFrame - If the texture to cut from is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
  * @param  {Number} left - position of left most point of the center patch
  * @param  {Number} right - position of right most point of the center patch
  * @param  {Number} top - position of top most point of the center patch
  * @param  {Number} bottom - position of bottom most point of the center patch
  */

	function NinePatchCache(game, imageKey, imageFrame, left, right, top, bottom) {
		_classCallCheck(this, NinePatchCache);

		this.game = game;
		this.imageKey = imageKey;
		this.imageFrame = imageFrame;
		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;
		/** @type {Array} The 3x3 Texture Array that would be generated for the 9 patches */
		this.textures = [[], [], []];
		/** Image Cache - Support for earlier version of Phaser */
		var _images = game.cache._images || game.cache._cache.image;
		var imageCache = _images[imageKey];
		/** @type {PIXI.BaseTexture} Get the Base Texture to process */
		this.baseTexture = game.cache.getBaseTexture(imageKey) ? game.cache.getBaseTexture(imageKey) : imageCache.base;
		/** @type {Number} Positions and measures of the texture on the base texture */
		if (imageFrame) {
			var frameData = imageCache.frameData;
			var frame = frameData._frames[frameData._frameNames[imageFrame]];
			this.x = frame.x;
			this.y = frame.y;
			this.width = frame.width;
			this.height = frame.height;
		} else {
			/** The texture would cover the entire base texture if it isn't a part of a sprite sheet or texture atlas */
			this.x = 0;
			this.y = 0;
			this.width = this.baseTexture.width;
			this.height = this.baseTexture.height;
		}
		/** Process the data */
		this.CreateFrameData();
	}
	/** Generate the textures */


	_createClass(NinePatchCache, [{
		key: "CreateFrameData",
		value: function CreateFrameData() {
			var imageKey = this.imageKey;
			var baseTexture = this.baseTexture;
			var textures = this.textures;
			/** Calculate the position of each patch relative to the texture */

			var dimensions = this.CreateDimensionMap();
			/** Offset by the position of the frame */
			if (this.imageFrame !== undefined) {
				for (var i = 2; i >= 0; i--) {
					for (var j = 2; j >= 0; j--) {
						var item = dimensions[i][j];
						item.x += this.x;
						item.y += this.y;
					};
				};
			}
			/** Generate the textures by cutting from the base texture */
			for (var _i = 0; _i < 3; _i++) {
				for (var _j = 0; _j < 3; _j++) {
					this.textures[_i][_j] = new PIXI.Texture(baseTexture, dimensions[_i][_j]);
				}
			}
		}
		/**
   * Get the position of each patch based on the measures specified
   * @param {Number} width = this.width
   * @param {Number} height = this.height
   * @return {Array} The positions array mapped with the patches
   */

	}, {
		key: "CreateDimensionMap",
		value: function CreateDimensionMap() {
			var width = arguments.length <= 0 || arguments[0] === undefined ? this.width : arguments[0];
			var height = arguments.length <= 1 || arguments[1] === undefined ? this.height : arguments[1];
			var left = this.left;
			var right = this.right;
			var top = this.top;
			var bottom = this.bottom;
			/** position of the patches in the middle (horizontally and vertically) */

			var midH = width - left - right;
			var midV = height - top - bottom;
			/**
    * @type {Array} The positions array mapped with the patches
    * Would be returned at the end of this function
    */
			var dimensions = [[], [], []];
			/** Set positions for each patch and record in the dimensions*/
			for (var i = 2; i >= 0; i--) {
				for (var j = 2; j >= 0; j--) {
					var item = dimensions[i][j] = {};
					switch (i) {
						case 0:
							item.height = top;
							item.y = 0;
							break;
						case 1:
							item.height = midV;
							item.y = top;
							break;
						case 2:
							item.height = bottom;
							item.y = top + midV;
							break;
					}
					switch (j) {
						case 0:
							item.width = left;
							item.x = 0;
							break;
						case 1:
							item.width = midH;
							item.x = left;
							break;
						case 2:
							item.width = right;
							item.x = left + midH;
							break;
					}
				};
			};

			return dimensions;
		}
		/**  */
		/**
   * Generate patch images
   * @param {DisplayObject}
   * @return {Array} 3x3 Array of Phaser.Image for the patches
   */

	}, {
		key: "CreateImages",
		value: function CreateImages(parent) {
			var textures = this.textures;
			/** @type {Array} The returned array */
			var images = [[], [], []];
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					/** @type {Phaser.Image} The generated image */
					var image = images[i][j] = new PIXI.Sprite(textures[i][j]);
					/** Add the image to parent */
					parent.addChild(image);
				}
			}
			return images;
		}
	}, {
		key: "UpdateImages",
		value: function UpdateImages(parent) {
			var textures = this.textures;
			var k = 0;

			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					var image = parent.children[k];
					image.texture = textures[i][j];
					k++;
				}
			}
		}
	}]);

	return NinePatchCache;
}();

exports.default = NinePatchCache;
module.exports = exports['default'];