import React from "react"
import CheckOutlined from "@ant-design/icons/CheckOutlined"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import styled from "./Alert.module.css"

interface AlertProps {
    type: "success" | "error"
}

const Alert: React.FC<AlertProps> = ({type, children}) => {
    return (
        <div className={`${styled.alert} ${styled[type]}`}>
            <div className={styled.icon}>
                {type === "success" ? <CheckOutlined /> : <CloseOutlined />}
            </div>
            <div>{children}</div>
        </div>
    )
}

export default Alert