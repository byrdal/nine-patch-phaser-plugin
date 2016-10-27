/**
 * Return true if value is a String
 * TODO: Use a better method to prevent error
 */
function isString(value){
	return typeof value === 'string';
}

export default class NinePatchImage extends PIXI.DisplayObjectContainer {
	/**
	 * @param {Phaser.Game} game - REF Phaser.Image params
	 * @param {Number} x  - REF Phaser.Image params
	 * @param {Number} y  - REF Phaser.Image params
	 * @param  {String || NinePatchCache} key - The NinePatchCache used by the NinePatchImage. It can be a string which is a reference to the Cache entry, or an instance of a NinePatchCache.
	 */
	constructor(game, x, y, key, frame) {
		super();
		this.anchor = new PIXI.Point();

		Phaser.Component.Core.init.call(this, game, x, y);

		this.loadTexture(key, frame);
	}

	preUpdate() {
		Phaser.Component.Core.preUpdate.call(this);
	}

	postUpdate() {
		//Don't do anything
	}

	
	loadTexture(key, frame) {
		/** Get the NinePatchCache instance */
		var ninePatchImages;

		if (typeof key == 'string') {
			ninePatchImages = this.game.cache.getNinePatch(key);
		} else if (true /** Check if key is an instance of NinePatchCache */) {
			ninePatchImages = key;
		} else throw new Error('NinePatchImage key must be a String or an instance of NinePatchCache');

		this.ninePatchImages = ninePatchImages;

		if(!this.images) {
			/** @type {Array} Generate 9 instances of Phaser.Image as the children of this */
			this.images = ninePatchImages.CreateImages(this);
		} else {
			//If we already have images, update their textures
			ninePatchImages.UpdateImages(this);
		}

		/** Setting measures for this */
		this._width  = ninePatchImages.width;
		this._height = ninePatchImages.height;
	}

	updateTransform() {
		if (!this.visible)
		{
			return;
		}

		//Backout global scale because we are going to implement our own scaling behavior
		var origScaleX = this.scale.x;
		var origScaleY = this.scale.y;
		//Workaround changes in Phaser 2.5.0 to how worldScale is calculated
		var pwt = this.parent.worldTransform;
		this.scale.set(1 / Math.sqrt(pwt.a * pwt.a + pwt.b * pwt.b), 1 / Math.sqrt(pwt.c * pwt.c + pwt.d * pwt.d));
		this.displayObjectUpdateTransform();
		this.scale.set(origScaleX, origScaleY);

		if (this._cacheAsBitmap)
		{
			return;
		}

		this.UpdateImageSizes();

		for (var i = 0; i < this.children.length; i++)
		{
			this.children[i].updateTransform();
		}
	}

	/** Update images' positions to match the new measures */
	UpdateImageSizes() {
		var {ninePatchImages, originalWidth, originalHeight, images, anchor} = this;
		/** Get the positions for the new measures */
		//Workaround changes in Phaser 2.5.0 to how worldScale is calculated
		var pwt = this.parent.worldTransform;
		var newWidth = originalWidth * Math.sqrt(pwt.a * pwt.a + pwt.b * pwt.b) * this.scale.x;
		var newHeight = originalHeight * Math.sqrt(pwt.c * pwt.c + pwt.d * pwt.d) * this.scale.y;

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
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				let image = images[i][j];
				let dimension = dimensions[i][j];
				image.x = dimension.x - paddingX;
				image.y = dimension.y - paddingY;
				image.width = dimension.width;
				image.height = dimension.height;
			}
		}
	}
}

Phaser.Component.Core.install.call(NinePatchImage.prototype, [
	'Bounds',
	'BringToTop',
	'Destroy',
	'InputEnabled',
	'Delta',
	'Overlap',
	'Reset'
]);


Object.defineProperty(NinePatchImage.prototype, 'width', {
	get: function() {
		return this._width;
	},

	set: function(value) {
		this._width = value;
		this.UpdateImageSizes();
	}
});

Object.defineProperty(NinePatchImage.prototype, 'height', {
	get: function() {
		return this._height;
	},

	set: function(value) {
		this._height = value;
		this.UpdateImageSizes();
	}
});
