import { ActionBarModule } from './modules'
import styles from './UiMain.styles.module.scss'

export const UiMain = () => {
    return (
        <div className={styles.uiWrapper}>
            <ActionBarModule />
        </div>
    )
}
