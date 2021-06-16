import React from "react"
import styled from "./Input.module.css"

interface InputProps {
    type?: HTMLInputElement["type"]
    name?: HTMLInputElement["name"]
    id?: HTMLInputElement["id"]
    placeholder?: HTMLInputElement["placeholder"]
    required?: HTMLInputElement["required"]
    className?: HTMLInputElement["className"]
    onChange?: any
    onBlur?: any
    value?: string
}

const Input: React.FC<InputProps> = (
    {
        name,
        className,
        onChange,
        onBlur,
        type,
        id,
        placeholder,
        required,
        value
    }
) => {
    return <input
        onBlur={onBlur}
        className={`${styled.input} ${className}`}
        id={id}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
    />
}

export default Input