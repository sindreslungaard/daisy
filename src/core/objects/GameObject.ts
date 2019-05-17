import IDisposable from '../../utils/IDisposable'

export default class GameObject implements IDisposable {

    private static _incrementer = 0

    private _id: number
    private _x: number
    private _y: number
    private _h: number

    constructor(x: number = 0, y: number = 0, h: number = 0) {

        this._id = GameObject._incrementer++
        this._x = x
        this._y = y
        this._h = h

    }

    public get id(): number {
        return this._id
    }

    public get x(): number {
        return this._x
    }

    public set x(x: number) {
        this._x = x
    }

    public get y(): number {
        return this._y
    }

    public set y(y: number) {
        this._y = y
    }

    public get h(): number {
        return this._h
    }

    public set h(h: number) {
        this._h = h
    }

    public setPosition(x: number, y: number) {
        this._x = x
        this._y = y
    }

    public update(delta: number) {
        
    }

    public dispose() {
        
    }

}