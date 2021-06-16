import {Alert} from "antd"
import React from "react"
import {useLeftToPay, useTotalPricePos} from "store/cashier/pos/posSelectors"
import {formatPrice} from "utils/formatPrice"

const LeftToPayBlock: React.FC = () => {
    const leftToPay = useLeftToPay()
    const totalPrice = useTotalPricePos()

    return (
        <Alert
            type={leftToPay > 0 ? "error" : "success"}
            message={`Сумма к оплате: ${formatPrice(totalPrice)} сум. Осталось внести: ${formatPrice(
                leftToPay > 0 ? leftToPay : 0
            )} сум`}
            showIcon
        />
    )
}
export default React.memo(LeftToPayBlock)
