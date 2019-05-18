import { Texture, BaseTexture, Rectangle } from 'pixi.js'
import CachedItemStruct from './CachedItemStruct'
import CachedItemPart from './CachedItemPart'
import CachedItemState from './CachedItemState'

export default class ItemCache {

    private static _items: { [key: string]: CachedItemStruct } = {}

    public static add(spritesheetPath: string, dataPath: string) {

        return new Promise(async (resolve, reject) => {

            try {

                let texture = new BaseTexture(spritesheetPath)

                let response = await fetch(dataPath)
                let data = await response.json()

                for(let itemData of data) {

                    let icon = new Texture(texture, new Rectangle(itemData.icon.x, itemData.icon.y, itemData.icon.w, itemData.icon.h))
    
                    let parts: Array<CachedItemPart> = []
    
                    for(let part of itemData.parts) {
    
                        let states: Array<CachedItemState> = []
    
                        for(let state of part.states) {
    
                            let sprites: Array<Texture> = []
                            
                            for(let sprite of state.sprites) {
                                sprites.push(new Texture(texture, new Rectangle(sprite.x, sprite.y, sprite.w, sprite.h)))
                            }
        
                            states.push(new CachedItemState(sprites, state.animation || false, state.animationFrameDelay || 0))
        
                        }
    
                        parts.push(new CachedItemPart(states, part.offsetPosition.x, part.offsetPosition.y, part.offsetPixels.x, part.offsetPixels.y))
    
                    }
    
                    if(this._items[itemData.uid])
                        throw new Error('Duplicate uid for item ' + itemData.uid)
    
                    this._items[itemData.uid] = new CachedItemStruct(itemData.uid, itemData.name, itemData.description, parts, icon)
    
                }

                return resolve()
                
            }
            catch(e) {
                return reject(e)
            }

        })

    }

    public static get items(): { [key: string]: CachedItemStruct } {
        return this._items
    }

}