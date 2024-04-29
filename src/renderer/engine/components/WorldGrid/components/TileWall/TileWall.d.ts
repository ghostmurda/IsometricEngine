import { Vector3 } from 'three'

export interface ITileWallProps {
    pos: Vector3
    type: number
    setInsideCb?: () => void
    setOutsideCb?: () => void
    isPatternChanging?: boolean
    playerPos?: Vector3
    lightMap?: Vector3[]
}

export interface ITileTypes {
    [key: number]: string
}
