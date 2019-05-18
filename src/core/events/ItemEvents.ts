import { EventDispatcher, IEvent } from 'strongly-typed-events'
import Item from '../objects/items/Item'
import ItemPart from '../objects/items/ItemPart'

export class ItemEvents {

    private static _itemClickedEvent = new EventDispatcher<ItemEvents, ItemClickedEventArgs>()

    public static get onItemClicked(): IEvent<ItemEvents, ItemClickedEventArgs> {
        return this._itemClickedEvent.asEvent()
    }

    public static dispatch<T>(eventArgs: T) {

        if(eventArgs instanceof ItemClickedEventArgs)
            this._itemClickedEvent.dispatch(this, eventArgs)

    }

}

export class ItemClickedEventArgs {

    constructor(private _item: Item, private _itemPart: ItemPart) {}

    public get item(): Item {
        return this._item
    }

    public get itemPart(): ItemPart {
        return this._itemPart
    }

}