/* eslint-disable no-unused-vars */
import { Vector3 } from 'three'

export interface ITileGroundProps {
    pos: Vector3
    type: number
    onClickCallback: (newPos: Vector3) => void
    setInsideCb?: () => void
    setOutsideCb?: () => void
    isPatternChanging?: boolean
    playerPos?: Vector3
    lightPos?: Vector3
}

export interface ITileTypes {
    [key: number]: string
}
