import * as PIXI from 'pixi.js'
import Scene from './containers/Scene'

export default class App {

    private _renderer: PIXI.Application
    private _scenes: Array<Scene>

    constructor(width: number = window.innerWidth, height: number = window.innerHeight, backgroundColor: number = 0x000000) {
        
        this._scenes = []

        // Preserve quality of sprites when scaled
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this._renderer = new PIXI.Application({
            width,
            height,
            backgroundColor
        })
        
        let element = document.createElement('div');
        element.setAttribute("id", "libh");
        document.body.appendChild(element);

        element.appendChild(this._renderer.view)

        this._renderer.ticker.add(this.update.bind(this))

    }

    public addScene(scene: Scene) {
        scene.parent = this
        this._scenes.push(scene)
        this._renderer.stage.addChild(scene.container)
    }

    public removeScene(scene: Scene) {
        this._scenes = this._scenes.filter(x => x !== scene)
    }

    private update() {

    }

}