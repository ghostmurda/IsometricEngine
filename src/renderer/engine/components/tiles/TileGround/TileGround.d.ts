/* eslint-disable no-unused-vars */
import { TShadowColor } from '@engine/utils/shadow'
import { Vector3 } from 'three'

export interface ITileGroundProps {
    pos: Vector3
    type: number
    shadowColor: TShadowColor
    onClickCallback: (newPos: Vector3) => void
}

export interface ITileTypes {
    [key: number]: string
}
