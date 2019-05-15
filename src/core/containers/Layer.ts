import Scene from './Scene'
import { Container } from 'pixi.js'

export default class Layer {

    private _parent?: Scene
    private _container: Container

    constructor() {
        
        this._container = new Container()

    }

    set parent(parent: Scene) {
        this._parent = parent
    }

    get container(): Container {
        return this._container
    }

}