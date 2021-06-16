import React from "react"
import styled from "./TypePayment.module.css"
import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled"

interface TypeDeliveryProps {
    name: string
    value: number | string
    title: string
    icon: string
    onChange: any
    checked: boolean
}

const TypeDelivery: React.FC<TypeDeliveryProps> = (
    {
        name,
        value,
        checked,
        title,
        icon,
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
                <div className={styled.image}>
                    <img src={icon} alt={title} />
                </div>
                <div className={styled.info}>
                    {title}
                </div>
            </div>
        </label>
    )
}

export default TypeDelivery