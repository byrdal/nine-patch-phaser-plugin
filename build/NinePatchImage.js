'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Return true if value is a String
 * TODO: Use a better method to prevent error
 */
function isString(value) {
	return typeof value === 'string';
}

var NinePatchImage = function (_PIXI$DisplayObjectCo) {
	_inherits(NinePatchImage, _PIXI$DisplayObjectCo);

	/**
  * @param {Phaser.Game} game - REF Phaser.Image params
  * @param {Number} x  - REF Phaser.Image params
  * @param {Number} y  - REF Phaser.Image params
  * @param  {String || NinePatchCache} key - The NinePatchCache used by the NinePatchImage. It can be a string which is a reference to the Cache entry, or an instance of a NinePatchCache.
  */

	function NinePatchImage(game, x, y, key, frame) {
		_classCallCheck(this, NinePatchImage);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NinePatchImage).call(this));

		_this.anchor = new PIXI.Point();

		Phaser.Component.Core.init.call(_this, game, x, y);

		_this.loadTexture(key, frame);
		return _this;
	}

	_createClass(NinePatchImage, [{
		key: 'preUpdate',
		value: function preUpdate() {
			Phaser.Component.Core.preUpdate.call(this);
		}
	}, {
		key: 'postUpdate',
		value: function postUpdate() {
			//Don't do anything
		}
	}, {
		key: 'loadTexture',
		value: function loadTexture(key, frame) {
			/** Get the NinePatchCache instance */
			var ninePatchImages;

			if (typeof key == 'string') {
				ninePatchImages = game.cache.getNinePatch(key);
			} else if (true /** Check if key is an instance of NinePatchCache */) {
					ninePatchImages = key;
				} else throw new Error('NinePatchImage key must be a String or an instance of NinePatchCache');

			this.ninePatchImages = ninePatchImages;

			if (!this.images) {
				/** @type {Array} Generate 9 instances of Phaser.Image as the children of this */
				this.images = ninePatchImages.CreateImages(this);
			} else {
				//If we already have images, update their textures
				ninePatchImages.UpdateImages(this);
			}

			/** Setting measures for this */
			this.originalWidth = ninePatchImages.width;
			this.originalHeight = ninePatchImages.height;
		}
	}, {
		key: 'updateTransform',
		value: function updateTransform() {
			if (!this.visible) {
				return;
			}

			//Backout global scale because we are going to implement our own scaling behavior
			var origScaleX = this.scale.x;
			var origScaleY = this.scale.y;
			this.scale.set(1 / this.parent.worldScale.x, 1 / this.parent.worldScale.y);
			this.displayObjectUpdateTransform();
			this.scale.set(origScaleX, origScaleY);

			if (this._cacheAsBitmap) {
				return;
			}

			this.UpdateImageSizes();

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].updateTransform();
			}
		}

		/** Update images' positions to match the new measures */

	}, {
		key: 'UpdateImageSizes',
		value: function UpdateImageSizes() {
			var ninePatchImages = this.ninePatchImages;
			var originalWidth = this.originalWidth;
			var originalHeight = this.originalHeight;
			var images = this.images;
			var anchor = this.anchor;
			/** Get the positions for the new measures */

			var newWidth = originalWidth * this.parent.worldScale.x * this.scale.x;
			var newHeight = originalHeight * this.parent.worldScale.y * this.scale.y;

			if (newWidth == this.currentWidth && newHeight == this.currentHeight) {
				//No need to recalc
				return;
			}

			this.currentWidth = newWidth;
			this.currentHeight = newHeight;

			var dimensions = ninePatchImages.CreateDimensionMap(newWidth, newHeight);
			/** Calculate the padding to match the anchor */
			var paddingX = anchor.x * newWidth;
			var paddingY = anchor.y * newHeight;
			/** Loop through all images and update the positions */
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					var image = images[i][j];
					var dimension = dimensions[i][j];
					image.x = dimension.x - paddingX;
					image.y = dimension.y - paddingY;
					image.width = dimension.width;
					image.height = dimension.height;
				}
			}
		}
	}]);

	return NinePatchImage;
}(PIXI.DisplayObjectContainer);

exports.default = NinePatchImage;


Phaser.Component.Core.install.call(NinePatchImage.prototype, ['Bounds', 'BringToTop', 'Destroy', 'InputEnabled', 'Delta', 'Overlap', 'Reset']);
module.exports = exports['default'];