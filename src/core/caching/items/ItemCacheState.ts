import { Texture } from 'pixi.js'

export default class ItemStatesCache {

    constructor(public textures: Array<Texture>, public animation: boolean, public animationFrameDelay: number) {}

}