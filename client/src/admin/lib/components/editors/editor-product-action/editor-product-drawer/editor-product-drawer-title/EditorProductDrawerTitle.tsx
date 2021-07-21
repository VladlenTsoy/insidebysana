import React from "react"
import {Steps} from "antd"

const {Step} = Steps

interface EditorProductDrawerTitleProps {
    title: string
    current: number
}

const EditorProductDrawerTitle: React.FC<EditorProductDrawerTitleProps> = ({title, current}) => {
    return (
        <div className="drawer-product-title">
            <span className="title">{title}</span>
            <div className="steps">
                <Steps current={current} key="product-steps" size="small">
                    <Step title="Основное" key="basic" />
                    <Step title="Цвета" key="colors" />
                    <Step title="Обмеры" key="measurements" />
                </Steps>
            </div>
        </div>
    )
}

export default EditorProductDrawerTitle
