import CachedItemState from './CachedItemState'

export default class CachedItemPart {

    private _states: Array<CachedItemState>
    private _offsetX: number
    private _offsetY: number
    private _offsetPixelsX: number
    private _offsetPixelsY: number

    constructor(states: Array<CachedItemState>, offsetX: number, offsetY: number, offsetPixelsX: number, offsetPixelsY: number) {

        this._states = states
        this._offsetX = offsetX
        this._offsetY = offsetY
        this._offsetPixelsX = offsetPixelsX
        this._offsetPixelsY = offsetPixelsY

    }

    public get states(): Array<CachedItemState> {
        return this._states
    }

    public get offsetX(): number {
        return this._offsetX
    }

    public get offsetY(): number {
        return this._offsetY
    }

    public get offsetPixelsX(): number {
        return this._offsetPixelsX
    }

    public get offsetPixelsY(): number {
        return this._offsetPixelsY
    }

}