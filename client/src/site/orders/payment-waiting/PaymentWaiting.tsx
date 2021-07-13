import React, {useState} from "react"
import {formatPrice} from "utils/formatPrice"
import {OrderMore} from "../Order"
import ProductItem from "./product-item/ProductItem"
import styled from "./PaymentWaiting.module.css"
import Button from "components/button/Button"
import moment from "moment"
import {api} from "utils/api"
import {redirectPost} from "utils/redirectPost"

interface PaymentWaitingProps {
    order: OrderMore
}

const PaymentWaiting: React.FC<PaymentWaitingProps> = ({order}) => {
    const [loading, setLoading] = useState(false)
    const createdAt = moment(order.created_at)
    const timeLeft = moment(order.created_at).add(2, "hours")
    const hoursLeft = timeLeft.diff(createdAt, "hours")

    const onClickHandler = async () => {
        try {
            setLoading(true)
            const response = await api.guest.post("/order/pay", {
                order_id: order.id,
                total_price: order.total_price,
                // TODO - 1
                payment_id: 1
            })
            if (response.data.status === "success") {
                const {payment_opts} = response.data
                redirectPost(payment_opts.url, payment_opts.form, payment_opts.method)
            }
            setLoading(false)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className={styled.order}>
                <div className={styled.message}>
                    <p>
                        Срок действия вашей брони истекает через {hoursLeft} {hoursLeft > 1 ? "часа" : "час"}.
                    </p>
                    <p>Пожалуйста, перейдите в корзину, чтобы оплатить заказ.</p>
                </div>
                <div className={styled.products}>
                    {order.productColors.map(product => (
                        <ProductItem product={product} key={`${product.id} ${product.size_id}`} />
                    ))}
                </div>
                <div className={styled.subInfo}>
                    {order.delivery && (
                        <div className={styled.subInfoItem}>
                            <span className={styled.title}>{order.delivery.title}:</span>
                            <span>{formatPrice(order.delivery.price)} сум</span>
                        </div>
                    )}
                    {order.additionalServices.length &&
                        order.additionalServices.map(additionalService => (
                            <div className={styled.subInfoItem} key={additionalService.id}>
                                <span className={styled.title}>{additionalService.title}:</span>
                                <span>{formatPrice(additionalService.price)} сум</span>
                            </div>
                        ))}
                </div>
                <div className={styled.total}>
                    <span>Итог: </span>
                    {formatPrice(order.total_price)} сум
                </div>
                <div className={styled.action}>
                    <Button onClick={onClickHandler} loading={loading}>
                        Оплатить
                    </Button>
                </div>
            </div>
        </>
    )
}
export default PaymentWaiting
