import * as PIXI from 'pixi.js'
import Scene from './containers/Scene'
import { MouseEvents, MouseMovedEventArgs } from './events/MouseEvents';

export default class App {

    private static _renderer: PIXI.Application
    private _scenes: Array<Scene>

    //constructor(width: number = window.innerWidth, height: number = window.innerHeight, backgroundColor: number = 0x000000) {
    constructor({ width = window.innerWidth, height = window.innerHeight, background = 0x000000 }:{ width?: number, height?: number, background?: number }) {

        this._scenes = []

        // Preserve quality of sprites when scaled
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        App._renderer = new PIXI.Application({
            width,
            height,
            backgroundColor: background
        })
        
        let element = document.createElement('div')
        element.setAttribute("id", "daisy")
        document.body.appendChild(element)

        element.appendChild(App._renderer.view)

        App._renderer.ticker.add(this.update.bind(this))

    }

    static get renderer(): PIXI.Application {
        return App._renderer
    }

    get renderer(): PIXI.Application {
        return App._renderer
    }

    get scenes(): Array<Scene> {
        return this._scenes
    }

    public addScene(scene: Scene) {
        scene.parent = this
        this._scenes.push(scene)
        App._renderer.stage.addChild(scene.container)
    }

    public removeScene(scene: Scene) {
        this._scenes = this._scenes.filter(x => {
            App._renderer.stage.removeChild(x.container)
            return x !== scene
        })
    }

    public makeSceneActive(scene: Scene) {
        this._scenes.map(x => {
            if(x !== scene)
                App._renderer.stage.removeChild(x.container)
        })
    }

    private update(delta: number) {
        for(let scene of this.scenes)
            scene.update(delta)
    }

}