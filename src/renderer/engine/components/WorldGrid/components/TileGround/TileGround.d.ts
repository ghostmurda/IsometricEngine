/* eslint-disable no-unused-vars */
import { Vector3 } from 'three'

export interface ITileGroundProps {
    x: number
    y: number
    z: number
    type: number
    onClickCallback: (newPos: Vector3) => void
    setInsideCb: () => void
    setOutsideCb: () => void
    isPatternChanging?: boolean
}

export interface ITileTypes {
    [key: number]: string
}
