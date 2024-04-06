import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { useState } from 'react'
import { Vector3 } from 'three'
import { Player, WorldGrid } from './engine'
import { TerrainChunk } from './engine/components/generation'

function GameEngine() {
    const [currentClickPoint, setCurrentClickPoint] = useState<Vector3>()

    const handleClickPosition = (_newPos: Vector3) => {
        const newPos = new Vector3(
            +_newPos.x.toFixed(10),
            +_newPos.y.toFixed(10),
            +_newPos.z.toFixed(10)
        )
        setCurrentClickPoint(newPos)
    }

    const worldSeed = new Date().getUTCMinutes()

    return (
        <Canvas shadows>
            <Player currentClickPoint={currentClickPoint} />
            <WorldGrid handleClickPosition={handleClickPosition} />
            <TerrainChunk
                seed={worldSeed}
                size={50}
                height={0.2}
                levels={8}
                scale={1}
                handleClickPosition={handleClickPosition}
            />
            <directionalLight
                castShadow
                position={new Vector3(0, 10, 0)}
                intensity={0.8}
            />
            <fogExp2 attach="fog" color="black" density={0.02} />
            <Stats />
        </Canvas>
    )
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GameEngine />} />
            </Routes>
        </Router>
    )
}
