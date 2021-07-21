import React, {useState} from "react"
import styled from "./DropdownCheckbox.module.css"
import Checkbox from "../checkbox/Checkbox"

interface DropdownCheckboxProps {
    onChange?: any
    data: {
        checked?: boolean
        label: string
        color?: string
        value: string
        count?: number
    }[]
}

const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({data, onChange}) => {
    const [checked, setChecked] = useState<string[]>(
        data
            .filter(value => value.checked)
            .map(value => value.value)
    )

    const onChangeHandler = (e: any) => {
        try {
            const val = e.target.value
            const chk = e.target.checked

            setChecked(prevState => {
                const updateState = chk ? [...prevState, val] : prevState.filter(value => value !== val)
                onChange(updateState)
                return updateState
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {data.map((item, key) =>
                <label className={styled.labelOption} key={key}>
                    <div className={styled.label}>
                        <Checkbox
                            className={styled.checkbox}
                            checked={checked.includes(item.value)}
                            value={item.value}
                            onChange={onChangeHandler}
                        />
                        {item.color && <span className={styled.color} style={{background: item.color}} />}
                        {item.label}
                    </div>
                    {item.count && <div className={styled.count}>({item.count})</div>}
                </label>
            )}
        </>
    )
}

export default DropdownCheckbox