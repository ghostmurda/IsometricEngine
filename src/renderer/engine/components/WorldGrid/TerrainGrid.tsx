import React, { useMemo } from 'react'
import { TileGround, TileWall } from './components'
import { Vector3 } from 'three'

const SIZE_WIDTH = 60
const SIZE_HEIGHT = 60
const DEFAULT_TILE = 0
const z = 0

const LIGHT_POS = new Vector3(10, 0, 10)
    .normalize()
    .multiply(new Vector3(0, 1, 0))

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

                    const x = col
                    const y = +row
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
                                lightPos={LIGHT_POS}
                            />
                        )
                    }

                    return <TileWall pos={pos} type={tileType} key={key} />
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
