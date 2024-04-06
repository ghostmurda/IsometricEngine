import { useLayoutEffect, useRef } from 'react'
import { BufferAttribute, PlaneGeometry, TextureLoader, Wrapping } from 'three'
import { createNoise2D } from 'simplex-noise'
import alea from 'alea'
import { useLoader } from '@react-three/fiber'
import generateTerrain from './utils/generateTerrain'
import grassTexture from '../../../../../assets/textures/grass1.png'

interface ITerrainChunkProps {
    seed: number | string
    size: number
    height: number
    levels: number
    scale: number
    offset?: { x: number; z: number }
}

export const TerrainChunk = ({
    seed,
    size,
    height,
    levels = 8,
    scale = 1,
    offset = { x: 0, z: 0 },
}: ITerrainChunkProps) => {
    const simplex = createNoise2D(alea(seed))
    const ref = useRef<PlaneGeometry>(null)
    const texturePlane = useLoader(TextureLoader, grassTexture)
    texturePlane.wrapS = 8 as Wrapping
    texturePlane.wrapT = 8 as Wrapping
    texturePlane.repeat.set(8, 8)

    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.setAttribute(
                'position',
                new BufferAttribute(
                    generateTerrain(
                        simplex,
                        size,
                        height,
                        levels,
                        scale,
                        offset
                    ),
                    3
                )
            )
            // ref.current.elementsNeedUpdate = true;
            ref.current.computeVertexNormals()
        }
    }, [size, height, levels, scale, offset, simplex])

    return (
        <mesh scale={[20, 5, 20]} receiveShadow castShadow>
            <planeGeometry
                attach="geometry"
                args={[size, size, size - 1, size - 1]}
                ref={ref}
            />
            <meshStandardMaterial attach="material" map={texturePlane} />
        </mesh>
    )
}
