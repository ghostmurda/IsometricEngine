import { randFloat } from 'three/src/math/MathUtils'
import { Vector3 } from 'three'
import { IWorldMatrix } from './WorldGrid.d'
import { TileGround, TileWall } from './components'
import housePattern from '@utils/generation/patterns/houseSmall.json'
import housePatternInside from '@utils/generation/patterns/houseSmallInside.json'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { checkIsPlayerInside } from '@utils/checkIsPlayerInside'

interface IWorldGridProps {
    handleClickPosition: (newPos: Vector3) => void
    playerPos?: Vector3
}

export const WorldGrid = ({
    handleClickPosition,
    playerPos,
}: IWorldGridProps) => {
    const [pattern, setPattern] = useState(housePattern)
    const [isPatternInside, setIsPatternIndide] = useState(false)

    const handleSetPatternInside = () => {
        setPattern(housePatternInside)
        setIsPatternIndide(true)
    }

    const handleSetPatternOutside = () => {
        setPattern(housePattern)
        setIsPatternIndide(false)
    }

    const renderLevelTiles = useCallback(
        (matrix: IWorldMatrix, z: string) => {
            const renderTiles = Object.keys(matrix).map((row: string) => {
                return matrix[row].map((tileType, col) => {
                    if (tileType === -1) {
                        return
                    }

                    if (col === 1 && +z === 1) {
                        const dX = +(playerPos?.x?.toFixed(10) || 0) - col
                        const dZ = +(playerPos?.z?.toFixed(10) || 0) - +z
                        const dMax = 10

                        const isOutside =
                            dX > dMax || dX < -dMax || dZ > dMax || dZ < -dMax

                        if (isOutside && isPatternInside) {
                            handleSetPatternOutside()
                        }
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
                                playerPos={playerPos}
                                setInsideCb={handleSetPatternInside}
                                setOutsideCb={handleSetPatternOutside}
                                isPatternInside={isPatternInside}
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
                            playerPos={playerPos}
                            setInsideCb={handleSetPatternInside}
                            setOutsideCb={handleSetPatternOutside}
                            isPatternInside={isPatternInside}
                        />
                    )
                })
            })

            return renderTiles
        },
        [playerPos, isPatternInside]
    )

    const renderAllLevels = useMemo(
        () =>
            Object.keys(pattern).map((level) => {
                return renderLevelTiles(
                    //@ts-ignore
                    pattern[level],
                    level
                )
            }),
        [playerPos, pattern, isPatternInside]
    )

    return (
        <>
            {/* <gridHelper args={[20, 20, 'white', 'gray']} /> */}
            {renderAllLevels}
        </>
    )
}
