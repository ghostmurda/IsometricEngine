import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Engine } from './Engine'
import { AppContextProvider } from '@context/AppContext'

function GameEngine() {
    return (
        <Canvas shadows>
            <AppContextProvider>
                <Engine />
            </AppContextProvider>
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
