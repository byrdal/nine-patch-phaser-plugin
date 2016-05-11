declare module "nine-patch-phaser-plugin" {

}

declare module Phaser {
	class NinePatchImage extends Phaser.Image {
		constructor(game:Phaser.Game, x:number, y:number, key:string|NinePatchCache, frame:string|number);
		targetWidth:number;
		targetHeight:number;
	}

	interface NinePatchCache {
		CreateFrameData():void;
		CreateDimensionMap(width?:number, height?:number);
	}

	interface Cache {
		addNinePatch(name:string, imageKey:string, imageFrame:string|number, left:number, right:number, top:number, bottom:number):void;
		getNinePatch(name):NinePatchCache;
	}
}