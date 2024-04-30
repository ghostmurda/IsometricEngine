/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei'
import { Vector3 } from 'three'
import { ITileGroundProps, ITileTypes } from './TileGround'
import grass0 from '@assets/tiles/ground/grass0.png'
import grass1 from '@assets//tiles/ground/grass1.png'
import brick0 from '@assets//tiles/ground/brick0.png'
import castle0 from '@assets//tiles/ground/castleGround0.png'
import {
    TILE_GROUND_HEIGHT,
    TILE_GROUND_WIDTH,
    TILE_GROUND_Z_HEIGHT,
} from '@engine/utils/constants'
import React, { useCallback, useEffect, useMemo } from 'react'
import { checkIsPlayerInside } from '@engine/utils/checkIsPlayerInside'
import { calculateShadowColor } from '@engine/utils/shadow'

const tileTypes: ITileTypes = {
    0: grass0,
    1: grass1,
    2: brick0,
    3: castle0,
}

export const TileGround = React.memo(
    ({
        pos,
        type,
        isPatternChanging,
        onClickCallback,
        setInsideCb,
        setOutsideCb,
        playerPos: _playerPos,
        lightMap,
    }: ITileGroundProps) => {
        const texture = useTexture(tileTypes[type])
        const calculatedZ =
            pos.z === 1
                ? TILE_GROUND_Z_HEIGHT
                : pos.z - 1 + TILE_GROUND_Z_HEIGHT
        const position = new Vector3(pos.x, calculatedZ, pos.y)

        const playerPos = useMemo(() => {
            if (!_playerPos) {
                return
            }

            return new Vector3(_playerPos.x, _playerPos.y, _playerPos.z)
        }, [_playerPos])

        const shadowColor = useMemo(() => {
            if (!lightMap || !lightMap.length) {
                return
            }

            return calculateShadowColor(pos, lightMap)
        }, [lightMap, pos])

        const checkDistanceToPlayer = useCallback(() => {
            if (playerPos && setInsideCb && setOutsideCb) {
                checkIsPlayerInside({
                    playerPos,
                    x: pos.x,
                    z: pos.z,
                    isPatternChanging,
                    setInsideCb,
                    setOutsideCb,
                })
            }
        }, [playerPos, setInsideCb, setOutsideCb])

        useEffect(() => {
            if (playerPos && setInsideCb) {
                checkDistanceToPlayer()
            }
        }, [playerPos, setInsideCb])

        const handleClick = () => {
            const clickPos = new Vector3(pos.x, pos.z, pos.y)
            onClickCallback(clickPos)
        }

        return (
            <sprite
                position={position}
                scale={[
                    TILE_GROUND_WIDTH,
                    TILE_GROUND_HEIGHT,
                    TILE_GROUND_WIDTH,
                ]}
                onClick={handleClick}
            >
                <spriteMaterial map={texture} color={shadowColor} />
            </sprite>
        )
    }
)
