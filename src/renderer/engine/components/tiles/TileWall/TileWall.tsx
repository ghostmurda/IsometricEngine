/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei'
import { ITileWallProps, ITileTypes } from './TileWall'
import brickWall1 from '@assets/tiles/walls/brickWall1.png'
import castleWall1 from '@assets/tiles/walls/castleWall1.png'
import {
    TILE_WALL_HEIGHT,
    TILE_WALL_WIDTH,
    TILE_WALL_Z_HEIGHT,
} from '@engine/utils/constants'
import React, { useCallback, useEffect, useMemo } from 'react'
import { Vector3 } from 'three'
import { checkIsPlayerInside } from '@engine/utils/checkIsPlayerInside'
import { calculateShadowColor } from '@engine/utils/shadow'

const tileTypes: ITileTypes = {
    5: brickWall1,
    6: castleWall1,
}

export const TileWall = React.memo(
    ({
        pos,
        type,
        isPatternChanging,
        setInsideCb,
        setOutsideCb,
        playerPos: _playerPos,
        lightMap,
    }: ITileWallProps) => {
        const texture = useTexture(tileTypes[type])
        const calculatedZ =
            pos.z === 1 ? TILE_WALL_Z_HEIGHT : pos.z - 1 + TILE_WALL_Z_HEIGHT
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

        return (
            <>
                {/* <mesh position={[x, z, y]} visible={false} receiveShadow castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={texture} />
            </mesh> */}
                <sprite
                    position={position}
                    scale={[TILE_WALL_WIDTH, TILE_WALL_HEIGHT, TILE_WALL_WIDTH]}
                >
                    <spriteMaterial map={texture} color={shadowColor} />
                </sprite>
            </>
        )
    }
)
