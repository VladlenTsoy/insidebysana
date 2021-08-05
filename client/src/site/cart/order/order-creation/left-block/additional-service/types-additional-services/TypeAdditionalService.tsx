import {CheckCircleFilled} from "@ant-design/icons"
import React from "react"
import {formatPrice} from "utils/formatPrice"
import styled from "./TypeAdditionalService.module.css"

interface TypeAdditionalServiceProps {
    name: string
    value: number | string
    title: string
    icon: string | null
    price: number
    onChange: any
    checked: boolean
}

const TypeAdditionalService: React.FC<TypeAdditionalServiceProps> = ({
    name,
    value,
    checked,
    onChange,
    icon,
    title,
    price
}) => {
    return (
        <label className={styled.type}>
            <input type="radio" name={name} value={value} onChange={onChange} checked={checked} />
            <div className={styled.content}>
                <div className={styled.check}>
                    {checked ? <CheckCircleFilled /> : <div className={styled.emptyIcon} />}
                </div>
                <div className={styled.image}>{icon && <img src={icon} alt={title} />}</div>
                <div className={styled.info}>{title}</div>
                <div className={styled.price}>{price ? `${formatPrice(price)} сум` : "Бесплатно"}</div>
            </div>
        </label>
    )
}
export default TypeAdditionalService
