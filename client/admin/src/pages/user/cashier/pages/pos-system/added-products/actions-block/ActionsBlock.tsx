import {FlagOutlined, EditOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons"
import {Button} from "antd"
import React from "react"
import {useDiscountPos, useSelectAllPosProductColors, useTotalPricePos} from "store/cashier/pos/posSelectors"
import {setDiscount} from "store/cashier/pos/posSlice"
import {useCashierDispatch} from "store/cashier/store"
import {formatPrice} from "utils/formatPrice"
import AdditionalServicesAction from "./additional-services-action/AdditionalServicesAction"
import DiscountAction from "./discount-action/DiscountAction"
import PosOrderAction from "./pos-order-action/PosOrderAction"

const ActionsBlock: React.FC = () => {
    const totalPrice = useTotalPricePos()
    const products = useSelectAllPosProductColors()
    const discount = useDiscountPos()
    const dispatch = useCashierDispatch()

    const clearDiscount = () => {
        dispatch(setDiscount(null))
    }

    return (
        <>
            <div className="total-block">
                <div className="additional-services-action">
                    <AdditionalServicesAction />
                </div>
                <div className="discount-action">
                    <div>
                        <DiscountAction>
                            <Button size="large" icon={discount ? <EditOutlined /> : <PlusOutlined />}>
                                Скидка:
                            </Button>
                        </DiscountAction>
                    </div>
                    <div>
                        <span className="discount-value">
                            {discount
                                ? `${
                                      discount.type === "percent"
                                          ? discount.discount
                                          : formatPrice(discount.discount)
                                  }${discount.type === "percent" ? "%" : " сум"}`
                                : 0}
                        </span>
                        {discount && (
                            <Button size="large" danger icon={<CloseOutlined />} onClick={clearDiscount} />
                        )}
                    </div>
                </div>
                <div className="total-price">
                    <div>Сумма к оплате:</div>
                    <div>{formatPrice(totalPrice)} сум</div>
                </div>
                <PosOrderAction>
                    <Button
                        type="primary"
                        block
                        size="large"
                        disabled={!products.length}
                        icon={<FlagOutlined />}
                    >
                        Завершить
                    </Button>
                </PosOrderAction>
            </div>
        </>
    )
}
export default ActionsBlock
