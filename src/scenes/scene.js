import TileMap from './map/tilemap';

export default class Scene {

  constructor(canvas_id) {
    this.display = true;
    this.canvas = document.getElementById(canvas_id);
    this.context = this.canvas.getContext("2d");
    this.tilemap = null;
  }


  // Adjust the width and height of the canvas
  adjust(w, h) {
    this.canvas.width = w ? w : window.innerWidth;
    this.canvas.height = h ? h : window.innerHeight;
    return this;
  }

  createTileMap(data) {
    this.tilemap = new TileMap(data);
    return this.tilemap;
  }

  render() {
    if(!this.display)
      return false;

    let tile = daisy.assets.images.get('tile');

    for(var i = 0; i < this.tilemap.size.x; i++) {
        for(var j = 0; j < this.tilemap.size.y; j++) {
            if(this.tilemap.getTile(i, j).state != 0) {
                // this.roomCanvas.getContext().drawImage(tile, camera.getX() + (j - i) * 32, camera.getY() + (j + i) * 16, tile.width, tile.height);
                this.context.drawImage(tile, 500 + (j - i) * 16, 500 + (j + i) * 8, tile.width, tile.height);
            }
        }
    }

  }

  drawTileMap() {

  }



}
