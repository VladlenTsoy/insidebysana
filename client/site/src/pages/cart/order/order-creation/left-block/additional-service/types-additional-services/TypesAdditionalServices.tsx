import React, {useState} from "react"
import TypeAdditionalService from "./TypeAdditionalService"
import styled from "./TypesAdditionalServices.module.css"

interface TypesAdditionalServicesProps {
    name: string
    defaultChecked?: number
    onChange?: any
    types: {
        id: number
        image: string
        title: string
        price: number
    }[]
}

const TypesAdditionalServices: React.FC<TypesAdditionalServicesProps> = ({
    name,
    defaultChecked,
    onChange,
    types
}) => {
    const [checkedValue, setCheckedValue] = useState(defaultChecked || null)

    const onChangeHandler = (e: any) => {
        onChange(e.currentTarget.value)
        setCheckedValue(Number(e.currentTarget.value))
    }

    return (
        <div className={styled.types}>
            {types.map(type => (
                <TypeAdditionalService
                    key={type.id}
                    name={name}
                    value={type.id}
                    icon={type.image}
                    price={type.price}
                    title={type.title}
                    onChange={onChangeHandler}
                    checked={checkedValue === type.id}
                />
            ))}
        </div>
    )
}
export default TypesAdditionalServices
