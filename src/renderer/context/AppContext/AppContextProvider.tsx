import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import { AppContext } from './AppContext'
import { Vector3 } from 'three'

export const AppContextProvider = ({ children }: PropsWithChildren) => {
    const [clickPos, setClickPos] = useState<Vector3>()
    const [playerPos, setPlayerPos] = useState<Vector3>(new Vector3(0, 1, 0))
    const [currentLightMap, setCurrentLightMap] = useState()
    const playerPosRef = useRef(playerPos)

    useEffect(() => {
        playerPosRef.current = playerPos
    }, [playerPos])

    const value = useMemo(() => {
        return {
            playerPos,
            playerPosRef,
            clickPos,
            currentLightMap,
            setClickPos,
            setPlayerPos,
            setCurrentLightMap,
        }
    }, [clickPos])

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
