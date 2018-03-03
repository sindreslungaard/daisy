import Camera from './camera';

export default class Cameras {

  constructor() {
    this.instances = new Map();

    // The camera that will be used for rendering
    // We instansiate a new camera here to allow developers to create their game without a custom camera
    this.current = new Camera(0, 0);
  }

  use(camera) {
    this.current = this.instances.get(camera);
  }

  create(name, x, y) {
    let camera = new Camera(x || 0, y || 0);
    this.instances.set(name, camera);
    return camera;
  }

}
