/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei'
import { ITileWallProps, ITileTypes } from './TileWall.d'
import brickWall1 from '@assets/tiles/walls/brickWall1.png'
import castleWall1 from '@assets/tiles/walls/castleWall1.png'
import {
    TILE_MEDIUM_SHADOW_COLOR,
    TILE_STRONG_SHADOW_COLOR,
    TILE_WALL_HEIGHT,
    TILE_WALL_WIDTH,
    TILE_WALL_Z_HEIGHT,
    TILE_WEAK_SHADOW_COLOR,
} from '@engine/utils/constants'
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { Vector3 } from 'three'
import { checkIsPlayerInside } from '@engine/utils/checkIsPlayerInside'
import { AppContext } from '@context/AppContext'

const tileTypes: ITileTypes = {
    5: brickWall1,
    6: castleWall1,
}

export const TileWall = React.memo(
    ({
        x,
        y,
        z,
        type,
        isPatternChanging,
        setInsideCb,
        setOutsideCb,
        playerPos: _playerPos,
    }: ITileWallProps) => {
        const texture = useTexture(tileTypes[type])
        const calculatedZ =
            z === 1 ? TILE_WALL_Z_HEIGHT : z - 1 + TILE_WALL_Z_HEIGHT

        const playerPos = useMemo(() => {
            if (!_playerPos?.x) {
                return
            }

            return new Vector3(_playerPos?.x, _playerPos?.y, _playerPos?.z)
        }, [_playerPos])

        const checkDistanceToPlayer = useCallback(() => {
            if (playerPos && setInsideCb && setOutsideCb) {
                checkIsPlayerInside({
                    playerPos,
                    x,
                    z,
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
                    position={[x, calculatedZ, y]}
                    scale={[TILE_WALL_WIDTH, TILE_WALL_HEIGHT, TILE_WALL_WIDTH]}
                >
                    <spriteMaterial
                        map={texture}
                        color={TILE_STRONG_SHADOW_COLOR}
                    />
                </sprite>
            </>
        )
    }
)
