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
                const x = randFloat(-size, size)
                const z = randFloat(-size, size)
                const y = 1

                return <Tree key={i} x={x} y={y} z={z} />
            }),
        [size, count]
    )

    return <>{renderTrees}</>
}
