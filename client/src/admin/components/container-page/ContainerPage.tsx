import React from "react"
import styles from "./ContainerPage.module.less"

const ContainerPage: React.FC = ({children}) => {
    return (
        <div className={styles.containerPage}>
            <div className={styles.content}>{children}</div>
        </div>
    )
}
export default ContainerPage
