import React from "react"
import styled from "./EmptyBlock.module.css"

interface EmptyBlockProps {
    action?: any
}

const EmptyBlock: React.FC<EmptyBlockProps> = ({action}) => {
    return (
        <div className={styled.emptyBlock}>
            <div className={styled.title}>ПУСТО</div>
            {action && <div className={styled.action}>{action}</div>}
        </div>
    )
}

export default EmptyBlock
