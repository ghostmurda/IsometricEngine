import { useMemo } from 'react'
import { Tree } from '../Tree'
import { randFloat } from 'three/src/math/MathUtils'

interface ITreesChunkProps {
    size?: number
    count?: number
}

export const TreesChunk = ({ size = 50, count = 5 }: ITreesChunkProps) => {
    const renderTrees = useMemo(
        () =>
            [...new Array(count)].map((_, i) => {
                return (
                    <Tree
                        key={i}
                        x={randFloat(0, 2) * 10}
                        y={1}
                        z={randFloat(0, 2) * 10}
                    />
                )
            }),
        [size, count]
    )

    return <>{renderTrees}</>
}
