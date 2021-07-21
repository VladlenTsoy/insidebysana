import React, {useState} from "react"
import styled from "./RadioButton.module.css"

interface RadioButtonProps {
    name: string
    defaultValue?: string
    data: {
        value: string
        label: string
        disabled?: boolean
    }[]
    onChange?: any
    bigBorder?: boolean
}

const RadioButton: React.FC<RadioButtonProps> = ({name, data, defaultValue, onChange, bigBorder}) => {
    const [selected, setSelected] = useState(defaultValue)

    const onChangeHandler = (e: any) => {
        setSelected(e.currentTarget.value)
        onChange(e.currentTarget.value)
    }

    return (
        <div className={styled.radioGroup}>
            {data.map((item, key) => [
                item.disabled ? (
                    <></>
                ) : (
                    <button
                        disabled={item.disabled}
                        type="button"
                        key={`btn-${name}-${key}`}
                        className={`${styled.labelButton} ${selected === item.value && styled.active} ${
                            bigBorder ? styled.bigBorder : ""
                        }`}
                    >
                        <label htmlFor={`${name}-${key}`}>{item.label}</label>
                    </button>
                ),
                <input
                    disabled={item.disabled}
                    type="radio"
                    name={name}
                    value={item.value}
                    id={`${name}-${key}`}
                    key={`input-${name}-${key}`}
                    onChange={onChangeHandler}
                />
            ])}
        </div>
    )
}

export default RadioButton
