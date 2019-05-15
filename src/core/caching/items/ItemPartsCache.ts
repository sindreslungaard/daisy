import ItemCacheState from './ItemCacheState'

export default class ItemPartsCache {

    constructor(public states: Array<ItemCacheState>, public offsetX: number, public offsetY: number, public offsetPixelsX: number, public offsetPixelsY: number) {}

}