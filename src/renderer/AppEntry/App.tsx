import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Engine } from './Engine'
import { AppContextProvider } from '@context/AppContext'
import { UiMain } from '../ui/UiMain'
import styles from './App.module.scss'

function GameEngine() {
    return (
        <div className={styles.appContainer}>
            <AppContextProvider>
                <Canvas shadows>
                    <Engine />
                    <Stats />
                </Canvas>
                <UiMain />
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
