import { useContext } from 'react'
import styles from './ActionBar.module.scss'
import { AppContext } from '@context/AppContext'

export const ActionBarModule = () => {
    const { playerPos } = useContext(AppContext)

    const getLocationAction = () => {
        console.log(
            `Player position (x,y,z) = ${playerPos?.x}, ${playerPos?.y},
            ${playerPos?.z}`
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.button} onClick={getLocationAction}>
                Player pos
            </div>
        </div>
    )
}
