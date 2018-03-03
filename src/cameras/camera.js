import Point from 'point-geometry';

export default class Camera {

  constructor(x, y) {
    this.pos = new Point(x, y);
  }

  relativeTo(x, y) {
    let coordX = Math.round((x - this.pos.x - 64) / 64 + (y - this.pos.y) / 32);
    let coordY = Math.round((y - this.pos.y) / 32 - (x - this.pos.x) / 64);
  }

  use() {
    daisy.cameras.use(this);
  }

}
