import { useMemo } from 'react'
import { Tree } from '../Tree'
import { randFloat } from 'three/src/math/MathUtils'
import React from 'react'
import { Vector3 } from 'three'

interface ITreesChunkProps {
    size?: number
    count?: number
    lightMap?: Vector3[]
}

export const TreesChunk = React.memo(
    ({ size = 50, count = 150, lightMap }: ITreesChunkProps) => {
        const renderTrees = useMemo(
            () =>
                [...new Array(count)].map((_, i) => {
                    const x = randFloat(-size, size)
                    const z = randFloat(-size, size)
                    const y = 1.7

                    return (
                        <Tree
                            key={i}
                            pos={new Vector3(x, y, z)}
                            lightMap={lightMap}
                        />
                    )
                }),
            [size, count, lightMap]
        )

        return <>{renderTrees}</>
    }
)
