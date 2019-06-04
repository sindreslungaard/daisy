import { EventDispatcher, IEvent } from 'strongly-typed-events'
import Point from '../../utils/Point'

let lastMouseDownPos = new Point(0, 0)

export class MouseEvents {

    private static _mouseDownEvent = new EventDispatcher<MouseEvents, MouseDownEventArgs>()
    private static _mouseUpEvent = new EventDispatcher<MouseEvents, MouseUpEventArgs>()
    private static _mouseMovedEvent = new EventDispatcher<MouseEvents, MouseMovedEventArgs>()
    private static _mouseClickedEvent = new EventDispatcher<MouseEvents, MouseClickedEventArgs>()

    public static get onMouseDown(): IEvent<MouseEvents, MouseDownEventArgs> {
        return this._mouseDownEvent.asEvent()
    }

    public static get onMouseUp(): IEvent<MouseEvents, MouseUpEventArgs> {
        return this._mouseUpEvent.asEvent()
    }

    public static get onMouseMoved(): IEvent<MouseEvents, MouseMovedEventArgs> {
        return this._mouseMovedEvent.asEvent()
    }

    public static get onMouseClicked(): IEvent<MouseEvents, MouseClickedEventArgs> {
        return this._mouseClickedEvent.asEvent()
    }

    public static dispatch<T>(eventArgs: T) {

        if(eventArgs instanceof MouseDownEventArgs) {
            lastMouseDownPos.x = eventArgs.x
            lastMouseDownPos.y = eventArgs.y
            this._mouseDownEvent.dispatch(this, eventArgs)
        }        

        else if(eventArgs instanceof MouseUpEventArgs) {
            this._mouseUpEvent.dispatch(this, eventArgs)
            if(validClick(eventArgs.x, eventArgs.y))
                this.dispatch(new MouseClickedEventArgs(eventArgs.x, eventArgs.y))
        }
            
        else if(eventArgs instanceof MouseMovedEventArgs)
            this._mouseMovedEvent.dispatch(this, eventArgs)
        
        else if(eventArgs instanceof MouseClickedEventArgs)
            this._mouseClickedEvent.dispatch(this, eventArgs)

    }

}

export class MouseMovedEventArgs {

    constructor(private _x: number, private _y: number) {}

    public get x(): number {
        return this._x
    }

    public get y(): number {
        return this._y
    }

}

export class MouseDownEventArgs {

    constructor(private _x: number, private _y: number) {}

    public get x(): number {
        return this._x
    }

    public get y(): number {
        return this._y
    }

}

export class MouseUpEventArgs {

    constructor(private _x: number, private _y: number) {}

    public get x(): number {
        return this._x
    }

    public get y(): number {
        return this._y
    }

}

export class MouseClickedEventArgs {

    constructor(private _x: number, private _y: number) {}

    public get x(): number {
        return this._x
    }

    public get y(): number {
        return this._y
    }

}

function validClick(x: number, y: number): boolean {

    if(x > lastMouseDownPos.x + 5 || x < lastMouseDownPos.x - 5)
        return false

    if(y > lastMouseDownPos.y + 5 || y < lastMouseDownPos.y - 5)
        return false

    return true

}