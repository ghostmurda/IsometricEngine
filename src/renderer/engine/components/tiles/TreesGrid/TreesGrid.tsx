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
    playerPosRef?: React.MutableRefObject<Vector3>
}

export const TreesGrid = ({
    size = CHUNK_SIZE,
    count = 150,
    worldPosX,
    worldPosZ,
    playerPosRef,
}: ITreesChunkProps) => {
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
                        playerPosRef={playerPosRef}
                    />
                )
            }),
        [size, count, worldPosX, worldPosZ]
    )

    return <>{renderTrees}</>
}
