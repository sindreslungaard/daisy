import Point from "../../utils/Point";
import Camera from "../rendering/Camera"

export default class MotionComponent {

    private _startedAt: number
    private _spriteX: number
    private _spriteY: number
    private _oldX: number
    private _oldY: number
    private _newX: number
    private _newY: number   
    private _to: Point
    private _from: Point

    constructor(camera: Camera, spriteX: number, spriteY: number, oldX: number, oldY: number, oldH: number, newX: number, newY: number, newH: number) {

        this._startedAt = Date.now()
        this._to = camera.tileToPixels(newX, newY)
        this._from = camera.tileToPixels(oldX, oldY)
        this._spriteX = spriteX
        this._spriteY = spriteY
        this._oldX = oldX
        this._oldY = oldY
        this._newX = newX
        this._newY = newY
    }

    get startedAt(): number {
        return this._startedAt
    }

    get spriteX(): number {
        return this._spriteX
    }

    get spriteY(): number {
        return this._spriteY
    }

    get oldX(): number {
        return this._oldX
    }

    get oldY(): number {
        return this._oldY
    }

    get newX(): number {
        return this._newX
    }

    get newY(): number {
        return this._newY
    }

    update(delta: number) {

        delta = delta / 30

        if(this._from.x > this._to.x)
            if(this._spriteX > this._to.x)
                this._spriteX -= (this._from.x - this._to.x) * delta

        if(this._from.x < this._to.x)
            if(this._spriteX < this._to.x)
                this._spriteX += (this._to.x - this._from.x) * delta
        
        if(this._from.y > this._to.y)
            if(this._spriteY > this._to.y)
                this._spriteY -= (this._from.y - this._to.y) * delta

        if(this._from.y < this._to.y)
            if(this._spriteY < this._to.y)
                this._spriteY += (this._to.y - this._from.y) * delta

    }

}