import { Vector3 } from 'three'

export interface ITileWallProps {
    pos: Vector3
    type: number
    lightMap?: Vector3[]
    playerPosRef?: React.MutableRefObject<Vector3>
}

export interface ITileTypes {
    [key: number]: string
}
