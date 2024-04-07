import { Vector3 } from 'three'

export interface ITileWallProps {
    x: number
    y: number
    z: number
    type: number
    setInsideCb: () => void
    setOutsideCb: () => void
    isPatternChanging?: boolean
}

export interface ITileTypes {
    [key: number]: string
}
