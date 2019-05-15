import App from '../App'
import { Container } from 'pixi.js'
import Layer from './Layer'

export default class Scene {

    private _parent?: App
    private _container: Container
    private _layers: Array<Layer>

    constructor() {

        this._container = new Container()
        this._layers = []

    }

    set parent(parent: App) {
        this._parent = parent
    }

    get container(): Container {
        return this._container
    }

    makeActive() {

        if(!this._parent)
            throw new Error("Scene must be added to the app before made active")

        this._parent.makeSceneActive(this)

    }

    public addLayer(layer: Layer) {
        layer.parent = this
        this._layers.push(layer)
        this._container.addChild(layer.container)
    }

    public removeLayer(layer: Layer) {
        this._layers = this._layers.filter(x => {
            this.container.removeChild(x.container)
            return x !== layer
        })
    }

}