import { Vector3 } from 'three'
import { IWorldMatrix } from './PatternGrid.d'
import { TileGround, TileWall } from './components'
import housePattern from '@engine/utils/generation/patterns/houseSmall.json'
import housePatternInside from '@engine/utils/generation/patterns/houseSmallInside.json'
import { memo, useEffect, useMemo, useState } from 'react'

interface IWorldGridProps {
    lightMap?: Vector3[]
    handleClickPosition: (newPos: Vector3) => void
}

// TODO add option to not use pattern inside
export const PatternGrid = memo(
    ({ lightMap, handleClickPosition }: IWorldGridProps) => {
        const [pattern, setPattern] = useState(housePattern)
        const [isPatternChanging, setIsPatternChanging] = useState(false)

        // const handleSetPatternInside = () => {
        //     setPattern(housePatternInside as typeof housePattern)
        //     setIsPatternChanging(true)
        // }

        // const handleSetPatternOutside = () => {
        //     setPattern(housePattern)
        //     setIsPatternChanging(true)
        // }

        useEffect(() => {
            if (isPatternChanging) {
                const reset = setTimeout(() => {
                    setIsPatternChanging(false)
                }, 500)

                return () => clearTimeout(reset)
            }
        }, [isPatternChanging])

        const renderLevelTiles = (matrix: IWorldMatrix, _z: string) => {
            const renderTiles = Object.keys(matrix).map((row: string) => {
                return matrix[row].map((tileType, col) => {
                    if (tileType === -1) {
                        return
                    }

                    const x = col
                    const y = +row
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
                                pos={pos}
                                type={tileType}
                                key={key}
                                onClickCallback={handleClickPosition}
                                lightMap={lightMap}
                                // setInsideCb={handleSetPatternInside}
                                // setOutsideCb={handleSetPatternOutside}
                                // isPatternChanging={isPatternChanging}
                            />
                        )
                    }

                    return (
                        <TileWall
                            pos={pos}
                            type={tileType}
                            key={key}
                            lightMap={lightMap}
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
