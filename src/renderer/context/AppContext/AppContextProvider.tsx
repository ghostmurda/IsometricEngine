import { PropsWithChildren, useLayoutEffect, useMemo, useState } from 'react'
import { AppContext } from './AppContext'
import { Vector3 } from 'three'

export const AppContextProvider = ({ children }: PropsWithChildren) => {
    const [clickPos, setClickPos] = useState<Vector3>()
    const [playerPos, setPlayerPos] = useState<Vector3>()
    const [worldSeed, setWorldSeed] = useState<number>()

    useLayoutEffect(() => {
        if (!worldSeed) {
            setWorldSeed(new Date().getUTCMinutes())
        }
    }, [worldSeed])

    const value = useMemo(() => {
        return {
            playerPos,
            clickPos,
            worldSeed,
            setClickPos,
            setPlayerPos,
            setWorldSeed,
        }
    }, [clickPos, playerPos, worldSeed])

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
