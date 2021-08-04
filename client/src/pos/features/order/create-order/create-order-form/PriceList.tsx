import {useCartParams} from "pos/features/cart/cartSlice"
import React from "react"
import {formatPrice} from "utils/formatPrice"
import "./PriceList.less"

const PriceList: React.FC = () => {
    const {payChange, totalPrice, leftToPay} = useCartParams()

    return (
        <div className="price-list">
            <div className="price-item">
                <span>Осталось внести:</span>
                <span className={`payChange ${leftToPay > 0 || leftToPay < 0 ? "error" : "success"}`}>
                    {formatPrice(leftToPay)} сум
                </span>
            </div>
            <div className="price-item">
                <span>Сумма к оплате:</span>
                <span>{formatPrice(totalPrice)} сум</span>
            </div>
            <div className="price-item">
                <span>Сдача:</span>
                <span>{formatPrice(payChange)} сум</span>
            </div>
        </div>
    )
}
export default PriceList
