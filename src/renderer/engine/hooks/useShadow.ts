import { AppContext } from '@context/AppContext'
import { calc3dObjLightIntc, calculateShadowColor } from '@engine/utils/shadow'
import { useContext, useMemo } from 'react'
import { Vector3 } from 'three'

interface Props {
    pos?: Vector3
    is3dObjIntencity?: boolean
    log?: boolean
}

export const useShadow = ({ pos, is3dObjIntencity, log }: Props) => {
    const { currentLightMap: _lightMap } = useContext(AppContext)
    const lightMap = useMemo(() => {
        log && console.log('lightMap', _lightMap)

        return _lightMap
    }, [_lightMap])

    const shadow = useMemo(() => {
        log && console.log('shadow calculating')
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
    }, [pos])

    return { shadow }
}
