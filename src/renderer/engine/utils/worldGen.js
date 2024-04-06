/* eslint-disable no-plusplus */
import wfc from 'wavefunctioncollapse'

const WORLD_SIZE_Y = 20
const WORLD_SIZE_X = 20

export const generateWorld = () => {
    const worldMatrix = []

    for (let y = 0; y < WORLD_SIZE_Y; y++) {
        const xStrip = []
        for (let x = 0; x < WORLD_SIZE_X; x++) {
            xStrip.push(0)
        }
        worldMatrix.push(xStrip)
    }

    return worldMatrix
}

function normalizeSeed(seed) {
    if (typeof seed === 'number') {
        seed = Math.abs(seed)
    } else if (typeof seed === 'string') {
        const string = seed
        seed = 0

        for (let i = 0; i < string.length; i++) {
            seed = (seed + (i + 1) * (string.charCodeAt(i) % 96)) % 2147483647
        }
    }

    if (seed === 0) {
        seed = 311
    }

    return seed
}

function lcgRandom(seed) {
    let state = normalizeSeed(seed)

    return function () {
        const result = (state * 48271) % 2147483647
        state = result
        return result / 2147483647
    }
}

// wave function collapse
export const genWFC = () => {
    const pattern = [
        137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0,
        20, 0, 0, 0, 20, 8, 6, 0, 0, 0, 141, 137, 29, 13, 0, 0, 0, 1, 115, 82,
        71, 66, 0, 174, 206, 28, 233, 0, 0, 0, 103, 73, 68, 65, 84, 56, 79, 237,
        146, 49, 14, 0, 32, 8, 3, 233, 255, 31, 141, 233, 160, 49, 70, 65, 196,
        77, 89, 28, 132, 3, 74, 33, 34, 42, 23, 3, 4, 170, 218, 76, 0, 76, 50,
        219, 50, 135, 113, 5, 88, 27, 242, 77, 3, 251, 233, 211, 192, 81, 138,
        20, 112, 166, 235, 49, 112, 117, 164, 35, 160, 117, 241, 48, 208, 179,
        79, 3, 238, 250, 122, 199, 139, 105, 219, 244, 195, 132, 87, 246, 54,
        249, 192, 181, 66, 158, 93, 106, 229, 203, 26, 122, 254, 138, 252, 23,
        16, 85, 146, 1, 166, 47, 44, 243, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66,
        96, 130,
    ]

    const width = 20
    const height = 20
    const destWidth = 48
    const destHeight = 48

    const model = new wfc.OverlappingModel(
        pattern,
        width,
        height,
        3,
        destWidth,
        destHeight,
        true,
        true,
        2,
        102
    )
    const finished = model.generate(lcgRandom('test'))
    if (finished) {
        const result = model.graphics()
        console.log('Success', result)
        // const result = model.graphics()
        // new Jimp(destWidth, destHeight, function (err, image) {
        //     image.bitmap.data = Buffer.from(result.buffer)
        //     image.write('./output/overlapping-model.png')
        // })
    } else {
        console.log('The generation ended in a contradiction')
    }
}
