import EventListener from './core/events/EventListener'
import * as EventRegistry from './core/events'

export const Events = EventRegistry
export { default as App } from './core/App'
export { default as preload } from './utils/preload'
export { default as Scene } from './core/containers/Scene'
export { default as Layer } from './core/containers/Layer'
export { default as TileMap } from './core/objects/tiles/TileMap'

EventListener.listen()