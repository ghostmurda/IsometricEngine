import { Player } from '@engine/components/Player'
import { WorldGrid } from '@engine/components/WorldGrid'
import { TerrainChunk, TreesChunk } from '@engine/components/generation'
import { useContext } from 'react'
import { Vector3 } from 'three'
import { AppContext } from '../context/AppContext/AppContext'

export const Engine = () => {
    //@ts-ignore
    const { setClickPos, worldSeed } = useContext(AppContext)

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
            <WorldGrid handleClickPosition={handleClickPos} />
            {worldSeed && (
                <TerrainChunk
                    seed={worldSeed}
                    size={50}
                    height={0.2}
                    levels={8}
                    scale={1}
                    handleClickPosition={handleClickPos}
                />
            )}
            <TreesChunk />
            <directionalLight
                castShadow
                position={new Vector3(0, 10, 0)}
                intensity={1}
            />
            <fogExp2 attach="fog" color="black" density={0.01} />
        </>
    )
}
