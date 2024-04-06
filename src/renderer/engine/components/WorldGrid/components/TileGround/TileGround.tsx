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
} from '@utils/constants'
import { useCallback, useEffect, useMemo } from 'react'
import { checkIsPlayerInside } from '@utils/checkIsPlayerInside'

const tileTypes: ITileTypes = {
    0: grass0,
    1: grass1,
    2: brick0,
    3: castle0,
}

export const TileGround = ({
    x,
    y,
    z,
    type,
    playerPos: _playerPos,
    isPatternInside,
    onClickCallback,
    setInsideCb,
    setOutsideCb,
}: ITileGroundProps) => {
    const texture = useTexture(tileTypes[type])
    const calculatedZ =
        z === 1 ? TILE_GROUND_Z_HEIGHT : z - 1 + TILE_GROUND_Z_HEIGHT
    const position = new Vector3(x, calculatedZ, y)

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
            isPatternInside,
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
        <sprite
            position={position}
            scale={[TILE_GROUND_WIDTH, TILE_GROUND_HEIGHT, TILE_GROUND_WIDTH]}
            onClick={() => onClickCallback(position)}
        >
            <spriteMaterial map={texture} />
        </sprite>
    )
}
