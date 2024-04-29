import { PropsWithChildren, useLayoutEffect, useMemo, useState } from 'react'
import { AppContext } from './AppContext'
import { Vector3 } from 'three'
import { LIGHT_MAP } from '@assets/locations'

export const AppContextProvider = ({ children }: PropsWithChildren) => {
    const [clickPos, setClickPos] = useState<Vector3>()
    const [playerPos, setPlayerPos] = useState<Vector3>()
    const [lightMap, setLightMap] = useState<Vector3[]>(LIGHT_MAP)
    // const [worldSeed, setWorldSeed] = useState<number>()

    // useLayoutEffect(() => {
    //     if (!worldSeed) {
    //         setWorldSeed(new Date().getUTCMinutes())
    //     }
    // }, [worldSeed])

    const value = useMemo(() => {
        return {
            playerPos,
            clickPos,
            lightMap,
            setClickPos,
            setPlayerPos,
        }
    }, [clickPos])

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
