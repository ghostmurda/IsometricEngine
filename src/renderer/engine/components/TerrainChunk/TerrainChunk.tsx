import { useLayoutEffect, useRef } from 'react'
import { BufferAttribute, PlaneGeometry, Vector3 } from 'three'
import { createNoise2D } from 'simplex-noise'
import alea from 'alea'
import { ThreeEvent } from '@react-three/fiber'
import generateTerrain from '../../utils/generateTerrain'

interface ITerrainChunkProps {
    seed: number | string
    size: number
    height: number
    levels: number
    scale: number
    offset?: { x: number; z: number }
    handleClickPosition: (newPos: Vector3) => void
}

export const TerrainChunk = ({
    seed,
    size = 50,
    height,
    levels = 8,
    scale = 1,
    offset = { x: 0, z: 0 },
    handleClickPosition,
}: ITerrainChunkProps) => {
    const simplex = createNoise2D(alea(seed))
    const ref = useRef<PlaneGeometry>(null)
    //const texturePlane = useLoader(TextureLoader, grassTexture)
    // texturePlane.wrapS = 8 as Wrapping
    // texturePlane.wrapT = 8 as Wrapping
    //texturePlane.repeat.set(16, 16)

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

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        handleClickPosition(e.point)
    }

    return (
        <mesh
            scale={[size, 5, size]}
            onClick={(e) => handleClick(e)}
            receiveShadow
            castShadow
        >
            <planeGeometry
                attach="geometry"
                args={[size, size, size - 1, size - 1]}
                ref={ref}
            />
            {/* <meshLambertMaterial
                map={texturePlane}
                opacity={1}
                lightMapIntensity={1}
            /> */}
        </mesh>
    )
}
