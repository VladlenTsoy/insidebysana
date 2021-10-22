import React from "react"
import styles from "./ContainerPage.module.less"
import cn from "classnames"

interface ContainerPageProps {
    full?: boolean;
}

const ContainerPage: React.FC<ContainerPageProps> = ({children, full}) => {
    return (
        <div className={styles.containerPage}>
            <div className={cn(styles.content, {[styles.full]: full})}>{children}</div>
        </div>
    )
}
export default ContainerPage
