import { Vector3 } from 'three'
import { CHUNK_SIZE } from '../constants'
import { randFloat } from 'three/src/math/MathUtils'

const TILE_NOTHING = -1
const TILE_GRASS = 0
const TILE_DIRT_WALL = 7

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
    ]

    const intencity = 15
    const planeData: Record<string, Record<string, number[]>> = {}
    for (let level = 0; level <= height; level++) {
        const tileData = {} as Record<string, number[]>

        for (let i = 0; i < CHUNK_SIZE; i++) {
            const levelArr = []
            for (let j = 0; j < CHUNK_SIZE; j++) {
                let distance: number | undefined

                const lightPos = randomPoints.filter((point) => {
                    if (distance) {
                        return false
                    }

                    const _distance = +new Vector3(
                        chunkX + i,
                        chunkZ + j,
                        level
                    )
                        .distanceTo(point)
                        .toFixed(1)

                    if (_distance < intencity) {
                        distance = _distance
                        return true
                    }
                    return false
                })?.[0]

                let currentTile = level === 0 ? TILE_GRASS : TILE_NOTHING
                let isTile = false

                if (lightPos && distance) {
                    if (distance < intencity - (intencity / 3) * 2 && !isTile) {
                        if (level === 2) {
                            currentTile = TILE_DIRT_WALL
                            isTile = true
                        }
                        if (level === 3) {
                            currentTile = TILE_GRASS
                            isTile = true
                        }
                    }
                    if (distance < intencity - intencity / 3 && !isTile) {
                        if (level === 1) {
                            currentTile = TILE_DIRT_WALL
                            isTile = true
                        }
                        if (level === 2) {
                            currentTile = TILE_GRASS
                            isTile = true
                        }
                    }
                    if (distance < intencity && !isTile) {
                        if (level === 0) {
                            currentTile = TILE_DIRT_WALL
                            isTile = true
                        }
                        if (level === 1) {
                            currentTile = TILE_GRASS
                            isTile = true
                        }
                    }
                }

                levelArr.push(currentTile)
            }
            tileData[i] = levelArr
        }
        planeData[level.toString()] = tileData
    }

    return planeData
}
