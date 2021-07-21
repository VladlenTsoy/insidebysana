import React, {useState} from "react"
import styled from "./TypesDelivery.module.css"
import TypeDelivery from "./TypeDelivery"
import {Delivery} from "types/Delivery"
import {formatPrice} from "utils/formatPrice"

interface TypesDeliveryProps {
    name: string
    defaultChecked?: number
    onChange?: any
    types: Delivery[]
}

const TypesDelivery: React.FC<TypesDeliveryProps> = ({name, defaultChecked, onChange, types}) => {
    const [checkedValue, setCheckedValue] = useState(defaultChecked || null)

    const onChangeHandler = (e: any) => {
        onChange(e.currentTarget.value)
        setCheckedValue(Number(e.currentTarget.value))
    }

    const _types = types.reduce<any>((result, value) => {
        const k: string = value.city || "other"
        ;(result[k] || (result[k] = [])).push(value)
        return result
    }, {})

    return (
        <div className={styled.types}>
            {Object.entries(_types).map(([city, types]: any) => [
                <div className={styled.city} key={city}>
                    {city === "tashkent" ? "по Ташкенту" : "Остальные"}
                </div>,
                types.map((type: any) => (
                    <TypeDelivery
                        key={type.id}
                        name={name}
                        value={type.id}
                        title={type.title}
                        subTitle={type.description}
                        price={type.price ? `${formatPrice(type.price)} сум` : "Бесплатно"}
                        onChange={onChangeHandler}
                        checked={checkedValue === type.id}
                    />
                ))
            ])}
        </div>
    )
}

export default TypesDelivery
