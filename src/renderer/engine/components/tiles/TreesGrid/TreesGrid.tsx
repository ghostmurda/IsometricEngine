import { useMemo } from 'react'
import { Tree } from '../Tree'
import { randFloat } from 'three/src/math/MathUtils'
import React from 'react'
import { Vector3 } from 'three'
import { CHUNK_SIZE } from '@engine/utils/constants'

interface ITreesChunkProps {
    size?: number
    count?: number
    worldPosX: number
    worldPosZ: number
    lightMap: Vector3[]
    playerPosRef?: React.MutableRefObject<Vector3>
}

export const TreesGrid = ({
    size = CHUNK_SIZE,
    count = 150,
    worldPosX,
    worldPosZ,
    lightMap,
    playerPosRef,
}: ITreesChunkProps) => {
    console.log('worldPosX trees', worldPosX)
    console.log('worldPosZ trees', worldPosZ)

    const renderTrees = useMemo(
        () =>
            [...new Array(count)].map((_, i) => {
                const x = +randFloat(worldPosX, worldPosX + size).toFixed(1)
                const z = +randFloat(worldPosZ, worldPosZ + size).toFixed(1)
                const y = 1.7

                const pos = new Vector3(x, y, z)

                return (
                    <Tree
                        key={`${worldPosX}${worldPosZ} n${i}`}
                        pos={pos}
                        lightMap={lightMap}
                        playerPosRef={playerPosRef}
                    />
                )
            }),
        [size, count, worldPosX, worldPosZ]
    )

    return <>{renderTrees}</>
}
