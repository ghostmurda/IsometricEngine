import { useTexture } from '@react-three/drei'
import THREE, { Vector3 } from 'three'
import { ThreeEvent } from '@react-three/fiber'
//import grassTexture from '../../../../../../../assets/textures/grass1.png'

const GRID_SIZE = 20

interface IPlaneGroundProps {
    handleClickPosition: (newPos: Vector3) => void
}

export const PlaneGround = ({ handleClickPosition }: IPlaneGroundProps) => {
    //const texturePlane = useTexture(grassTexture)
    // texturePlane?.wrapS = 12
    // texturePlane?.wrapT = 12
    //texturePlane.repeat.set(12, 12)

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        handleClickPosition(e.point)
    }

    return (
        <mesh
            rotation-x={Math.PI * -0.5}
            onClick={(e) => handleClick(e)}
            receiveShadow
            castShadow
        >
            <planeBufferGeometry args={[GRID_SIZE * 4, GRID_SIZE * 4]} />

            {/* <meshStandardMaterial map={texturePlane} /> */}
        </mesh>
    )
}
