import Scene from '../core/containers/Scene'

export function screenToTiles(screenX: number, screenY: number, scene: Scene) {

    return scene.camera.relativeMapPos(screenX, screenY)

}