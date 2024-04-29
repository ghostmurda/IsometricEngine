import { memo } from 'react'
import { Vector3 } from 'three'
import { LightPoint } from '../LightPoint'

interface IStaticLightMapProps {
    lightMap: Vector3[]
}

export const StaticLightMap = memo(({ lightMap }: IStaticLightMapProps) => {
    const renderLighMap = lightMap.map((lightPos, i) => (
        <LightPoint key={i} pos={lightPos} />
    ))

    return <>{renderLighMap}</>
})
