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

        this._renderer.stage.x = window.innerWidth / 2
        this._renderer.stage.y = window.innerHeight / 2
        
        let element = document.createElement('div');
        element.setAttribute("id", "libh");
        document.body.appendChild(element);

        element.appendChild(this._renderer.view)

        this._renderer.ticker.add(this.update.bind(this))

    }

    get renderer(): PIXI.Application {
        return this._renderer
    }

    get scenes(): Array<Scene> {
        return this._scenes
    }

    public addScene(scene: Scene) {
        scene.parent = this
        this._scenes.push(scene)
        this._renderer.stage.addChild(scene.container)
    }

    public removeScene(scene: Scene) {
        this._scenes = this._scenes.filter(x => {
            this._renderer.stage.removeChild(x.container)
            return x !== scene
        })
    }

    public makeSceneActive(scene: Scene) {
        this._scenes.map(x => {
            if(x !== scene)
                this._renderer.stage.removeChild(x.container)
        })
    }

    private update(delta: number) {
        for(let scene of this.scenes)
            scene.update(delta)
    }

}