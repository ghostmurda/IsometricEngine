import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Engine } from '../engine'
import { AppContextProvider } from '@context/AppContext'
import { Ui } from '../ui/Ui'
import styles from './App.module.scss'

function GameEngine() {
    return (
        <div className={styles.appContainer}>
            <AppContextProvider>
                {/* @ts-ignore */}
                <Canvas shadows>
                    <Engine />
                    <Stats />
                </Canvas>
                <Ui />
            </AppContextProvider>
        </div>
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
