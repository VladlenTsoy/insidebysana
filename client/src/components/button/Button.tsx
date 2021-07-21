import React from "react"
import styled from "./Button.module.css"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"

interface ButtonProps {
    type?: "primary" | "secondary" | "default"
    size?: "large" | "small" | "middle"
    filled?: boolean
    link?: boolean
    disabled?: boolean
    loading?: boolean
    block?: boolean
    icon?: React.ReactFragment
    onClick?: HTMLButtonElement["click"]
    className?: HTMLButtonElement["className"]
    typeHtml?: 'submit' | 'reset' | 'button'
}

const Button: React.FC<ButtonProps> = (
    {
        children,
        typeHtml = "button",
        size = "middle",
        type = "default",
        filled,
        loading,
        link,
        icon,
        block,
        onClick,
        disabled,
        className
    }
) => {
    return (
        <button
            type={typeHtml}
            disabled={disabled || loading}
            onClick={onClick}
            className={`
                ${styled.button}
                ${styled[type]}
                ${styled[size]}
                ${!link ? (filled ? styled.filled : styled.ghost) : styled.link}
                ${block && styled.block}
                ${className}
            `}>
            {
                loading ?
                    <span className={styled.icon}><LoadingOutlined /></span> :
                    icon && <span className={styled.icon}>{icon}</span>
            }
            {children}
        </button>
    )
}

export default Button