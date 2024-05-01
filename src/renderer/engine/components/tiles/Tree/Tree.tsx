import { useTexture } from '@react-three/drei'
import { Vector3 } from 'three'
import { memo, useMemo, useRef } from 'react'
import { TILE_WALL_HEIGHT, TILE_WALL_WIDTH } from '@engine/utils/constants'

import tree1_01 from '@assets/textures/tree_01/_tree_01_00000.png'
import tree1_02 from '@assets/textures/tree_01/_tree_01_10000.png'
import tree1_03 from '@assets/textures/tree_01/_tree_01_20000.png'
import tree1_04 from '@assets/textures/tree_01/_tree_01_30000.png'
import tree1_05 from '@assets/textures/tree_01/_tree_01_40000.png'
import tree1_06 from '@assets/textures/tree_01/_tree_01_50000.png'

import { randFloat } from 'three/src/math/MathUtils'
import { calculateShadowColor } from '@engine/utils/shadow'
import { useCheckVisinility } from 'src/renderer/engine/hooks/useCheckVisibility'

interface ITreeProps {
    pos: Vector3
    lightMap: Vector3[]
    type?: string
    playerPosRef?: React.MutableRefObject<Vector3>
}

const textures: Record<string, string> = {
    //@ts-ignore
    tree1: {
        '1': tree1_01,
        '2': tree1_02,
        '3': tree1_03,
        '4': tree1_04,
        '5': tree1_05,
        '6': tree1_06,
    },
}

export const Tree = memo(
    ({ pos, type = 'tree1', lightMap, playerPosRef }: ITreeProps) => {
        const rand = useMemo(() => +randFloat(0, 1).toFixed(1) * 10, [])
        const texture = useTexture(
            textures[type]?.[rand] || textures['tree1']['1']
        )
        const shadowColor = useRef()
        const { isVisible } = useCheckVisinility({
            pos: new Vector3(pos.x, pos.z, pos.y),
            playerPosRef,
        })

        if (!isVisible) {
            return <></>
        }

        if (!shadowColor.current && lightMap) {
            //@ts-ignore
            shadowColor.current = calculateShadowColor(pos, lightMap)
        }

        return (
            <>
                <sprite
                    position={pos}
                    scale={[
                        TILE_WALL_WIDTH * 4,
                        TILE_WALL_HEIGHT * 6,
                        TILE_WALL_WIDTH * 4,
                    ]}
                >
                    <spriteMaterial map={texture} color={shadowColor.current} />
                </sprite>
            </>
        )
    }
)
