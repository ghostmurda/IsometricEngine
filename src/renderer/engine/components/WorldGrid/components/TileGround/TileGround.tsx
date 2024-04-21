/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei'
import { Vector3 } from 'three'
import { ITileGroundProps, ITileTypes } from './TileGround.d'
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
import { checkShadowColor } from '@engine/utils/shadow'

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
        lightPos,
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
            if (!lightPos) {
                return
            }

            return checkShadowColor(pos, lightPos)
        }, [lightPos, pos])

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

        return (
            <sprite
                position={position}
                scale={[
                    TILE_GROUND_WIDTH,
                    TILE_GROUND_HEIGHT,
                    TILE_GROUND_WIDTH,
                ]}
                onClick={() => onClickCallback(position)}
            >
                <spriteMaterial map={texture} color={shadowColor} />
            </sprite>
        )
    }
)
