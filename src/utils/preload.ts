import { Loader } from 'pixi.js'

export default function(assets: Array<string>) {

    return new Promise((resolve, reject) => {

        for(let asset of assets) {
            Loader.shared.add(asset)
        }

        Loader.shared.load(() => {
            return resolve()
        })

    })

}