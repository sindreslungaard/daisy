import Tile from '../core/objects/tiles/Tile'
import GameObject from '../core/objects/GameObject';

export function sortTiles(a: Tile, b: Tile) {
    if(a.x == b.x && a.y == b.y)
        if(a.h !== b.h)
            return a.h - b.h
        else
            return a.id - b.id

    if(a.x == b.x)
        return a.y - b.y

    return a.x - b.x
}

export function sortGameObjects(a: GameObject, b: GameObject) {

    if(a.x === b.x) {
        return a.y - b.y   
    }

    return a.x - b.x

    // might use later
    if(a.x == b.x && a.y == b.y)
        if(a.h !== b.h)
            return a.h - b.h
        else
            return a.id - b.id

    if(a.x == b.x)
        return a.y - b.y

    return a.x - b.x

}