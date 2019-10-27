import GameObject from '../GameObject'
import ItemPart from './ItemPart'
import ItemCache from '../../caching/items/ItemCache'
import Sprite from '../../rendering/Sprite'
import Scene from '../../containers/Scene'

export default class Item extends GameObject {

    private _parent?: Scene
    private _uid: string
    private _name: string
    private _description: string
    private _states: Array<Sprite>
    private _currentState: number = 0
    private _itemParts: Array<ItemPart>

    constructor(uid: string, x: number = 20, y: number = 20, h: number = 20) {
        super(x, y, h)

        let itemData = ItemCache.items[uid]

        this._uid = itemData.uid
        this._name = itemData.name
        this._description = itemData.description
        this._states = []

        this._itemParts = []

        for(let part of itemData.parts) {

            this._itemParts.push(new ItemPart(this, part, x + part.offsetX, y + part.offsetY, h))

        }

    }

    get parent(): Scene | undefined {
        return this._parent
    }

    set parent(scene: Scene | undefined) {
        this._parent = scene
    }

    get uid(): string {
        return this._uid
    }

    get name(): string {
        return this._name
    }

    get itemParts(): Array<ItemPart> {
        return this._itemParts
    }

    public get state(): Sprite {
        return this._states[this._currentState]
    }

    addToScene(scene: Scene) {
        this._parent = scene
        for(let part of this._itemParts) {
            part.addToScene(scene)
        }
    }

    removeFromScene(scene: Scene) {
        for(let part of this._itemParts) {
            part.removeFromScene(scene)
        }
    }

    public setState(state: number) {

        if(state < 0 || state > this._states.length - 1)
            state = 0

        if(state == this._currentState)
            return;

        let currentState = this._states[this._currentState]
        let newState = this._states[state];

        if(this._parent) {
            
            if(currentState)
                this._parent.container.removeChild(currentState);

            this._parent.container.addChild(newState);

        }

        this._currentState = state;

    }

    public move(x: number, y: number, h: number) {
        
        this.x = x
        this.y = y
        this.h = h
        for(let part of this._itemParts) {
            part.move(x, y, h)
        }

    }

    public rotate() {
        for(let part of this._itemParts) {
            part.rotate()
        }
    }

    public toggleVisibility(state: boolean) {
        this._states[this._currentState].visible = state
    }

    public setTransparity(value: number) {
        for(let part of this._itemParts) {
            for(let sprite of part.states) {
                sprite.alpha = value
            }
        }
    }

}