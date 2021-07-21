import React, {useEffect, useRef, useState} from "react"
import styled from "./PhoneInput.module.css"
import UzSvg from "../../assets/images/flags/uzbekistan.svg"
import KzSvg from "../../assets/images/flags/kazakhstan.svg"
import RuSvg from "../../assets/images/flags/russia.svg"
import CaretDownOutlined from "@ant-design/icons/CaretDownOutlined"
// @ts-ignore
import Input from "react-phone-number-input/input"

interface PhoneInputProps {
    name?: string
    onChange?: any
    onBlur?: any
    value?: any
    className?: any
}

const PhoneInput: React.FC<PhoneInputProps> = ({name, onBlur, onChange, value, className}) => {
    const [_value, setValue] = useState(value)
    const [selected, setSelected] = useState(0)
    const [visible, setVisible] = useState(false)
    const buttonRef = useRef<HTMLDivElement | null>(null)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const options = [
        {prefix: "+998", icon: UzSvg, country: "Узбекистан", abbr: "UZ", max: 17},
        {prefix: "+7", icon: KzSvg, country: "Казахстан", abbr: "KZ", max: 16},
        {prefix: "+7", icon: RuSvg, country: "Россия", abbr: "RU", max: 16}
    ]

    const onChangeHandler = (val: string) => {
        onChange("phone", val && val !== options[selected].abbr ? val : "", true)
        // onChange(val && val !== options[selected].abbr ? val : "")
        setValue(val)
    }

    const onClickHandler = () => {
        setVisible(prevState => !prevState)
    }

    const outsideClickHandler = (e: any) => {
        if (!buttonRef.current?.contains(e.target) && !dropdownRef.current?.contains(e.target))
            setVisible(false)
    }

    const dropdownClickHandler = () => {
        setVisible(false)
    }

    const optionClickHandler = (key: number) => {
        setSelected(key)
    }

    useEffect(() => {
        setValue(value)
    }, [value])

    useEffect(() => {
        if (buttonRef.current) {
            document.addEventListener("click", outsideClickHandler)
            return () => {
                document.removeEventListener("click", outsideClickHandler)
            }
        }
    }, [buttonRef])

    return (
        <div className={styled.wrapper}>
            <div className={styled.wrapperInput}>
                <div className={styled.selectCountry} ref={buttonRef} onClick={onClickHandler}>
                    <img className={styled.icon} src={options[selected].icon} alt="icon" />
                    <CaretDownOutlined />
                </div>
                <Input
                    maxLength={options[selected].max}
                    name={name}
                    onBlur={onBlur}
                    placeholder="Введите телефон"
                    className={`${styled.inputPhone} ${className}`}
                    country={options[selected].abbr}
                    international
                    withCountryCallingCode
                    value={_value}
                    onChange={onChangeHandler}
                />
            </div>
            <div
                onClick={dropdownClickHandler}
                className={`${styled.dropdown} ${visible ? styled.dropdownOpen : styled.dropdownClose}`}
                ref={dropdownRef}
            >
                {options.map((option, key) => (
                    <div
                        className={`${styled.option} ${key === selected && styled.active}`}
                        key={key}
                        onClick={() => optionClickHandler(key)}
                    >
                        <img src={option.icon} alt="uz" />
                        <span className={styled.title}>{option.country}</span>
                        <span className={styled.prefix}>{option.prefix}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PhoneInput
