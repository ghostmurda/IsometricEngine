import { randFloat } from 'three/src/math/MathUtils'
import { Vector3 } from 'three'
import { IWorldMatrix } from './PatternGrid.d'
import { TileGround, TileWall } from './components'
import housePattern from '@engine/utils/generation/patterns/houseSmall.json'
import housePatternInside from '@engine/utils/generation/patterns/houseSmallInside.json'
import { useEffect, useMemo, useState } from 'react'
import React from 'react'

interface IWorldGridProps {
    handleClickPosition: (newPos: Vector3) => void
}

// TODO add option to not use pattern inside
export const PatternGrid = React.memo(
    ({ handleClickPosition }: IWorldGridProps) => {
        const [pattern, setPattern] = useState(housePattern)
        const [isPatternChanging, setIsPatternChanging] = useState(false)

        const handleSetPatternInside = () => {
            setPattern(housePatternInside as typeof housePattern)
            setIsPatternChanging(true)
        }

        const handleSetPatternOutside = () => {
            setPattern(housePattern)
            setIsPatternChanging(true)
        }

        useEffect(() => {
            if (isPatternChanging) {
                const reset = setTimeout(() => {
                    setIsPatternChanging(false)
                }, 500)

                return () => clearTimeout(reset)
            }
        }, [isPatternChanging])

        const renderLevelTiles = (matrix: IWorldMatrix, z: string) => {
            const renderTiles = Object.keys(matrix).map((row: string) => {
                return matrix[row].map((tileType, col) => {
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
                                // setInsideCb={handleSetPatternInside}
                                // setOutsideCb={handleSetPatternOutside}
                                // isPatternChanging={isPatternChanging}
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
                            // setInsideCb={handleSetPatternInside}
                            // setOutsideCb={handleSetPatternOutside}
                            // isPatternChanging={isPatternChanging}
                        />
                    )
                })
            })

            return renderTiles
        }

        const renderAllLevels = useMemo(
            () =>
                Object.keys(pattern).map((level) => {
                    return renderLevelTiles(
                        //@ts-ignore
                        pattern[level],
                        level
                    )
                }),
            [pattern, isPatternChanging]
        )

        console.log('render pattern grid')

        return (
            <>
                {/* <gridHelper args={[20, 20, 'white', 'gray']} /> */}
                {renderAllLevels}
            </>
        )
    }
)
