import { AppContext } from '@context/AppContext'
import { calc3dObjLightIntc, calculateShadowColor } from '@engine/utils/shadow'
import { useContext } from 'react'
import { Vector3 } from 'three'

interface Props {
    pos?: Vector3
    is3dObjIntencity?: boolean
}

export const useShadow = ({ pos, is3dObjIntencity }: Props) => {
    const { lightMap } = useContext(AppContext)

    const shadow = (() => {
        if (!lightMap || !lightMap.length || !pos) {
            return
        }

        const posTransformedToTiles = new Vector3(pos.x, pos.z, pos.y)

        const shadowColor = calculateShadowColor(
            posTransformedToTiles,
            lightMap
        )

        if (!is3dObjIntencity) {
            return shadowColor
        }

        return calc3dObjLightIntc(shadowColor)
    })()

    return { shadow }
}
