import { useFBX, useTexture } from '@react-three/drei'
import treeModel from '@assets/models/tree1/source/tree3.fbx'
import { ShadowSprite } from '../ShadowSprite'
import { Vector3 } from 'three'
import threeTexture from '@assets/models/tree2/textures/albedo.png'

interface ITreeProps {
    x: number
    y: number
    z: number
}

export const Tree = ({ x, y, z }: ITreeProps) => {
    const tree3dObj = useFBX(treeModel)
    const texture = useTexture(threeTexture)

    return (
        <mesh
            scale={[0.005, 0.005, 0.005]}
            position={[x, y, z]}
            receiveShadow
            castShadow
        >
            <primitive object={tree3dObj.clone()} />
            <meshLambertMaterial
                opacity={1}
                lightMapIntensity={1}
                map={texture.clone()}
            />
            <ShadowSprite x={x} y={y} z={z} scale={new Vector3(4, 2, 4)} />
        </mesh>
    )
}
