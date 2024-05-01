import { createContext } from 'react'
import { Vector3 } from 'three'
import constants from '../../globalConstants.json'

export interface IAppContextProps {
    playerPos?: Vector3
    clickPos?: Vector3
    currentLightMap?: Vector3[]
    playerPosRef?: React.MutableRefObject<Vector3>
    setClickPos?: React.Dispatch<React.SetStateAction<Vector3 | undefined>>
    setPlayerPos?: React.Dispatch<React.SetStateAction<Vector3>>
    setCurrentLightMap?: React.Dispatch<React.SetStateAction<undefined>>
}

export const AppContext = createContext<IAppContextProps>({
    playerPos: new Vector3(
        constants.spawnPos.x,
        constants.spawnPos.y,
        constants.spawnPos.z
    ),
})
