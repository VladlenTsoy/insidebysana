import React from "react"
import {usePayChange} from "admin/store/cashier/pos/posSelectors"
import {formatPrice} from "admin/utils/formatPrice"

const PayChangeBlock: React.FC = () => {
    const payChange = usePayChange()

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
