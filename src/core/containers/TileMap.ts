import { MouseEvents } from './../events/MouseEvents';
import GameObject from '../objects/GameObject'
import Scene from './Scene'
import Tile from '../objects/tiles/Tile'
import { Loader } from 'pixi.js'
import { Layer } from '../../daisy';
import Point from '../../utils/Point';
import TileOutline from '../objects/tiles/TileOutline'

export default class TileMap extends Layer {

    private _textureId: string
    private _tiles: Array<Array<Tile>>
    private _tileOutline?: TileOutline
    private _currentMousePos: Point

    constructor(texture: string, map: Array<Array<number>> = []) {

        super()

        this._textureId = texture
        this._tiles = []
        this._currentMousePos = new Point(0, 0)

        MouseEvents.onMouseMoved.subscribe((sender, eventArgs) => {
            this._currentMousePos.set(eventArgs.x, eventArgs.y)
        })

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
                this._parent.container.addChild(tile.sprite)
            }
        }

        if(this._tileOutline)
            this._parent.container.addChild(this._tileOutline.sprite)
    }

    public makeHoverable(outlineSpriteId: string) {

        this._tileOutline = new TileOutline(Loader.shared.resources[outlineSpriteId].texture)  
        
    }

    public validTile(x: number, y: number) {
        if(x < 0 || y < 0)
            return false

        if(this._tiles && this._tiles.length > x && this._tiles[x].length > y)
            return true
        return false
    }

    update(delta: number) {
        
        if(this._tileOutline)
            this.renderTileOutline()
        
    }

    private renderTileOutline() {

        if(!this._tileOutline)
            return

        if(!this._parent || !this._parent.getParent())
            return

        let tile = this._parent.camera.relativeMapPos(this._currentMousePos.x, this._currentMousePos.y)

        let sprite = this._tileOutline.sprite

        if(this.validTile(tile.x, tile.y)) {

            this._tileOutline.setPosition(tile.x, tile.y)

            let screenCoords = this._parent.camera.tileToPixels(tile.x, tile.y)

            sprite.x = screenCoords.x
            sprite.y = screenCoords.y - 2

            if(!sprite.visible)
                sprite.visible = true

        }
        else {
            if(sprite.visible)
                sprite.visible = false
        }

    }

}