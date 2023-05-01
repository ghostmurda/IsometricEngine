/* eslint-disable react/no-unknown-property */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
// import icon from '../../assets/icon.svg'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { CameraIsometric, WorldGrid } from './engine'

function GameEngine() {
    return (
        <Canvas>
            <ambientLight />
            <WorldGrid />
            <CameraIsometric />
            {/* <mesh position={[0, 1, 0]}>
                <boxBufferGeometry args={[1, 1, 1]} />
                <meshNormalMaterial />
            </mesh> */}
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
