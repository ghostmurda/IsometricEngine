/* eslint-disable consistent-return */
/* eslint-disable react/no-unknown-property */
import { IWorldMatrix, IWorldTileLevels } from './WorldGrid.d'
import { TileGround, TileWall } from './components'

// TO DO Make simple world generator
const worldLevel1: IWorldMatrix = {
    1: [5, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    2: [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    3: [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    4: [5, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    6: [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}

const worldLevel2: IWorldMatrix = {
    1: [5],
    4: [5],
}

const worldLevel3: IWorldMatrix = {
    1: [5],
    4: [5],
}
const worldLevel4: IWorldMatrix = {
    1: [5],
    4: [5],
}

const worldLevel5: IWorldMatrix = {
    1: [5],
    4: [5],
}

const worldLevel6: IWorldMatrix = {
    1: [2],
    4: [2],
}

const worldTileLevels: IWorldTileLevels = {
    1: worldLevel1,
    2: worldLevel2,
    3: worldLevel3,
    4: worldLevel4,
    5: worldLevel5,
    6: worldLevel6,
}

export const WorldGrid = () => {
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
                            y={Number(row)}
                            z={Number(z)}
                            type={tileType}
                        />
                    )
                }

                return (
                    <TileWall
                        x={col}
                        y={Number(row)}
                        z={Number(z)}
                        type={tileType}
                    />
                )
            })
        })

        return renderTiles
    }

    const renderAllLevels = Object.keys(worldTileLevels).map((level) => {
        return renderLevelTiles(worldTileLevels[level], level)
    })

    return (
        <>
            <gridHelper args={[20, 20, 'white', 'gray']} />
            {renderAllLevels}
        </>
    )
}
