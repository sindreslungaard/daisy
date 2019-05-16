import Scene from '../containers/Scene'
import Point from '../../utils/Point'
import { MouseEvents } from '../events';

export default class Camera {

    private _scene: Scene
    private _position: Point

    private _isDragging: boolean

    constructor(scene: Scene, x: number = 0, y: number = 0) {
        
        this._scene = scene
        this._position = new Point(0, 0)

        this._isDragging = false

        this.move(x, y)

        MouseEvents.onMouseDown.subscribe((sender, eventArgs) => {
            this._isDragging = true
        })

        MouseEvents.onMouseUp.subscribe((sender, eventArgs) => {
            this._isDragging = false
        })

        MouseEvents.onMouseMoved.subscribe((sender, eventArgs) => {
            if(this._isDragging)
                this.move(eventArgs.x, eventArgs.y)
        })

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