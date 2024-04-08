import { useTexture } from '@react-three/drei'
import { TextureLoader, Vector3 } from 'three'
import shadowTexture from '@assets/textures/shadow.png'
import { memo } from 'react'
import { useLoader } from '@react-three/fiber'

interface IShadowSpriteProps {
    x: number
    y: number
    z: number
    scale?: Vector3
}

export const ShadowSprite = ({ x, y, z, scale }: IShadowSpriteProps) => {
    const texture = useLoader(TextureLoader, shadowTexture)
    const pos = new Vector3(x + 0.1, y, z + 0.1)
        .normalize()
        .multiply(new Vector3(0, 1, 0))

    return (
        <mesh position={pos} scale={scale || [2, 1, 2]}>
            <sprite>
                <spriteMaterial map={texture.clone()} />
            </sprite>
        </mesh>
    )
}
