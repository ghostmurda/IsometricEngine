import React from 'react'
import { Vector3 } from 'three'

interface ILightPointProps {
    pos: Vector3
}

export const LightPoint = React.memo(({ pos }: ILightPointProps) => {
    return (
        <mesh position={pos}>
            <boxGeometry args={[1, 1, 1]} />
        </mesh>
    )
})
