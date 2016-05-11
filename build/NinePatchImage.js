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

var NinePatchImage = function (_Phaser$Image) {
	_inherits(NinePatchImage, _Phaser$Image);

	/**
  * @param {Phaser.Game} game - REF Phaser.Image params
  * @param {Number} x = 0 - REF Phaser.Image params
  * @param {Number} y = 0 - REF Phaser.Image params
  * @param  {String || NinePatchCache} key - The NinePatchCache used by the NinePatchImage. It can be a string which is a reference to the Cache entry, or an instance of a NinePatchCache.
  * @param {NinePatchCache} ninePatchImages - To be deprecated.
  */

	function NinePatchImage(game) {
		var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
		var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
		var key = arguments[3];
		var ninePatchImages = arguments[4];

		_classCallCheck(this, NinePatchImage);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NinePatchImage).call(this, game, x, y, PIXI.Texture.emptyTexture));

		game.add.existing(_this);
		/** Get the NinePatchCache instance */
		if (!ninePatchImages) {
			if (typeof key == 'string') {
				ninePatchImages = game.cache.getNinePatch(key);
			} else if (true /** Check if key is an instance of NinePatchCache */) {
					ninePatchImages = key;
				} else throw new Error('NinePatchImage key must be a String or an instance of NinePatchCache');
		}
		_this.ninePatchImages = ninePatchImages;
		/** @type {Array} Generate 9 instances of Phaser.Image as the children of this */
		_this.images = ninePatchImages.CreateImages(_this);
		/** Setting measures for this */
		_this.currentWidth = ninePatchImages.width;
		_this.currentHeight = ninePatchImages.height;
		/** Update images' positions */
		_this.UpdateImageSizes();
		return _this;
	}
	/** Get/Set for measures to update images' positions on chagnges */


	_createClass(NinePatchImage, [{
		key: 'UpdateImageSizes',

		/** Update images' positions to match the new measures */
		value: function UpdateImageSizes() {
			var ninePatchImages = this.ninePatchImages;
			var currentWidth = this.currentWidth;
			var currentHeight = this.currentHeight;
			var images = this.images;
			var anchor = this.anchor;
			/** Get the positions for the new measures */

			var dimensions = ninePatchImages.CreateDimensionMap(currentWidth, currentHeight);
			/** Calculate the padding to match the anchor */
			var paddingX = anchor.x * currentWidth;
			var paddingY = anchor.y * currentHeight;
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
	}, {
		key: 'targetWidth',
		get: function get() {
			return this.currentWidth;
		},
		set: function set(value) {
			this.currentWidth = value;
			this.UpdateImageSizes();
		}
	}, {
		key: 'targetHeight',
		get: function get() {
			return this.currentHeight;
		},
		set: function set(value) {
			this.currentHeight = value;
			this.UpdateImageSizes();
		}
	}]);

	return NinePatchImage;
}(Phaser.Image);

exports.default = NinePatchImage;
module.exports = exports['default'];