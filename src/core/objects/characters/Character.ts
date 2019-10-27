import GameObject from "../GameObject"
import Scene from '../../containers/Scene'
import { Sprite as SpriteRender, Texture, BaseTexture, Rectangle, AnimatedSprite as AnimatedSpriteRender, DisplayObject } from 'pixi.js'
import Sprite from '../../rendering/Sprite'
import AnimatedSprite from '../../rendering/AnimatedSprite'
import CharacterCache from '../../caching/characters/CharacterCache'
import IDisposable from "../../../utils/IDisposable"
import MotionComponent from "../../components/MotionComponent"

export default class Character extends GameObject {

    private _parent?: Scene
    private _states: Map<string, SpriteRender>
    private _currentState?: SpriteRender
    private _motionComponent?: MotionComponent | null
    private _offsetX: number
    private _offsetY: number

    constructor(x: number = 0, y: number = 0, h: number = 0) {

        super(x, y, h)

        this._offsetX = 0
        this._offsetY = 0

        this._states = new Map<string, SpriteRender>()

    }

    set parent(scene: Scene) {
        this._parent = scene
    }

    public setOffset(x: number, y: number) {
        this._offsetX = x
        this._offsetY = y
    }

    addToScene(scene: Scene) {

        this._parent = scene

        if(this._currentState) {

            let screenPos = this._parent.camera.tileToPixels(this.x, this.y)

            this._currentState.x = screenPos.x + this._offsetX
            this._currentState.y = screenPos.y + this._offsetY

            scene.container.addChild(this._currentState)

        }

    }

    public addState(uid: string, baseTexture: BaseTexture, fromX: number, fromY: number, toX: number, toY: number) {

        let state = new Sprite(this, new Texture(baseTexture, new Rectangle(fromX, fromY, toX, toY)))
        this._states.set(uid, state)

        if(!this._currentState)
            this._currentState = state

    }

    public addAnimatedState(uid: string, textureData: Array<{baseTexture: BaseTexture, fromX: number, fromY: number, toX: number, toY: number}>) {
        
        let textures = []

        for(let data of textureData) {

            textures.push(new Texture(data.baseTexture, new Rectangle(data.fromX, data.fromY, data.toX, data.toY)))

        }

        let state = new AnimatedSprite(this, textures)
        state.animationSpeed = 0.1
        state.play()

        this._states.set(uid, state)

        if(!this._currentState)
            this._currentState = state

    }

    public setState(state: string) {

        if(!this._states.has(state))
            throw new Error(`State ${state} does not exist on character`)

        let newState = this._states.get(state)

        if(!newState || newState === this._currentState)
            return

        if(this._currentState) {
            newState.x = this._currentState.x
            newState.y = this._currentState.y
        }

        if(this._currentState && this._parent)
            this._parent.container.removeChild(this._currentState)

        if(newState instanceof AnimatedSpriteRender)
            newState.play()

        if(this._parent && newState)
            this._parent.container.addChild(newState)

        this._currentState = newState

    }

    public slide(fromX: number, fromY: number, fromH: number, toX: number, toY: number, toH: number) {

        this.x = toX
        this.y = toY
        this.h = toH

        // don't add motion before the stage is ready but store the new position above
        if(!this._parent) {
            return
        }

        let screenPos = this._parent.camera.tileToPixels(fromX, fromY)

        this._motionComponent = new MotionComponent(this._parent.camera, screenPos.x, screenPos.y, fromX, fromY, fromH, toX, toY, toH)

    }

    public move(toX: number, toY: number, toH?: number) {

        this.x = toX
        this.y = toY
        if(toH)
            this.h = toH

        if(this._parent && this._currentState) {

            let screenPos = this._parent.camera.tileToPixels(toX, toY)

            this._currentState.x = screenPos.x + this._offsetX
            this._currentState.y = screenPos.y + this._offsetY
            
        }

    }

    update(delta: number) {

        this.updateMotions(delta)

    }

    private updateMotions(delta: number) {

        if(!this._motionComponent || !this._currentState || !this._parent)
            return
        
        this._motionComponent.update(delta)

        let now = Date.now()

        if(now >= this._motionComponent.startedAt + 250) {
            this.x = this._motionComponent.newX
            this.y = this._motionComponent.newY
        }

        if(now >= this._motionComponent.startedAt + 500) {

            let screenPos = this._parent.camera.tileToPixels(this.x, this.y)
            this._currentState.x = screenPos.x + this._offsetX
            this._currentState.y = screenPos.y - this.h * 10 + this._offsetY

            this._motionComponent = null
            return
        }

        this._currentState.x = Math.round(this._motionComponent.spriteX + this._offsetX)
        this._currentState.y = Math.round(this._motionComponent.spriteY + this._offsetY)

    }

}