import { Sprite as SpriteRender } from 'pixi.js'
import GameObject from '../objects/GameObject'

export default class Sprite extends SpriteRender {

    private _h: number
    private _gameObject: GameObject

    constructor(_gameObject: GameObject, ref: any) {
        super(ref)
        this._h = 0
        this._gameObject = _gameObject
    }

    public get h(): number {
        return this._h
    }

    public get gameObject(): GameObject {
        return this._gameObject
    }

}