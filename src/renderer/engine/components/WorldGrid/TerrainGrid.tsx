import React, { useMemo } from 'react'
import { TileGround, TileWall } from './components'
import { randFloat } from 'three/src/math/MathUtils'
import { Vector3 } from 'three'

const SIZE_WIDTH = 60
const SIZE_HEIGHT = 60
const DEFAULT_TILE = 0
const z = 0

interface ITerrainGridProps {
    handleClickPosition: (newPos: Vector3) => void
}

export const TerrainGrid = React.memo(
    ({ handleClickPosition }: ITerrainGridProps) => {
        const renderTiles = useMemo(() => {
            const planeData = {} as Record<string, number[]>

            for (let i = 0; i < SIZE_HEIGHT; i++) {
                const levelArr = []
                for (let j = 0; j < SIZE_WIDTH; j++) {
                    levelArr.push(DEFAULT_TILE)
                }
                planeData[i.toString()] = levelArr
            }

            return Object.keys(planeData).map((row: string) => {
                return planeData[row].map((tileType, col) => {
                    if (tileType === -1) {
                        return
                    }

                    if (tileType < 5) {
                        return (
                            <TileGround
                                x={col}
                                y={+row}
                                z={+z}
                                type={tileType}
                                key={tileType + col + row + z + randFloat(0, 1)}
                                onClickCallback={handleClickPosition}
                            />
                        )
                    }

                    return (
                        <TileWall
                            x={col}
                            y={+row}
                            z={+z}
                            type={tileType}
                            key={tileType + col + row + z + randFloat(0, 1)}
                        />
                    )
                })
            })
        }, [])

        console.log('render terrain grid')

        return (
            <>
                <gridHelper args={[SIZE_WIDTH, SIZE_HEIGHT, 'white', 'gray']} />
                {renderTiles}
            </>
        )
    }
)