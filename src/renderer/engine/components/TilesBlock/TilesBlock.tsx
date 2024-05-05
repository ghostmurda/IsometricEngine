import { Vector3 } from 'three'
import { useCheckVisinility } from '../../hooks/useCheckVisibility'
import { TileGround } from '../tiles/TileGround'
import { TileWall } from '../tiles/TileWall'
import { memo } from 'react'
import { calculateShadowColor } from '@engine/utils/shadow'
import { TILES_BLOCK_SIZE } from '@engine/utils/constants'
import { TreesGrid } from '../tiles/TreesGrid'

interface Props {
    pos: Vector3
    onClickCallback: (newPos: Vector3) => void
    lightMap: Vector3[]
    playerPos: Vector3
    tilesMatrix: Record<string, number[][]>
}

export const TilesBlock = memo(
    ({
        pos: _pos,
        playerPos,
        tilesMatrix,
        lightMap,
        onClickCallback,
    }: Props) => {
        const { isVisible } = useCheckVisinility({
            pos: new Vector3(_pos.x, _pos.z, _pos.y),
            playerPos,
        })

        if (!isVisible) {
            return <></>
        }

        const renderLevelTiles = (matrix: number[][], _z: string) => {
            const renderTiles = matrix.map((row, rowIndex) => {
                return row.map((tileType, col) => {
                    if (tileType === -1) {
                        return
                    }

                    const x = rowIndex + _pos.x
                    const y = col + _pos.z
                    const z = +_z

                    const pos = new Vector3(x, y, z)
                    const key =
                        tileType.toString() +
                        x.toString() +
                        y.toString() +
                        z.toString()
                    const shadowColor = calculateShadowColor(pos, lightMap)

                    if (tileType < 5) {
                        return (
                            <TileGround
                                key={key}
                                pos={pos}
                                type={tileType}
                                shadowColor={shadowColor}
                                onClickCallback={onClickCallback}
                            />
                        )
                    }

                    return (
                        <TileWall
                            key={key}
                            pos={pos}
                            type={tileType}
                            shadowColor={shadowColor}
                        />
                    )
                })
            })

            return renderTiles
        }

        const renderAllLevels = Object.keys(tilesMatrix).map((level) => {
            return renderLevelTiles(tilesMatrix[level], level)
        })

        return (
            <>
                {renderAllLevels}
                <TreesGrid
                    count={2}
                    size={TILES_BLOCK_SIZE}
                    worldPosX={_pos.x}
                    worldPosZ={_pos.z}
                    lightMap={lightMap}
                />
            </>
        )
    }
)
