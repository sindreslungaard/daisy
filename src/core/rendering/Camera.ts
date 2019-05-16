import Scene from '../containers/Scene'
import Point from '../../utils/Point'

export default class Camera {

    private _scene: Scene
    private _position: Point
    private _lastFrame: number
    private _delta: number

    constructor(scene: Scene, x: number = 0, y: number = 0) {
        this._scene = scene
        this._position = new Point(0, 0)
        this.move(x, y)

        this._lastFrame = performance.now()
        this._delta = 0
    }

    public get position() {
        return this._position
    }

    public relativeMapPos(x: number, y: number) {
        let coordX = Math.round((x - this._position.x - 64) / 64 + (y - this._position.y) / 32)
        let coordY = Math.round((y - this._position.y) / 32 - (x - this._position.x) / 64)

        return new Point(coordX, coordY)
    }

    public tileToScreenCoords(x: number, y: number) {
        let screenX = this._position.x + (1 + x - y) * 32
        let screenY = this._position.y + (1 + x + y) * 16

        return new Point(screenX, screenY)
    }

    public tileToPixels(x: number, y: number) {
        let toX = (x - y) * 32
        let toY = (x + y) * 16

        return new Point(toX, toY)
    }

    public move(x: number, y: number) {
        this._position.x += x
        this._position.y += y

        this._scene.container.x = this._position.x
        this._scene.container.y = this._position.y
    }

}