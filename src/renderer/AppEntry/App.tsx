import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Engine } from '../engine'
import { AppContextProvider } from '@context/AppContext'
import { Ui } from '../ui/Ui'
import styles from './App.module.scss'
import { useEffect, useState } from 'react'

function GameEngine() {
    const [legacyLights, setLegacyLights] = useState(true)

    const handleResetLegacyLights = () => {
        setLegacyLights(!legacyLights)
        console.log('legacy lights resetting')
    }

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
                handleResetLegacyLights()
            }
        }

        document.addEventListener('keyup', handleKeyUp)

        return () => document.removeEventListener('keyup', handleKeyUp)
    }, [])

    return (
        <div className={styles.appContainer}>
            <AppContextProvider>
                {/* @ts-ignore */}
                <Canvas
                    shadows
                    gl={{
                        useLegacyLights: legacyLights,
                    }}
                >
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
