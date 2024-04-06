import { useFBX } from '@react-three/drei'
import treeModel from '../../../../../assets/models/tree1/source/tree3.fbx'

interface ITreeProps {
    x: number
    y: number
    z: number
}

export const Tree = ({ x, y, z }: ITreeProps) => {
    const tree3dObj = useFBX(treeModel)

    return (
        <mesh
            scale={[0.005, 0.005, 0.005]}
            position={[x, y, z]}
            receiveShadow
            castShadow
        >
            <primitive object={tree3dObj} />
        </mesh>
    )
}
