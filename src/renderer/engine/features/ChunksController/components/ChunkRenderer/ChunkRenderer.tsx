import { memo } from 'react'
import { TTilesChunk, IWorldMatrix } from '../../types'
import { Vector3 } from 'three'
import { TileGround, TileWall, TreesGrid } from '@engine/components/tiles'
import { CHUNK_SIZE } from '@engine/utils/constants'

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

        const renderLevelTiles = (matrix: IWorldMatrix, _z: string) => {
            const renderTiles = Object.keys(matrix).map((row: string) => {
                return matrix[row].map((tileType, col) => {
                    if (tileType === -1) {
                        return
                    }

                    const x = col + CHUNK_SIZE * worldPosX
                    const y = +row + CHUNK_SIZE * worldPosZ
                    const z = +_z
                    const pos = new Vector3(x, y, z)
                    const key =
                        tileType.toString() +
                        x.toString() +
                        y.toString() +
                        z.toString()

                    if (tileType < 5) {
                        return (
                            <TileGround
                                key={key}
                                pos={pos}
                                type={tileType}
                                onClickCallback={handleClickPos}
                                lightMap={lightMap}
                                playerPosRef={playerPosRef}
                            />
                        )
                    }

                    return (
                        <TileWall
                            key={key}
                            pos={pos}
                            type={tileType}
                            lightMap={lightMap}
                            playerPosRef={playerPosRef}
                        />
                    )
                })
            })

            return renderTiles
        }

        const renderAllLevels = Object.keys(tilesMatrix).map((level) => {
            return renderLevelTiles(
                //@ts-ignore
                tilesMatrix[level],
                level
            )
        })

        console.log('render chunk')

        return (
            <>
                {renderAllLevels}
                <TreesGrid
                    count={32}
                    worldPosX={CHUNK_SIZE * worldPosX}
                    worldPosZ={CHUNK_SIZE * worldPosZ}
                    playerPosRef={playerPosRef}
                />
            </>
        )
    }
)
