import { memo, useMemo } from 'react'
import { TTilesChunk } from '../../features/ChunksController/types'
import { Vector3 } from 'three'
import { CHUNK_SIZE, TILES_BLOCK_SIZE } from '@engine/utils/constants'
import { TilesBlock } from '../TilesBlock'

interface Props {
    tilesMatrix: TTilesChunk
    lightMap: Vector3[]
    worldPos: string
    setClickPos:
        | React.Dispatch<React.SetStateAction<Vector3 | undefined>>
        | undefined
    playerPosRef?: React.MutableRefObject<Vector3>
}

export const ChunkRenderer = memo(
    ({ tilesMatrix, lightMap, worldPos, setClickPos, playerPosRef }: Props) => {
        const worldPosX = +worldPos[0]
        const worldPosZ = +worldPos[1]

        const handleClickPos = (_newPos: Vector3) => {
            const newPos = new Vector3(
                +_newPos.x.toFixed(1),
                +_newPos.y.toFixed(1),
                +_newPos.z.toFixed(1)
            )
            setClickPos?.(newPos)
        }

        const tileBlocksMap = useMemo(() => {
            const transformedMatrix: number[][][] = []
            Object.keys(tilesMatrix).map((key) => {
                const transformedRow = [] as number[][]
                Object.keys(tilesMatrix[key]).map((rowKey) => {
                    transformedRow.push(tilesMatrix[key][rowKey])
                })
                transformedMatrix.push(transformedRow)
            })

            const blocksMap = []
            const diff = CHUNK_SIZE / TILES_BLOCK_SIZE

            while (blocksMap.length < diff * diff) {
                const blockData: Record<string, number[][]> = {}
                for (
                    let level = 0;
                    level < Object.keys(transformedMatrix).length;
                    level++
                ) {
                    let sx =
                        blocksMap.length === 0
                            ? 0
                            : blocksMap.length + TILES_BLOCK_SIZE
                    let ex = sx + TILES_BLOCK_SIZE - 1
                    let sy =
                        blocksMap.length === 0
                            ? 0
                            : blocksMap.length + TILES_BLOCK_SIZE
                    let ey = sy + TILES_BLOCK_SIZE - 1

                    let section16x16: number[][] = transformedMatrix[level]
                        .slice(sx, ex + 1)
                        .map((i) => i.slice(sy, ey + 1))

                    blockData[level.toString()] = section16x16
                }
                blocksMap.push(blockData)
            }

            return blocksMap
        }, [tilesMatrix])

        const renderTileBlocks = useMemo(
            () =>
                tileBlocksMap.map((tileBlock, i) => {
                    const getTileBlockPos = () => {
                        const posX = worldPosX * CHUNK_SIZE
                        const posZ = worldPosZ * CHUNK_SIZE

                        switch (i) {
                            case 0:
                                return new Vector3(posX + 0, 0, posZ + 0)
                            case 1:
                                return new Vector3(posX + 16, 0, posZ + 0)
                            case 2:
                                return new Vector3(posX + 32, 0, posZ + 0)
                            case 3:
                                return new Vector3(posX + 48, 0, posZ + 0)

                            case 4:
                                return new Vector3(posX + 0, 0, posZ + 16)
                            case 5:
                                return new Vector3(posX + 16, 0, posZ + 16)
                            case 6:
                                return new Vector3(posX + 32, 0, posZ + 16)
                            case 7:
                                return new Vector3(posX + 48, 0, posZ + 16)

                            case 8:
                                return new Vector3(posX + 0, 0, posZ + 32)
                            case 9:
                                return new Vector3(posX + 16, 0, posZ + 32)
                            case 10:
                                return new Vector3(posX + 32, 0, posZ + 32)
                            case 11:
                                return new Vector3(posX + 48, 0, posZ + 32)

                            case 12:
                                return new Vector3(posX + 0, 0, posZ + 48)
                            case 13:
                                return new Vector3(posX + 16, 0, posZ + 48)
                            case 14:
                                return new Vector3(posX + 32, 0, posZ + 48)
                            case 15:
                                return new Vector3(posX + 48, 0, posZ + 48)
                            default:
                                new Vector3(posX + 0, 0, posZ + 0)
                        }
                    }

                    if (!getTileBlockPos()) {
                        return <></>
                    }

                    return (
                        <TilesBlock
                            key={i.toString() + getTileBlockPos()}
                            pos={getTileBlockPos() as Vector3}
                            tilesMatrix={tileBlock}
                            playerPosRef={playerPosRef}
                            lightMap={lightMap}
                            onClickCallback={handleClickPos}
                        />
                    )
                }),
            [tileBlocksMap]
        )

        return <>{renderTileBlocks}</>
    }
)
