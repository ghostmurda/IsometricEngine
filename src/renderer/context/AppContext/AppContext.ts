import { createContext } from 'react'
import { Vector3 } from 'three'
import constants from '../../globalConstants.json'

export type TAppContextProps = {
    playerPos?: Vector3
    clickPos?: Vector3
    worldSeed?: number
    setClickPos?: React.Dispatch<React.SetStateAction<Vector3 | undefined>>
    setPlayerPos?: React.Dispatch<React.SetStateAction<Vector3 | undefined>>
    setWorldSeed?: React.Dispatch<React.SetStateAction<number | undefined>>
} | null

export const AppContext = createContext<TAppContextProps>({
    playerPos: new Vector3(
        constants.spawnPos.x,
        constants.spawnPos.y,
        constants.spawnPos.z
    ),
    worldSeed: new Date().getUTCMinutes(),
})
