/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei'
import { Vector3 } from 'three'
import { ITileGroundProps, ITileTypes } from './TileGround.d'
import grass0 from '../../../../../../../assets/tiles/ground/grass0.png'
import grass1 from '../../../../../../../assets/tiles/ground/grass1.png'
import brick0 from '../../../../../../../assets/tiles/ground/brick0.png'
import castle0 from '../../../../../../../assets/tiles/ground/castleGround0.png'

const tileTypes: ITileTypes = {
    0: grass0,
    1: grass1,
    2: brick0,
    3: castle0,
}

const TILE_WIDTH = 1.42
const TILE_HEIGHT = 0.82
const TILE_Z_HEIGHT = 0.5

export const TileGround = ({
    x,
    y,
    z,
    type,
    onClickCallback,
}: ITileGroundProps) => {
    const texture = useTexture(tileTypes[type])
    const calculatedZ = z === 1 ? TILE_Z_HEIGHT : z - 1 + TILE_Z_HEIGHT
    const position = new Vector3(x, calculatedZ, y)

    return (
        <sprite
            position={position}
            scale={[TILE_WIDTH, TILE_HEIGHT, TILE_WIDTH]}
            onClick={() => onClickCallback(position)}
        >
            <spriteMaterial map={texture} />
        </sprite>
    )
}
