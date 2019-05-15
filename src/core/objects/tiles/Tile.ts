import { Texture } from 'pixi.js'
import GameObject from '../GameObject'
import Sprite from '../../renderables/Sprite';

export default class Tile extends GameObject {

    private _sprite: Sprite

    constructor(texture: Texture, x: number = 0, y: number = 0, h: number = 0) {

        super(x, y, h)
        
        this._sprite = new Sprite(this, texture)

        this._sprite.x = (x - y) * 32
        this._sprite.y = (x + y) * 16

    }

    public get sprite(): Sprite {
        return this._sprite
    }

}