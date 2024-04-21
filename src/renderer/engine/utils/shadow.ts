import { Vector3 } from 'three'
import {
    TILE_MEDIUM_SHADOW_COLOR,
    TILE_STRONG_SHADOW_COLOR,
    TILE_WEAK_SHADOW_COLOR,
} from './constants'

export const checkShadowColor = (pos: Vector3, lightPos: Vector3) => {
    const distance = +pos.distanceTo(lightPos).toFixed(1)

    if (distance < 7) {
        return
    }
    if (distance < 10) {
        return TILE_WEAK_SHADOW_COLOR
    }
    if (distance < 13) {
        return TILE_MEDIUM_SHADOW_COLOR
    }

    return TILE_STRONG_SHADOW_COLOR
}
