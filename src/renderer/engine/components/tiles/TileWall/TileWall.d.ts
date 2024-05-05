import { TShadowColor } from '@engine/utils/shadow'
import { Vector3 } from 'three'

export interface ITileWallProps {
    pos: Vector3
    type: number
    shadowColor?: TShadowColor
}

export interface ITileTypes {
    [key: number]: string
}
