import {
    CloseOutlined,
    DollarOutlined,
    PercentageOutlined
} from "@ant-design/icons"
import {Button, InputNumber, Radio} from "antd"
import {setDiscount, useCartParams} from "pos/features/cart/cartSlice"
import {useDispatch} from "pos/store"
import React from "react"
import {formatPrice} from "utils/formatPrice"
import "./Discount.less"

const plainOptions = [
    {label: <PercentageOutlined />, value: "percent"},
    {label: <DollarOutlined />, value: "fixed"}
]

const Discount: React.FC = () => {
    const dispatch = useDispatch()
    const {discount} = useCartParams()
    // const [typeDiscount, setTypeDiscount] = useState<"percent" | "fixed">(
    //     discount ? discount.type : "percent"
    // )
    // const [valueDiscount, setValueDiscount] = useState(
    //     discount.discount ? discount.discount : 0
    // )

    const onTypeChangeHandler = (e: any) => {
        console.log(e.target.value)
        dispatch(
            setDiscount({type: e.target.value})
        )
    }

    const onValueChangeHandler = (e: any) =>
        dispatch(setDiscount({discount: e}))

    const onCLickHandler = () => {
        dispatch(setDiscount({discount: 0, type: "percent"}))
        dispatch(setDiscount({type: "percent", discount: 0}))
    }

    // useEffect(() => {
    //     if (discount.type === "percent" && discount.discount > 100)
    //         dispatch(setDiscount({type: discount.type, discount: 100}))
    //     if (discount.discount !== 0)
    //         dispatch(
    //             setDiscount({type: discount.type, discount: discount.discount})
    //         )
    //     else dispatch(setDiscount({type: "percent", discount: 0}))
    // }, [dispatch, discount])

    return (
        <div className="create-order-discount">
            <Radio.Group
                value={discount.type}
                options={plainOptions}
                optionType="button"
                buttonStyle="solid"
                size="large"
                className="discount-radio"
                onChange={onTypeChangeHandler}
            />
            <div className="discount-input">
                <InputNumber
                    type="tel"
                    size="large"
                    onChange={onValueChangeHandler}
                    min={0}
                    value={discount.discount}
                    {...(discount.type === "fixed"
                        ? {formatter: val => formatPrice(Number(val))}
                        : {max: 100})}
                />
                <span className="icon">
                    {discount.type === "fixed" ? "сум" : "%"}
                </span>
            </div>
            <Button
                danger
                size="large"
                icon={<CloseOutlined />}
                shape="circle"
                onClick={onCLickHandler}
            />
        </div>
    )
}
export default Discount
