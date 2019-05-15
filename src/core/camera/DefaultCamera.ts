import { Point } from 'pixi.js'
import Engine from './Engine';

export default class DefaultCamera {

    private _pos: Point
    public lastFrame: number
    public delta: number

    constructor(x: number = 0, y: number = 0) {
        this._pos = new Point(0, 0)
        this.move(x, y)

        this.lastFrame = performance.now()
        this.delta = 0
    }

    getPos() {
        return this._pos
    }

    public relativeMapPos(x: number, y: number) {
        let coordX = Math.round((x - this._pos.x - 64) / 64 + (y - this._pos.y) / 32)
        let coordY = Math.round((y - this._pos.y) / 32 - (x - this._pos.x) / 64)

        return new Point(coordX, coordY)
    }

    public tileToScreenCoords(x: number, y: number) {
        let screenX = this._pos.x + (1 + x - y) * 32
        let screenY = this._pos.y + (1 + x + y) * 16

        return new Point(screenX, screenY)
    }

    public tileToPixels(x: number, y: number) {
        let toX = (x - y) * 32
        let toY = (x + y) * 16

        return new Point(toX, toY)
    }

    public move(x: number, y: number) {
        this._pos.x += x
        this._pos.y += y

        Engine.getInstance()._scene.x = this._pos.x
        Engine.getInstance()._scene.y = this._pos.y
    }

}