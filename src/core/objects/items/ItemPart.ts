import GameObject from '../GameObject'
import Item from './Item';
import CachedItemPart from '../../caching/items/CachedItemPart'
import Sprite from '../../rendering/Sprite'
import Scene from '../../containers/Scene'
import { ItemEvents, ItemClickedEventArgs } from '../../events/ItemEvents'

export default class ItemPart extends GameObject {

    private _parent: Item
    private _data: CachedItemPart
    private _states: Array<Sprite>
    private _currentState: number

    constructor(parent: Item, data: CachedItemPart, x: number = 0, y: number = 0, h: number = 0) {
        super(x, y, h)

        this._parent = parent
        this._data = data
        this._states = []
        this._currentState = 0

        for(let state of data.states) {

            if(state.animation) {

                // Animated itempart

            }
            else {

                // Regular itempart
                let sprite = new Sprite(this, state.textures[0])
                sprite.anchor.set(0.5, 1)
                sprite.interactive = true

                sprite.on('click', () => {
                    ItemEvents.dispatch(new ItemClickedEventArgs(this._parent, this))
                })
                
                this._states.push(sprite)

            }

        }

    }

    get states(): Array<Sprite> {
        return this._states
    }

    addToScene(scene: Scene) {

        let screenPos = scene.camera.tileToPixels(this.x, this.y)

        for(let state of this._states) {

            state.x = Math.round(screenPos.x + this._data.offsetPixelsX)
            state.y = Math.round(screenPos.y - this.h * 10 + this._data.offsetPixelsY)

        }

        scene.container.addChild(this._states[this._currentState])

    }

    public removeFromScene(scene: Scene) {
         scene.container.removeChild(this._states[this._currentState])
    }

    public setState(state: number) {

        if(state < 0 || state > this.states.length - 1)
            state = 0

        if(state == this._currentState)
            return;

        let currentState = this.states[this._currentState]
        let newState = this.states[state];

        if(this._parent.parent) {

            if(currentState)
                this._parent.parent.container.removeChild(currentState);

            this._parent.parent.container.addChild(newState);

        }

        this._currentState = state;

    }

    public move(x: number, y: number, h: number) {

        this.x = x + this._data.offsetX
        this.y = y + this._data.offsetY
        this.h = h
        
        if(this._parent.parent) {

            let screenPos = this._parent.parent.camera.tileToPixels(this.x, this.y)

            for(let sprite of this._states) {
                sprite.x = Math.round(screenPos.x + this._data.offsetPixelsX)
                sprite.y = Math.round(screenPos.y - h * 10 + this._data.offsetPixelsY)
            }

        }

    }

    public rotate() {
        for(let sprite of this._states) {
            if(sprite.scale.x === 1)
                sprite.scale.x = -1
            else
                sprite.scale.x = 1
        }
    }

    public getCurrentState() {
        return this._states[this._currentState]
    }

}