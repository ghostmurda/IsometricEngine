import { Vector3 } from 'three'
import {
    TILE_MEDIUM_SHADOW_COLOR,
    TILE_STRONG_SHADOW_COLOR,
    TILE_WEAK_SHADOW_COLOR,
} from './constants'

export const calculateShadowColor = (
    pos: Vector3,
    lightMap: Vector3[],
    _intencity?: number
) => {
    const intencity = _intencity ?? 15
    let distance: number | undefined

    const lightPos = lightMap.filter((point) => {
        if (distance) {
            return false
        }

        const _distance = +pos.distanceTo(point).toFixed(1)

        if (_distance < intencity) {
            distance = _distance
            return true
        }
        return false
    })?.[0]

    if (lightPos && distance) {
        if (distance < intencity - (intencity / 3) * 2) {
            return
        }
        if (distance < intencity - intencity / 3) {
            return TILE_WEAK_SHADOW_COLOR
        }
        if (distance < intencity) {
            return TILE_MEDIUM_SHADOW_COLOR
        }
    }

    return TILE_STRONG_SHADOW_COLOR
}
