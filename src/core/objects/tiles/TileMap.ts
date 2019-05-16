import GameObject from '../GameObject'
import Scene from '../../containers/Scene'
import Tile from './Tile'
import { Loader, Sprite as PixiSprite } from 'pixi.js'
import { Layer } from '../../../daisy';

export default class TileMap extends Layer {

    private _textureId: string
    private _tiles: Array<Array<Tile>>
    private _tileOutlineSprite?: PixiSprite

    constructor(texture: string, map: Array<Array<number>> = []) {

        super()

        this._textureId = texture
        this._tiles = []

        this.deserialze(map)

    }

    private deserialze(map: Array<Array<number>>) {

        for(let x = 0; x < map.length; x++) {

            this._tiles.push([])

            for(let y = 0; y < map[x].length; y++) {

                let tile = new Tile(Loader.shared.resources[this._textureId].texture, x, y)
                this._tiles[x].push(tile)

            }

        }

    }

    getParent() {
        return this._parent
    }

    setParent(scene: Scene) {
        this._parent = scene

        for(let row of this._tiles) {
            for(let tile of row) {
                this._container.addChild(tile.sprite)
            }
        }
    }

    public makeHoverable(outlineSpriteId: string) {

        this._tileOutlineSprite = new PixiSprite(Loader.shared.resources[outlineSpriteId].texture)
        
    }

    update(delta: number) {

        
        
    }

}