export default class Scene {

  constructor(canvas_id) {
    this.render = true;
    this.canvas = document.getElementById(canvas_id);
    this.context = this.canvas.getContext("2d");
  }


  // Adjust the width and height of the canvas
  adjust(w, h) {
    this.canvas.width = w ? w : window.innerWidth;
    this.canvas.height = h ? h : window.innerHeight;
  }

  createMap() {

  }



}
