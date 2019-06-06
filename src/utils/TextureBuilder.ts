import { Sprite, Container, SCALE_MODES, Renderer, Rectangle, BaseTexture, Texture } from 'pixi.js'

let renderer = new Renderer()

export default class TextureBuilder {

    private _width: number
    private _height: number
    private _container: Container

    constructor(width: number, height: number) {

        this._width = width
        this._height = height
        this._container = new Container()

    }

    public addSprite(sprite: Sprite, x: number = 0, y: number = 0) {
        this._container.addChild(sprite)
        sprite.x = x
        sprite.y = y
    }

    public addTexture(baseTexture: BaseTexture, fromX: number, fromY: number, toX: number, toY: number) {
        this.addSprite(new Sprite(new Texture(baseTexture, new Rectangle(fromX, fromY, toX, toY))))
    }

    public generateTexture() {
        return renderer.generateTexture(this._container, SCALE_MODES.NEAREST, 1)  
    }

    public generateSprite() {
        return new Sprite(this.generateTexture())
    }

    public dispose() {
        this._container.destroy()
    }

}