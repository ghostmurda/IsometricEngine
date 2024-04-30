import { ActionBarModule } from './modules'
import styles from './Ui.styles.module.scss'

export const Ui = () => {
    return (
        <div className={styles.uiWrapper}>
            <ActionBarModule />
        </div>
    )
}
