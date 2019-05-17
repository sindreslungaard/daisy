import { Texture, BaseTexture, Rectangle } from 'pixi.js';

class ItemCachePart {
    constructor(public states: Array<ItemCacheState>, public offsetX: number, public offsetY: number, public offsetPixelsX: number, public offsetPixelsY: number) {}
}

class ItemCacheState {
    constructor(public textures: Array<Texture>, public animation: boolean, public animationFrameDelay: number) {}
}

class ItemCacheStruct {
    constructor(public uid: string, public name: string, public description: string, public parts: Array<ItemCachePart>, public icon: Texture) {}
}

export default class ItemCache {

    private static items: { [key: string]: ItemCacheStruct } = {}

    public static add(spritesheetPath: string, dataPath: string) {

        return new Promise(async (resolve, reject) => {

            try {

                let texture = new BaseTexture(spritesheetPath)

                let response = await fetch(dataPath)
                let data = await response.json()

                for(let itemData of data) {

                    let icon = new Texture(texture, new Rectangle(itemData.icon.x, itemData.icon.y, itemData.icon.w, itemData.icon.h))
    
                    let parts: Array<ItemCachePart> = []
    
                    for(let part of itemData.parts) {
    
                        let states: Array<ItemCacheState> = []
    
                        for(let state of part.states) {
    
                            let sprites: Array<Texture> = []
                            
                            for(let sprite of state.sprites) {
                                sprites.push(new Texture(texture, new Rectangle(sprite.x, sprite.y, sprite.w, sprite.h)))
                            }
        
                            states.push(new ItemCacheState(sprites, state.animation || false, state.animationFrameDelay || 0))
        
                        }
    
                        parts.push(new ItemCachePart(states, part.offsetPosition.x, part.offsetPosition.y, part.offsetPixels.x, part.offsetPixels.y))
    
                    }
    
                    if(this.items[itemData.uid])
                        throw new Error('Duplicate uid for item ' + itemData.uid)
    
                    this.items[itemData.uid] = new ItemCacheStruct(itemData.uid, itemData.name, itemData.description, parts, icon)
    
                }

                return resolve()
                
            }
            catch(e) {
                return reject(e)
            }

        })

    }

}