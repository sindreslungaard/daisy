export default class Assets {

  constructor() {

    // We store all images we want to use here
    this.images = new Map();
  }

  // Load a single image from path
  loadImage(name, path) {
    return new Promise((resolve, reject) => {

      if(!path)
        reject(new Error('Path not specified'));

      let image = new Image();

      image.onerror = (error) => {
        reject(error);
      }

      image.onload = () => {
        this.images.set(name, image)
        resolve();
      }

      image.src = path;

    });
  }


  // Load an array of images, may serve as a preloader
  loadImages(images) {
    let promises = [];

    for(var i = 0; i < images.length; i++) {
      let image = images[i];
      promises.push(this.loadImage(image.name, image.path));
    }

    return Promise.all(promises);
  }



}
