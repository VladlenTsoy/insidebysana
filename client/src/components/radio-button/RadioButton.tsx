import React, {useState} from "react"
import styled from "./RadioButton.module.css"

interface RadioButtonProps {
    name: string
    defaultValue?: string
    data: {
        value: string
        label: string
    }[]
    onChange?: any
}

const RadioButton: React.FC<RadioButtonProps> = ({name, data, defaultValue, onChange}) => {
    const [selected, setSelected] = useState(defaultValue)

    const onChangeHandler = (e: any) => {
        setSelected(e.currentTarget.value)
        onChange(e.currentTarget.value)
    }

    return (
        <div className={styled.radioGroup}>
            {data.map((item, key) =>
                [
                    <button
                        type="button"
                        key={`btn-${name}-${key}`}
                        className={`${styled.labelButton} ${selected === item.value && styled.active}`}
                    >
                        <label htmlFor={`${name}-${key}`}>
                            {item.label}
                        </label>
                    </button>,
                    <input
                        type="radio"
                        name={name}
                        value={item.value}
                        id={`${name}-${key}`}
                        key={`input-${name}-${key}`}
                        onChange={onChangeHandler}
                    />
                ]
            )}
        </div>
    )
}

export default RadioButton