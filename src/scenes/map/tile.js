import TileState from './tilestate';

export default class Tile {

  constructor(dataValue) {

    if(!isNaN(dataValue) && isFinite(dataValue)) {
      if(dataValue == 0) {
        this.height = 1;
        this.state = TileState.EMPTY;
      } else {
        this.height = dataValue;
        this.state = TileState.OPEN;
      }
    } else {
      // If we want a tile to have a higher height than 9, we use letters in alphabetic order
      switch(dataValue) {
          case "a":
              this.height = 10;
              break;
          case "b":
              this.height = 11;
              break;
          case "c":
              this.height = 12;
              break;
          case "d":
              this.height = 13;
              break;
          default:
              this.height = 0;
              break;
      }

      this.state = TileState.OPEN;
    }

  }

}
