import { Vector3 } from 'three'
import { CHUNK_SIZE } from '../constants'
import { randFloat } from 'three/src/math/MathUtils'

const TILE_GRASS = 0

export const generatePlaneLandscape = (chunkX: number, chunkZ: number) => {
    const height = 3
    const randomPoints = [
        new Vector3(
            randFloat(chunkX, chunkX + CHUNK_SIZE),
            randFloat(chunkZ, chunkZ + CHUNK_SIZE),
            0.7
        ),
        new Vector3(
            randFloat(chunkX, chunkX + CHUNK_SIZE),
            randFloat(chunkZ, chunkZ + CHUNK_SIZE),
            0.7
        ),
        new Vector3(
            randFloat(chunkX, chunkX + CHUNK_SIZE),
            randFloat(chunkZ, chunkZ + CHUNK_SIZE),
            0.7
        ),
        new Vector3(
            randFloat(chunkX, chunkX + CHUNK_SIZE),
            randFloat(chunkZ, chunkZ + CHUNK_SIZE),
            0.7
        ),
    ]

    const tileData = {} as Record<string, number[]>

    for (let i = 0; i < CHUNK_SIZE; i++) {
        const levelArr = []
        for (let j = 0; j < CHUNK_SIZE; j++) {
            levelArr.push(TILE_GRASS)
        }
        tileData[i] = levelArr
    }

    // for(let y = 0; y < height; y++) {
    //     const intencity = 15
    //     let distance: number | undefined

    //     const lightPos = randomPoints.filter((point) => {
    //         if (distance) {
    //             return false
    //         }

    //         const _distance = +pos.distanceTo(point).toFixed(1)

    //         if (_distance < intencity) {
    //             distance = _distance
    //             return true
    //         }
    //         return false
    //     })?.[0]

    //     if (lightPos && distance) {
    //         if (distance < intencity - (intencity / 3) * 2) {
    //             return
    //         }
    //         if (distance < intencity - intencity / 3) {
    //             return TILE_WEAK_SHADOW_COLOR
    //         }
    //         if (distance < intencity) {
    //             return TILE_MEDIUM_SHADOW_COLOR
    //         }
    //     }
    // }
}
