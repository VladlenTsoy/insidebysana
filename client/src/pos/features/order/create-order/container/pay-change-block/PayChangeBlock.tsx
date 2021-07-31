import React from "react"
import {useCartParams} from "pos/features/cart/cartSlice"
import {formatPrice} from "utils/formatPrice"

const PayChangeBlock: React.FC = () => {
    const {payChange} = useCartParams()

    return (
        <div className="pay-change">
            <div className="total-price">
                <div>Сдача:</div>
                <div>{formatPrice(payChange)} сум</div>
            </div>
        </div>
    )
}
export default React.memo(PayChangeBlock)
