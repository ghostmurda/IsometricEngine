import { Player } from '@engine/components/Player'
import { PatternGrid, TerrainGrid } from '@engine/components/WorldGrid'
import { TerrainChunk, TreesChunk } from '@engine/components/generation'
import { useContext } from 'react'
import { Vector3 } from 'three'
import { AppContext } from '../context/AppContext/AppContext'

export const Engine = () => {
    //@ts-ignore
    const { setClickPos } = useContext(AppContext)

    const handleClickPos = (_newPos: Vector3) => {
        const newPos = new Vector3(
            +_newPos.x.toFixed(10),
            +_newPos.y.toFixed(10),
            +_newPos.z.toFixed(10)
        )
        setClickPos(newPos)
    }

    return (
        <>
            <Player />
            <PatternGrid handleClickPosition={handleClickPos} />
            <TerrainGrid handleClickPosition={handleClickPos} />
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
            <TreesChunk count={50} />
            <directionalLight
                // castShadow
                // position={new Vector3(0, 10, 0)}
                intensity={0.1}
            />
            {/* <fogExp2 attach="fog" color="black" density={0.03} /> */}
        </>
    )
}
