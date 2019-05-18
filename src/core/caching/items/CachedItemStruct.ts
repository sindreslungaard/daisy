import { Texture } from 'pixi.js'
import CachedItemPart from './CachedItemPart'

export default class CachedItemStruct {

    private _uid: string
    private _name: string
    private _description: string
    private _parts: Array<CachedItemPart>
    private _icon: Texture

    constructor(uid: string, name: string, description: string, parts: Array<CachedItemPart>, icon: Texture) {

        this._uid = uid
        this._name = name
        this._description = description
        this._parts = parts
        this._icon = icon

    }

    public get uid(): string {
        return this._uid
    }

    public get name(): string {
        return this._name
    }

    public get description(): string {
        return this._description
    }

    public get parts(): Array<CachedItemPart> {
        return this._parts
    }

    public get icon(): Texture {
        return this._icon
    }

}