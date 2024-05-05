import { AppContext } from '@context/AppContext'
import { useContext, useEffect, useState } from 'react'
import { TChunksMap, TLightMapChunk } from './types'
import { CHUNK_SIZE, VIEW_DISTANCE } from '@engine/utils/constants'
import { Vector3 } from 'three'
import { randFloat } from 'three/src/math/MathUtils'
import isEqual from 'lodash/isEqual'
import { ChunkRenderer } from '@engine/components/ChunkRenderer'
import { generatePlaneLandscape } from '@engine/utils/worldGeneration/generatePlaneLandscape'

const DEFAULT_TILE_CHUNKS_MAP: TChunksMap = {
    '00': generatePlaneLandscape(0, 0),
}

const createLightPoints = (chunkX: number, chunkZ: number) => {
    return [
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
}

const DEFAULT_LIGHMAP_CHUNKS: TLightMapChunk = {
    '00': createLightPoints(0, 0),
}

export const ChunksController = () => {
    const { playerPos, currentLightMap, setCurrentLightMap, setClickPos } =
        useContext(AppContext)
    const [tileChunksMap, setTileChunksMap] = useState<TChunksMap>(
        DEFAULT_TILE_CHUNKS_MAP
    )
    const [lightMapChunks, setLightMapChunks] = useState<TLightMapChunk>(
        DEFAULT_LIGHMAP_CHUNKS
    )
    const [currentChunks, setCurrentChunks] = useState(['00'])

    useEffect(() => {
        if (playerPos) {
            let chunks = [...currentChunks]
            const playerPosX = +playerPos.x.toFixed(1)
            const playerPosZ = +playerPos.z.toFixed(1)
            const playerWorldPosX = +(playerPosX / CHUNK_SIZE).toString()[0]
            const playerWorldPosZ = +(playerPosZ / CHUNK_SIZE).toString()[0]

            chunks.push(`${playerWorldPosX}${playerWorldPosZ}`)

            const rightChunkId = `${playerWorldPosX + 1}${playerWorldPosZ}`
            const leftChunkId = `${playerWorldPosX - 1}${playerWorldPosZ}`
            const bottomChunkId = `${playerWorldPosX}${playerWorldPosZ + 1}`
            const upperChunkId = `${playerWorldPosX}${playerWorldPosZ - 1}`

            const isRightChunkNear =
                +rightChunkId[0] * CHUNK_SIZE - playerPosX <= VIEW_DISTANCE ||
                +rightChunkId[0] * CHUNK_SIZE + CHUNK_SIZE / 2 - playerPosX <=
                    VIEW_DISTANCE ||
                +rightChunkId[0] * CHUNK_SIZE + CHUNK_SIZE - playerPosX <=
                    VIEW_DISTANCE

            const isLeftChunkNear =
                +leftChunkId[0] >= 0 &&
                (playerPosX - +leftChunkId[0] * CHUNK_SIZE <= VIEW_DISTANCE ||
                    playerPosX - (+leftChunkId[0] * CHUNK_SIZE + CHUNK_SIZE) <=
                        VIEW_DISTANCE ||
                    playerPosX -
                        (+leftChunkId[0] * CHUNK_SIZE + CHUNK_SIZE / 2) <=
                        VIEW_DISTANCE)

            const isBottomChunkNear =
                +bottomChunkId[1] * CHUNK_SIZE - playerPosZ <= VIEW_DISTANCE ||
                +bottomChunkId[1] * CHUNK_SIZE + CHUNK_SIZE / 2 - playerPosZ <=
                    VIEW_DISTANCE ||
                +bottomChunkId[1] * CHUNK_SIZE + CHUNK_SIZE - playerPosZ <=
                    VIEW_DISTANCE

            const isUpperChunkNear =
                +upperChunkId[1] >= 0 &&
                (playerPosZ - +upperChunkId[1] * CHUNK_SIZE <= VIEW_DISTANCE ||
                    playerPosZ - (+upperChunkId[1] * CHUNK_SIZE + CHUNK_SIZE) <=
                        VIEW_DISTANCE ||
                    playerPosZ -
                        (+upperChunkId[1] * CHUNK_SIZE + CHUNK_SIZE / 2) <=
                        VIEW_DISTANCE)

            if (
                !!chunks.find((el) => el === rightChunkId) &&
                !isRightChunkNear
            ) {
                console.log(`chunk ${rightChunkId} cleanup`)
                chunks = chunks.filter((el) => el !== rightChunkId)
            }
            if (!!chunks.find((el) => el === leftChunkId) && !isLeftChunkNear) {
                console.log(`chunk ${leftChunkId} cleanup`)
                chunks = chunks.filter((el) => el !== leftChunkId)
            }
            if (
                !!chunks.find((el) => el === bottomChunkId) &&
                !isBottomChunkNear
            ) {
                console.log(`chunk ${bottomChunkId} cleanup`)
                chunks = chunks.filter((el) => el !== bottomChunkId)
            }
            if (
                !!chunks.find((el) => el === upperChunkId) &&
                !isUpperChunkNear
            ) {
                console.log(`chunk ${upperChunkId} cleanup`)
                chunks = chunks.filter((el) => el !== upperChunkId)
            }

            if (!chunks.find((el) => el === rightChunkId) && isRightChunkNear) {
                console.log(`chunk ${rightChunkId} render`)
                chunks.push(rightChunkId)
            }
            if (!chunks.find((el) => el === leftChunkId) && isLeftChunkNear) {
                console.log(`chunk ${leftChunkId} render`)
                chunks.push(leftChunkId)
            }
            if (
                !chunks.find((el) => el === bottomChunkId) &&
                isBottomChunkNear
            ) {
                console.log(`chunk ${bottomChunkId} render`)
                chunks.push(bottomChunkId)
            }
            if (!chunks.find((el) => el === upperChunkId) && isUpperChunkNear) {
                console.log(`chunk ${upperChunkId} render`)
                chunks.push(upperChunkId)
            }

            const newChunks = [...new Set(chunks)]

            if (!isEqual(currentChunks, newChunks)) {
                setCurrentChunks(newChunks)
            }
        }
    }, [playerPos])

    useEffect(() => {
        const newLightMapChunks = currentChunks.reduce(
            (prevValue, curValue) => {
                const chunkX = +curValue[0] * CHUNK_SIZE
                const chunkZ = +curValue[1] * CHUNK_SIZE

                let value =
                    lightMapChunks[curValue] ??
                    createLightPoints(chunkX, chunkZ)

                return {
                    ...prevValue,
                    [curValue]: value,
                }
            },
            {}
        )

        if (isEqual(lightMapChunks, newLightMapChunks)) {
            return
        }

        setLightMapChunks({ ...newLightMapChunks })
    }, [currentChunks])

    useEffect(() => {
        //@ts-ignore
        const newLightMap = Object.keys(lightMapChunks).reduce((prev, cur) => {
            return [...prev, ...lightMapChunks[cur]]
        }, [])

        if (!isEqual(currentLightMap, newLightMap)) {
            //@ts-ignore
            setCurrentLightMap?.(newLightMap)
        }
    }, [lightMapChunks])

    const renderChunks = (() => {
        if (!Object.keys(lightMapChunks).length) {
            return <></>
        }

        return currentChunks.map((curChunkId) => {
            const newChunkData = generatePlaneLandscape(
                +curChunkId[0],
                +curChunkId[1]
            )
            const chunk = tileChunksMap[curChunkId] ?? newChunkData
            const lightMap = lightMapChunks[curChunkId]

            if (!lightMap) {
                return <></>
            }

            if (!tileChunksMap[curChunkId]) {
                setTileChunksMap((prev) => ({
                    ...prev,
                    [curChunkId]: newChunkData,
                }))
            }

            return (
                <ChunkRenderer
                    tilesMatrix={chunk}
                    lightMap={lightMap}
                    worldPos={curChunkId}
                    key={curChunkId}
                    setClickPos={setClickPos}
                    playerPos={playerPos}
                />
            )
        })
    })()

    return <>{renderChunks}</>
}
