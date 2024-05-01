/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei'
import { Vector3 } from 'three'
import { ITileGroundProps, ITileTypes } from './TileGround.d'
import {
    TILE_GROUND_HEIGHT,
    TILE_GROUND_WIDTH,
    TILE_GROUND_Z_HEIGHT,
} from '@engine/utils/constants'
import React, { useRef } from 'react'
import { calculateShadowColor } from '@engine/utils/shadow'

import grass0 from '@assets/tiles/ground/grass01.png'
import grass1 from '@assets//tiles/ground/grass1.png'
import brick0 from '@assets//tiles/ground/brick0.png'
import castle0 from '@assets//tiles/ground/castleGround0.png'
import { useCheckVisinility } from 'src/renderer/engine/hooks/useCheckVisibility'

const tilesMap: ITileTypes = {
    0: grass0,
    1: grass1,
    2: brick0,
    3: castle0,
}

export const TileGround = React.memo(
    ({
        pos,
        type,
        onClickCallback,
        lightMap,
        playerPosRef,
    }: ITileGroundProps) => {
        const texture = useTexture(tilesMap[type])
        const shadowColor = useRef()
        const { isVisible } = useCheckVisinility({ pos, playerPosRef })

        if (!isVisible) {
            return <></>
        }

        const calculatedZ =
            pos.z === 1
                ? TILE_GROUND_Z_HEIGHT
                : pos.z - 1 + TILE_GROUND_Z_HEIGHT
        const position = new Vector3(pos.x, calculatedZ, pos.y)

        if (!shadowColor.current && lightMap) {
            //@ts-ignore
            shadowColor.current = calculateShadowColor(pos, lightMap)
        }

        const handleClick = () => {
            const clickPos = new Vector3(pos.x, pos.z, pos.y)
            onClickCallback(clickPos)
        }

        console.log('render tile ' + type)

        return (
            <sprite
                position={position}
                scale={[
                    TILE_GROUND_WIDTH,
                    TILE_GROUND_HEIGHT,
                    TILE_GROUND_WIDTH,
                ]}
                onClick={handleClick}
                receiveShadow
            >
                <spriteMaterial
                    map={texture}
                    toneMapped={false}
                    color={shadowColor.current}
                />
            </sprite>
        )
    }
)
