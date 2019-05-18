import { BaseTexture } from 'pixi.js'

export default class CharacterCache {

    private static _baseTextures: { [key: string]: BaseTexture } = {}

    public static getBaseTexture(texturePath: string) {

        if(this._baseTextures[texturePath])
            return this._baseTextures[texturePath]

        this._baseTextures[texturePath] = new BaseTexture(texturePath)

        return this._baseTextures[texturePath]

    }

}