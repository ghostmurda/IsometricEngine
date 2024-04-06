import { Vector3 } from 'three'
import { ThreeEvent } from '@react-three/fiber'

const GRID_SIZE = 20

interface IPlaneGroundProps {
    handleClickPosition: (newPos: Vector3) => void
}

export const PlaneGround = ({ handleClickPosition }: IPlaneGroundProps) => {
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
        </mesh>
    )
}
