import React, {useState} from "react"
import styled from "./TypesPatment.module.css"
import TypePayment from "./TypePayment"

interface TypesDeliveryProps {
    name: string
    defaultChecked?: number
    onChange?: any
    types: {
        id: number,
        icon: string
        title: string
    }[]
}

const TypesPayment: React.FC<TypesDeliveryProps> = (
    {
        name,
        defaultChecked,
        onChange,
        types
    }
) => {
    const [checkedValue, setCheckedValue] = useState(defaultChecked || null)

    const onChangeHandler = (e: any) => {
        onChange(e.currentTarget.value)
        setCheckedValue(Number(e.currentTarget.value))
    }

    return <div className={styled.types}>
        {
            types.map((type: any) =>
                <TypePayment
                    key={type.id}
                    name={name}
                    value={type.id}
                    icon={type.icon}
                    title={type.title}
                    onChange={onChangeHandler}
                    checked={checkedValue === type.id}
                />
            )
        }
    </div>
}

export default TypesPayment