import Scene from './Scene'
import { Container } from 'pixi.js'

export default class Layer {

    _parent?: Scene
    _container: Container

    constructor() {
        
        this._container = new Container()

    }

    setParent(parent: Scene) {
        this._parent = parent
    }

    getContainer(): Container {
        return this._container
    }

    update(delta: number) {
        
        

    }

}