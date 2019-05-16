import App from '../App'
import { Container } from 'pixi.js'
import Layer from './Layer'
import Camera from '../rendering/Camera'

export default class Scene {

    private _parent?: App
    private _container: Container
    private _layers: Array<Layer>
    private _camera: Camera

    constructor() {

        this._container = new Container()
        this._layers = []
        this._camera = new Camera(this, 0, 0)

    }

    get layers(): Array<Layer> {
        return this._layers
    }

    set parent(parent: App) {
        this._parent = parent
    }

    get container(): Container {
        return this._container
    }

    get camera(): Camera {
        return this._camera
    }

    makeActive() {

        if(!this._parent)
            throw new Error("Scene must be added to the app before made active")

        this._parent.makeSceneActive(this)

    }

    public addLayer(layer: Layer) {
        layer.setParent(this)
        this._layers.push(layer)
        this._container.addChild(layer.getContainer())
    }

    public removeLayer(layer: Layer) {
        this._layers = this._layers.filter(x => {
            this.container.removeChild(x.getContainer())
            return x !== layer
        })
    }

    update(delta: number) {
        for(let layer of this.layers)
            layer.update(delta)
    }

}