import React from "react"
import "./InputPlusMinus.less"
import PlusOutlined from "@ant-design/icons/PlusOutlined"
import MinusOutlined from "@ant-design/icons/MinusOutlined"

interface InputPlusMinusProps {
    value?: number
    onChange?: (val: number) => void
    step?: number
    min?: number
    max?: number
}

const InputPlusMinus: React.FC<InputPlusMinusProps> = ({
    onChange,
    value = 0,
    step = 1,
    min = -Infinity,
    max = Infinity
}) => {
    const up = (val: number) => (step < 1 ? Math.round(val * 10) / 10 : Math.round(val))
    const plusHandler = () => (onChange ? onChange(up(value + step)) : null)
    const minusHandler = () => (onChange ? onChange(up(value - step)) : null)
    const onChangeHandler = (e: any) => {
        const _value = e.currentTarget.value
        const value = _value > max ? max : _value < min ? min : _value
        return onChange ? onChange(up(value)) : null
    }

    return (
        <div className="wrapper">
            <button type="button" onClick={minusHandler} disabled={Boolean(min && value <= min)}>
                <MinusOutlined />
            </button>
            <input value={value} readOnly onChange={onChangeHandler} />
            <button type="button" onClick={plusHandler} disabled={Boolean(max && value >= max)}>
                <PlusOutlined />
            </button>
        </div>
    )
}

export default React.memo<InputPlusMinusProps>(InputPlusMinus)
