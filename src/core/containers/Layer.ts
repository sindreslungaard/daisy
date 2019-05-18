import Scene from './Scene'
import { Container } from 'pixi.js'
import GameObject from '../objects/GameObject';

export default class Layer {

    _parent?: Scene
    _container: Container
    _gameObjects: Array<GameObject>

    constructor() {
        
        this._container = new Container()
        this._gameObjects = []

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