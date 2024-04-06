import { useMemo } from 'react'
import { Tree } from '../Tree'

interface ITreesChunkProps {
    size?: number
    count?: number
}

export const TreesChunk = ({ size = 50, count = 5 }: ITreesChunkProps) => {
    const renderTrees = useMemo(
        () =>
            [...new Array(count)].map((_, i) => {
                console.log('tree coords', i, [
                    (new Date().getUTCDate() * size * i) / 100,
                    1,
                    (new Date().getUTCDate() * size * i) / 100,
                ])

                return (
                    <Tree
                        key={i}
                        x={(new Date().getUTCDate() * size * i) / 100}
                        y={1}
                        z={(new Date().getUTCDate() * size * i) / 100}
                    />
                )
            }),
        [size, count]
    )

    return <>{renderTrees}</>
}
