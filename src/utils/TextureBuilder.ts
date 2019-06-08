import { Sprite, Container, SCALE_MODES, Renderer, Rectangle, BaseTexture, Texture, Loader } from 'pixi.js'
import App from '../core/App'

export default class TextureBuilder {

    private _width: number
    private _height: number
    private _container: Container

    constructor(width: number, height: number) {

        if(!App.renderer)
            throw new Error('Daisy.App must be initialized in order for TextureBuilder to use its renderer')

        this._width = width
        this._height = height
        this._container = new Container()

    }

    public addSprite(sprite: Sprite, x: number = 0, y: number = 0) {
        this._container.addChild(sprite)
        sprite.x = x
        sprite.y = y
    }

    public addTexture(textureId: string, fromX: number, fromY: number, toX: number, toY: number) {
        this.addSprite(new Sprite(new Texture(Loader.shared.resources[textureId].texture.baseTexture, new Rectangle(fromX, fromY, toX, toY))))
    }

    public generateTexture() {
        return App.renderer.renderer.generateTexture(this._container, SCALE_MODES.NEAREST, 1)  
    }

    public generateSprite() {
        return new Sprite(this.generateTexture())
    }

    public dispose() {
        this._container.destroy()
    }

}