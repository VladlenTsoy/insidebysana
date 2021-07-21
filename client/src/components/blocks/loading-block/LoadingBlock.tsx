import React from "react"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import Spin from "antd/es/spin"
import "./LoadingBlock.less"

interface LoadingBlockProps {
    title?: string | null
    maxHeight?: string
}

const LoadingBlock: React.FC<LoadingBlockProps> = ({title, maxHeight = "100%"}) => {
    return (
        <div className="loading-block" style={{maxHeight, padding: title === null ? "0" : "2rem"}}>
            <div className="loading-block-container">
                <Spin indicator={<LoadingOutlined style={{marginBottom: title === null ? "0" : "1rem"}} />} />
                {title === null ? <></> : <p>{title || `Загрузка...`}</p>}
            </div>
        </div>
    )
}

export default React.memo(LoadingBlock)
