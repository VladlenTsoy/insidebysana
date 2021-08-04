import {CloseOutlined, DollarOutlined, PercentageOutlined} from "@ant-design/icons"
import {Button, InputNumber, Radio} from "antd"
import {useCartParams, setDiscount} from "pos/features/cart/cartSlice"
import {useDispatch} from "pos/store"
import React, {useState} from "react"
import {useEffect} from "react"
import {formatPrice} from "utils/formatPrice"
import "./Discount.less"

const plainOptions = [
    {label: <PercentageOutlined />, value: "percent"},
    {label: <DollarOutlined />, value: "fixed"}
]

const Discount: React.FC = () => {
    const dispatch = useDispatch()
    const {discount} = useCartParams()
    const [typeDiscount, setTypeDiscound] = useState<"percent" | "fixed">(
        discount ? discount.type : "percent"
    )
    const [valueDiscount, setValueDiscount] = useState(discount ? discount.discount : 0)

    const onTypeChangeHandler = (e: any) => setTypeDiscound(e.target.value)
    const onValueChangeHandler = (e: any) => setValueDiscount(e)
    const onCLickHandler = () => {
        dispatch(setDiscount(null))
        setTypeDiscound("percent")
        setValueDiscount(0)
    }

    useEffect(() => {
        if (typeDiscount === "percent" && valueDiscount > 100) setValueDiscount(100)
        if (valueDiscount !== 0) dispatch(setDiscount({type: typeDiscount, discount: valueDiscount}))
        else dispatch(setDiscount(null))
    }, [dispatch, typeDiscount, valueDiscount])

    return (
        <div className="create-order-discount">
            <Radio.Group
                value={typeDiscount}
                options={plainOptions}
                optionType="button"
                buttonStyle="solid"
                size="large"
                className="discount-radio"
                onChange={onTypeChangeHandler}
            />
            <div className="discount-input">
                <InputNumber
                    size="large"
                    onChange={onValueChangeHandler}
                    min={0}
                    value={valueDiscount}
                    {...(typeDiscount === "fixed"
                        ? {formatter: val => formatPrice(Number(val))}
                        : {max: 100})}
                />
                <span className="icon">{typeDiscount === "fixed" ? "сум" : "%"}</span>
            </div>
            <Button danger size="large" icon={<CloseOutlined />} shape="circle" onClick={onCLickHandler} />
        </div>
    )
}
export default Discount
