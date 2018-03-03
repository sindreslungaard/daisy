import Scene from './scene';

export default class Scenes {

  constructor() {
    this.instances = new Map();
  }

  create(name, canvas_id) {
    let scene = new Scene(canvas_id);
    this.instances.set(name, scene);
    return scene;
  }


}
