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

    public update(delta: number) {
        
    }

    public dispose() {
        
    }

}