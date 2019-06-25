# daisy
Daisy is an isometric game engine using WebGL. No formal documentation provided at this time, but feel free to look at the example below for some insight in to how it works.

```javascript
import daisy from 'daisy'

(async () => {

    // preloads sprites
    await Daisy.preload([
        'tile.png',
        'tile_outline.png'
    ])

    // items are objects within a scene, cached to improve performance when having multiple instances of the same item in a scene.
    // items are split into categorier, each category having its own spritesheet and data (scroll all the way down to see an example of data.json)
    await Daisy.ItemCache.add('./adobe/spritesheet.png', './adobe/data.json')

    // this event is fired whenever someone clicks on an item
    Daisy.Events.ItemEvents.onItemClicked.subscribe((sender, eventArgs) => {
        console.log(`item clicked: ${eventArgs.item}. Specific part of item clicked: ${eventArgs.itemPart}`)
    })

    // create a new instance of the engine
    const app = new Daisy.App({
        background: 0x1F2024
    })

    // new scene, objects and characters will be added to it
    const room = new Daisy.Scene({
        draggable: true
    })

    // make the scene's camera draggable, letting you move everything in the scene around while dragging
    room.camera.setPosition(window.innerWidth / 2, window.innerHeight / 2)

    // add tiles to the scene
    const tiles = new Daisy.TileMap('tile.png', [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ])

    // make the tiles hoverable, the specified sprite will be displayed over the tile you hover the mouse
    tiles.makeHoverable('tile_outline.png')

    // add the tiles to our scene
    room.addLayer(tiles)

    // create a new item, the id must exist in one of the data files of the itemcache
    let fridge = new Daisy.Item('adobe_fridge', 3, 0, 0)

    // items can be rotated
    fridge.rotate()

    // add the item to the scene, making it renderable
    room.addItem(fridge)

    // texturebuilder is for more advanced stuff such as character clothing,
    // basically a way to convert multiple loaded textures into a sprite
    let twoTilesCombined = new Daisy.TextureBuilder(64, 110)
    twoTilesCombined.addTexture('tile.png', 10, 20, 0, 0, 20, 20)
    twoTilesCombined.addTexture('tile.png', 0, 30, 0, 0, 50, 20)
    let sprite = testwoTilesCombinedt.generateSprite()
    
    // render the above generated sprite
    app.renderer.stage.addChild(sprite)

    // moving a sprite on screen, relative to the scenes camera position
    sprite.x = 50
    sprite.y = 50

    // create a new character
    let character = new Daisy.Character()

    // create a new character state from a still image
    character.addState('idle_south_west', Daisy.CharacterCache.getBaseTexture('./avatar.png'), 64 * 15, 0, 64, 110)

    // create an animated state from multiple images
    character.addAnimatedState('walk_south_west', [
        { baseTexture: texture.baseTexture, fromX: 64 * 16, fromY: 0, toX: 64, toY: 110 },
        { baseTexture: texture.baseTexture, fromX: 64 * 17, fromY: 0, toX: 64, toY: 110 },
        { baseTexture: texture.baseTexture, fromX: 64 * 18, fromY: 0, toX: 64, toY: 110 },
        { baseTexture: texture.baseTexture, fromX: 64 * 19, fromY: 0, toX: 64, toY: 110 }
    ])

    // set the character's offset
    character.setOffset(0, -85)

    // set the character's current state
    character.setState('walk_south_west')

    // add character to the scene
    room.addCharacter(character)

    // finally add the scene to the engine
    app.addScene(room)

})()
```

data.json
```json
[
    {
        "uid": "adobe_fridge",
        "name": "Modern Fridge",
        "description": "Packed with cold beverages!",
        "icon": { "x": 0, "y": 0, "w": 60, "h": 116 },
        "parts": [
            {
                "offsetPosition": { "x": 0, "y": 0 },
                "offsetPixels": { "x": 33, "y": 29 },
                "states": [
                    {
                        "sprites": [
                            { "x": 0, "y": 0, "w": 60, "h": 116 }
                        ]
                    }
                ]
            }
        ]
    }
]
```
