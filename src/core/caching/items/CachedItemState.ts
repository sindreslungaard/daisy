import { Texture } from 'pixi.js'

export default class CachedItemState {

    private _textures: Array<Texture>
    private _animation: boolean
    private _animationFrameDelay: number

    constructor(textures: Array<Texture>, animation: boolean, animationFrameDelay: number) {

        this._textures = textures
        this._animation = animation
        this._animationFrameDelay = animationFrameDelay

    }

    public get textures(): Array<Texture> {
        return this._textures
    }

    public get animation(): boolean {
        return this._animation
    }

    public get animationFrameDelay(): number {
        return this._animationFrameDelay
    }

}