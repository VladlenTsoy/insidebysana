import React from "react"
import styled from "./TypeDelivery.module.css"
import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled"

interface TypeDeliveryProps {
    name: string
    value: number | string
    title: string
    subTitle?: string
    price: string
    onChange: any
    checked: boolean
}

const TypeDelivery: React.FC<TypeDeliveryProps> = (
    {
        name,
        value,
        subTitle,
        checked,
        price,
        title,
        onChange
    }
) => {
    return (
        <label className={styled.type}>
            <input type="radio" name={name} value={value} onChange={onChange} checked={checked} />
            <div className={styled.content}>
                <div className={styled.check}>
                    {checked ? <CheckCircleFilled /> : <div className={styled.emptyIcon} />}
                </div>
                <div className={styled.info}>
                    <div className={styled.title}>{title}</div>
                    {subTitle && <div className={styled.description}>{subTitle}</div>}
                </div>
                <div className={styled.price}>
                    {price || "Бесплатно"}
                </div>
            </div>
        </label>
    )
}

export default TypeDelivery