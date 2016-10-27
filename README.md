# Nine Patch Phaser Plugin

*This Nine Patch Phaser Plugin is forked from [FilamentGames/nine-patch-phaser-plugin](https://github.com/FilamentGames/nine-patch-phaser-plugin). This repository offers better support for scaling and sizing og nine patches.*  

Nine Patch Phaser Plugin allows you to use [nine patch images](https://github.com/chrislondon/9-Patch-Image-for-Websites/wiki/What-Are-9-Patch-Images) in the HTML game framework [Phaser](http://phaser.io).

This is not technically a Phaser Plugin. It provides two methods in `game.cache` to generate nine patch textures and a `Phaser.NinePatchImage` class to create nine patch images from these textures.

The plugin is written using ES6 and compiled with [Babel](babeljs.io) and [Browserify](http://browserify.org/), tested on Phaser 2.5.0 and up.

## Demo

Check the `example` folder. The example includes a [dat.gui](https://github.com/dataarts/dat.gui) control panel that you can play with.

## Download

The source is available for download from [latest release](https://github.com/byrdal/nine-patch-phaser-plugin/releases) or by cloning the repository or download the files in `build` folder.

## Usage

Simply download the `nine-patch-phaser-plugin.js` or `nine-patch-phaser-plugin.min.js` script from [latest release](https://github.com/netcell/nine-patch-phaser-plugin/releases) and include it on your page after including Phaser:

```html
<script src="phaser.js"></script>
<script src="nine-patch-phaser-plugin.js"></script>
```

In the `create` method in your preloading states (to make sure the image/spritesheet/atlas is loaded), use `game.cache.addNinePatch` method to create the nine patch textures:
```javascript
game.cache.addNinePatch(name, key, frame, left, right, top, bottom);
```
- `name` is the reference key that would be used later to get the nine patch textures
- `key` is a key string of the image/spritesheet/atlas loaded
- `frame` is the optional index of the frame if the nine patch image is on a spritesheet or atlas, can be either string or number
- `left`, `right`, `top`, `bottom` are the left most, right most, top most and bottom most points of the center patch in the nine patch image.

After that, in your game, you can create a nine patch image as follow:
```javascript
var image = new Phaser.NinePatchImage(game, x, y, name, frame);
```
with `name` is the reference key you specified before.

To change the measures of the NinePatchImage, change the `width` and `height` properties. Also, remember that since Phaser.NinePatchImage actually extends Phaser.Image, so you can do anything that you can do on a Phaser.Image instance with a Phaser.NinePatchImage instance.

Check the example in `example` folder to see it in action :)

### License ###

This content is released under the (http://opensource.org/licenses/MIT) MIT License.

