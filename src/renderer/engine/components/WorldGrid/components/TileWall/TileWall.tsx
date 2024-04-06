/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei'
import { ITileWallProps, ITileTypes } from './TileWall.d'
import brickWall1 from '../../../../../../../assets/tiles/walls/brickWall1.png'

const tileTypes: ITileTypes = {
    5: brickWall1,
}

const TILE_WIDTH = 1.4
const TILE_HEIGHT = 1.24
const TILE_Z_HEIGHT = 0.73

export const TileWall = ({ x, y, z, type }: ITileWallProps) => {
    const texture = useTexture(tileTypes[type])
    const calculatedZ = z === 1 ? TILE_Z_HEIGHT : z - 1 + TILE_Z_HEIGHT
    // const calculatedZ = (() => {
    //     if (z === 1) {
    //         return z * TILE_Z_HEIGHT
    //     }

    //     if (z === 2) {
    //         return z * TILE_Z_HEIGHT + 0.28
    //     }

    //     return z * TILE_Z_HEIGHT + (0.5 * z - 2.18)
    // })()
    // const calculatedZ = z === 1 ? z * TILE_Z_HEIGHT : z * TILE_Z_HEIGHT + 0.28

    return (
        <>
            <mesh position={[x, z, y]} visible={false}>
                <boxGeometry args={[1, 1, 1]} />
            </mesh>
            <sprite
                position={[x, calculatedZ, y]}
                scale={[TILE_WIDTH, TILE_HEIGHT, TILE_WIDTH]}
            >
                <spriteMaterial map={texture} />
            </sprite>
        </>
    )
}
