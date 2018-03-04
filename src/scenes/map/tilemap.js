import Tile from './tile';

export default class Map {

  constructor(data) {
    this.data = data;

    this.size = {
      x: data.frameLength,
      y: (data.tiles.length / data.frameLength)
    };

    this.tiles = this.parseTileData();
  }

  parseTileData() {
      let arr = new Array(this.size.x);
      for(let i = 0; i < this.size.x; i++) {
          arr[i] = new Array(this.size.y);
          for(let n = 0; n < this.size.y; n++) {
              arr[i][n] = new Tile(this.valueFromMapData(i, n));
          }
      }
      return arr;
  }

  valueFromMapData(x, y) {
     let index = this.size.x * y;
     return this.data.tiles.substring(index + x, index + x + 1);
  }



}
