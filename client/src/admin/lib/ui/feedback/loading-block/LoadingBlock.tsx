import React from "react"
import {LoadingOutlined} from "@ant-design/icons"
import {Spin} from "antd"
import styles from "./LoadingBlock.module.less"

interface LoadingBlockProps {
    title?: string | null
    maxHeight?: string
}

const LoadingBlock: React.FC<LoadingBlockProps> = (
    {
        title,
        maxHeight = "100%"
    }
) => {
    return (
        <div
            className={styles.container}
            style={{maxHeight, padding: title === null ? "0" : "2rem"}}
        >
            <div className={styles.loading}>
                <Spin indicator={<LoadingOutlined style={{marginBottom: title === null ? "0" : "1rem"}} />} />
                {title !== null && <p>{title || `Загрузка...`}</p>}
            </div>
        </div>
    )
}

export default React.memo(LoadingBlock)
