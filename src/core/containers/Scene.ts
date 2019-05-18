import App from '../App'
import { Container, DisplayObject } from 'pixi.js'
import Layer from './Layer'
import Camera from '../rendering/Camera'
import Tile from '../objects/tiles/Tile'
import { sortTiles, sortGameObjects } from '../../utils/sort'
import Item from '../objects/items/Item'

export default class Scene {

    private _parent?: App
    private _container: Container
    private _layers: Array<Layer>
    private _camera: Camera

    constructor({ draggable = true }: { draggable?: boolean }) {

        this._container = new Container()
        this._layers = []
        this._camera = new Camera(this, draggable, 0, 0)

    }

    get layers(): Array<Layer> {
        return this._layers
    }

    public getParent() {
        return this._parent
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

    public addItem(item: Item) {
        item.addToScene(this)
    }

    public removeItem() {

    }

    update(delta: number) {

        for(let layer of this.layers)
            layer.update(delta)

        this._container.children.sort((a: any, b: any) => {

            // Don't sort non gameobjects
            if(!a.gameObject || !b.gameObject)
                return 0

            // Don't sort on self
            if(a == b)
                return 0

            // Sort tiles separately, always at the bottom of the stack
            if(a.gameObject instanceof Tile && b.gameObject instanceof Tile)
                return sortTiles(a.gameObject, b.gameObject)

            // a is tile but b is not, send a back
            if(a.gameObject instanceof Tile)
                return -1

            // b is tile but a is not, send b back
            if(b.gameObject instanceof Tile)
                return 1

            // Sort the rest by their coordinates
            return sortGameObjects(a.gameObject, b.gameObject)

        })

    }

}