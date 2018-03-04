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

    console.log("rendering!");
  }

  drawTileMap() {
    
  }



}
