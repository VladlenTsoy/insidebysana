import React from "react"
import styled from "./Select.module.css"
import StateManager, {Styles} from "react-select"

const styles: Styles<any, any> = {
    control: (styles, state) => ({
        ...styles,
        borderRadius: 0,
        borderColor: "var(--secondary)",
        boxShadow: state.isFocused ? "0 0 0 1px var(--primary)" : "none",
        cursor: "pointer",

        ":hover": {
            borderColor: "var(--primary)"
        }
    }),
    indicatorSeparator: styles => ({
        ...styles,
        backgroundColor: "var(--secondary)"
    }),
    option: (styles, state) => ({
        ...styles,
        backgroundColor: state.isSelected ? "var(--primary)" : "none",
        cursor: "pointer",
        ":hover": {
            backgroundColor: state.isSelected ? "var(--primary)" : "var(--secondary)"
        },
        ":active": {
            backgroundColor: state.isSelected ? "var(--primary)" : "var(--secondary)"
        }
    }),

    input: styles => ({
        ...styles,
        ":focus": {
            borderColor: "var(--primary)"
        }
    }),
    menu: styles => ({
        ...styles,
        borderRadius: 0,
        boxShadow: "0 0 0 1px var(--secondary), var(--dropdown-box-shadow)"
    })
}

interface SelectProps {
    options: {
        label: string | JSX.Element
        value: string | number
    }[]
    placeholder?: string
    className?: string
    isSearchable?: boolean
    defaultValue?: any
    name?: string
    onChange?: any
    onBlur?: any
    value?: any
    inputRef?: any
    loading?: boolean
}

const Select: React.FC<SelectProps> = ({
    options,
    placeholder,
    isSearchable,
    defaultValue,
    value,
    className,
    onBlur,
    onChange,
    inputRef,
    name,
    loading
}) => {
    return (
        <StateManager
            ref={inputRef}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            isSearchable={isSearchable}
            className={`${className} ${styled.select}`}
            options={options}
            defaultValue={defaultValue}
            styles={styles}
            value={value}
            isLoading={loading}
        />
    )
}

export default React.memo<SelectProps>(Select)
