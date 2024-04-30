import { memo } from 'react'
import { Vector3 } from 'three'

interface ILightPointProps {
    pos: Vector3
}

export const LightPoint = memo(({ pos }: ILightPointProps) => {
    return (
        <mesh position={[pos.x, pos.z, pos.y]} visible={true}>
            <boxGeometry args={[1, 1, 1]} />
        </mesh>
    )
})
