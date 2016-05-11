declare module Phaser {
	class NinePatchImage extends PIXI.DisplayObjectContainer {
		constructor(game:Phaser.Game, x:number, y:number, key:string|NinePatchCache, frame:string|number);
		public targetWidth:number;
		public targetHeight:number;
		public anchor:PIXI.Point;
		public bottom: number;
		public components: any;
		public debug: boolean;
		public deltaX: number;
		public deltaY: number;
		public deltaZ: number;
		public destroyPhase: boolean;
		public events: Phaser.Events;
		public exists: boolean;
		public fresh: boolean;
		public game: Phaser.Game;
		public input: Phaser.InputHandler;
		public inputEnabled: boolean;
		public left: number;
		public name: string;
		public offsetX: number;
		public offsetY: number;
		public pendingDestroy: boolean;
		public previousPosition: Phaser.Point;
		public previousRotation: number;
		public position: Phaser.Point;
		public renderOrderID: number;
		public right: number;
		public scale: Phaser.Point;
		public top: number;
		public type: number;
		public world: Phaser.Point;
		public x: number;
		public y: number;
		public z: number;
		protected worldTransform:PIXI.Matrix;

		public bringToTop: () => NinePatchImage;
		public checkTransform: (wt: PIXI.Matrix) => void;
		public destroy: (destroyChildren?: boolean) => void;
		public moveUp: () => NinePatchImage;
		public moveDown: () => NinePatchImage;
		public overlap: (displayObject: Phaser.Sprite | Phaser.Image | Phaser.TileSprite | Phaser.Button | PIXI.DisplayObject) => boolean;
		public reset: (x: number, y: number, health?: number) => Phaser.Sprite;
		public sendToBack: () => NinePatchImage;
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