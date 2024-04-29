import { PatternGrid, TerrainGrid } from '@engine/components/WorldGrid'
import { TreesChunk } from '@engine/components/generation'
import { useContext, useMemo } from 'react'
import { Vector3 } from 'three'
import { AppContext } from '../context/AppContext/AppContext'
import { Player, StaticLightMap } from '../engine'

export const Engine = () => {
    const { lightMap, setClickPos } = useContext(AppContext)

    const handleClickPos = useMemo(
        () => (_newPos: Vector3) => {
            const newPos = new Vector3(
                +_newPos.x.toFixed(10),
                +_newPos.y.toFixed(10),
                +_newPos.z.toFixed(10)
            )
            setClickPos?.(newPos)
        },
        []
    )

    return (
        <>
            <Player />
            <PatternGrid
                lightMap={lightMap}
                handleClickPosition={handleClickPos}
            />
            <TerrainGrid
                lightMap={lightMap}
                handleClickPosition={handleClickPos}
            />
            {/* {worldSeed && (
                <TerrainChunk
                    seed={worldSeed}
                    size={50}
                    height={0.6}
                    levels={12}
                    scale={1}
                    handleClickPosition={handleClickPos}
                />
            )} */}
            <TreesChunk lightMap={lightMap} count={50} />
            <directionalLight
                // castShadow
                // position={new Vector3(0, 10, 0)}
                intensity={0.1}
            />
            {!!lightMap?.length && <StaticLightMap lightMap={lightMap} />}
            {/* <fogExp2 attach="fog" color="black" density={0.03} /> */}
        </>
    )
}
