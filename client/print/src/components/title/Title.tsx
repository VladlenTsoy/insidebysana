import React from "react"
import styled from "./Title.module.css"

interface TitleProps {
    level: number
}

const Title: React.FC<TitleProps> = ({children, level}) => {
    return (
        <div className={styled.title}>
            {level === 1 && <h1 className={styled.h}>{children}</h1>}
            {level === 2 && <h2 className={styled.h}>{children}</h2>}
            {level === 3 && <h3 className={styled.h}>{children}</h3>}
        </div>
    )
}

export default Title