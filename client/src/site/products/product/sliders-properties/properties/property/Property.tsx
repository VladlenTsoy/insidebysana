import React, {useState} from "react"
import styled from "../Properties.module.css"
import {ProductColor} from "types/productColor"
import PlusOutlined from "@ant-design/icons/PlusOutlined"
import MinusOutlined from "@ant-design/icons/MinusOutlined"

interface PropertyProps {
    property: ProductColor["properties"][0]
}

const Property: React.FC<PropertyProps> = ({property}) => {
    const [visible, setVisible] = useState(false)

    const onClickHandler = () => {
        setVisible(prevState => !prevState)
    }

    return (
        <div className={styled.property}>
            <div className={styled.titleCollapse} onClick={onClickHandler}>
                <div className={styled.title}>{property.title}</div>
                <div className={styled.icon}>{visible ? <MinusOutlined/> : <PlusOutlined/>}</div>
            </div>
            <div className={`${styled.collapse} ${visible ? styled.open : styled.close}`}>
                <div className={styled.description}>
                    {property.description}
                </div>
            </div>
        </div>
    )
}

export default Property