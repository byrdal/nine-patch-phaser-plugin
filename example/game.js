var game = new Phaser.Game(600, 400, Phaser.CANVAS, 'game', {
	preload: function preload() {
		game.load.atlasXML('blueSheet', 'UIpack/blueSheet.png', 'UIpack/blueSheet.xml');
	},
	create: function create() {
		/** Cache the patches' textures */
		game.cache.addNinePatch('blue_button02', 'blueSheet', 'blue_button02.png', 10, 10, 10, 10);
		/** @type {Phaser.NinePatchImage} Create a NinePatchImage from cached textures */
		var image = new Phaser.NinePatchImage(game, game.width/2, game.height/2, 'blue_button02', 0);
		game.add.existing(image);
		/** Set the measures for image - [AUTOMATICALLY UPDATED] */
			image.width  = 100;
			image.height = 50;
		/** Set anchor for image - [NEEDS MANUAL UPDATE] */
			image.anchor.set(0.5, 0.5);
			image.UpdateImageSizes();
		/** [NOT IMPORTANT] Dat.Gui Controller */
		var gui = new dat.GUI();
		var position = gui.addFolder('position');
			position.add(image, 'x').step(1);
			position.add(image, 'y').step(1);
		var measures = gui.addFolder('measures');
			measures.add(image, 'width').step(1);
			measures.add(image, 'height').step(1);
		var scale = gui.addFolder('scale');
			scale.add(image.scale, 'x').step(0.01);
			scale.add(image.scale, 'y').step(0.01);
		var anchor = gui.addFolder('anchor');
			anchor.add(image.anchor, 'x').step(0.01);
			anchor.add(image.anchor, 'y').step(0.01);
			gui.add(image, 'UpdateImageSizes');
	}
})