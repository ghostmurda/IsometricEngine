/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei'
import { ITileWallProps, ITileTypes } from './TileWall.d'
import brickWall1 from '@assets/tiles/walls/brickWall1.png'
import castleWall1 from '@assets/tiles/walls/castleWall1.png'
import dirtWall1 from '@assets/tiles/walls/dirtWall1.png'
import {
    TILE_WALL_HEIGHT,
    TILE_WALL_WIDTH,
    TILE_WALL_Z_HEIGHT,
} from '@engine/utils/constants'
import React from 'react'
import { Vector3 } from 'three'

const tileTypes: ITileTypes = {
    5: brickWall1,
    6: castleWall1,
    7: dirtWall1,
}

export const TileWall = React.memo(
    ({ pos, type, shadowColor }: ITileWallProps) => {
        const texture = useTexture(tileTypes[type])
        const calculatedZ =
            pos.z === 1 ? TILE_WALL_Z_HEIGHT : pos.z - 1 + TILE_WALL_Z_HEIGHT
        const position = new Vector3(pos.x, calculatedZ, pos.y)

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
                    <spriteMaterial map={texture.clone()} color={shadowColor} />
                </sprite>
            </>
        )
    }
)
