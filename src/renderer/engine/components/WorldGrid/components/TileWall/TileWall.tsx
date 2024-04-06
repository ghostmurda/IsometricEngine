/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei'
import { ITileWallProps, ITileTypes } from './TileWall.d'
import brickWall1 from '@assets/tiles/walls/brickWall1.png'
import castleWall1 from '@assets/tiles/walls/castleWall1.png'
import {
    TILE_WALL_HEIGHT,
    TILE_WALL_WIDTH,
    TILE_WALL_Z_HEIGHT,
} from '@utils/constants'
import { useCallback, useEffect, useMemo } from 'react'
import { Vector3 } from 'three'
import { checkIsPlayerInside } from '@utils/checkIsPlayerInside'

const tileTypes: ITileTypes = {
    5: brickWall1,
    6: castleWall1,
}

export const TileWall = ({
    x,
    y,
    z,
    type,
    playerPos: _playerPos,
    isPatternChanging,
    setInsideCb,
    setOutsideCb,
}: ITileWallProps) => {
    const texture = useTexture(tileTypes[type])
    const calculatedZ =
        z === 1 ? TILE_WALL_Z_HEIGHT : z - 1 + TILE_WALL_Z_HEIGHT

    const playerPos = useMemo(() => {
        if (!_playerPos?.x) {
            return
        }

        return new Vector3(_playerPos?.x, _playerPos?.y, _playerPos?.z)
    }, [_playerPos?.x, _playerPos?.y, _playerPos?.z])

    const checkDistanceToPlayer = useCallback(() => {
        checkIsPlayerInside({
            playerPos,
            x,
            z,
            isPatternChanging,
            setInsideCb,
            setOutsideCb,
        })
    }, [playerPos])

    useEffect(() => {
        if (playerPos) {
            checkDistanceToPlayer()
        }
    }, [playerPos])

    return (
        <>
            <mesh position={[x, z, y]} visible={false}>
                <boxGeometry args={[1, 1, 1]} />
            </mesh>
            <sprite
                position={[x, calculatedZ, y]}
                scale={[TILE_WALL_WIDTH, TILE_WALL_HEIGHT, TILE_WALL_WIDTH]}
            >
                <spriteMaterial map={texture} />
            </sprite>
        </>
    )
}
