import React, { useMemo } from 'react'
import { Vector3 } from 'three'
import { TileGround } from '../TileGround'
import { TileWall } from '../TileWall'
import { CHUNK_SIZE } from '@engine/utils/constants'
import { generatePlane } from '@engine/utils/worldGeneration/generatePlane'

interface ITerrainGridProps {
    lightMap?: Vector3[]
    handleClickPosition: (newPos: Vector3) => void
}

export const TerrainGrid = React.memo(
    ({ lightMap, handleClickPosition }: ITerrainGridProps) => {
        const renderTiles = useMemo(() => {
            const planeData = generatePlane(CHUNK_SIZE)

            return Object.keys(planeData).map((row: string) => {
                return planeData[row].map((tileType, col) => {
                    if (tileType === -1) {
                        return
                    }

                    const x = col
                    const y = +row
                    const z = 0
                    const pos = new Vector3(x, y, z)
                    const key =
                        tileType.toString() +
                        x.toString() +
                        y.toString() +
                        z.toString()

                    if (tileType < 5) {
                        return (
                            <TileGround
                                pos={pos}
                                type={tileType}
                                key={key}
                                onClickCallback={handleClickPosition}
                                lightMap={lightMap}
                            />
                        )
                    }

                    return (
                        <TileWall
                            pos={pos}
                            type={tileType}
                            key={key}
                            lightMap={lightMap}
                        />
                    )
                })
            })
        }, [])

        console.log('render terrain grid')

        return (
            <>
                {/* <gridHelper args={[SIZE_WIDTH, SIZE_HEIGHT, 'white', 'gray']} /> */}
                {renderTiles}
            </>
        )
    }
)
