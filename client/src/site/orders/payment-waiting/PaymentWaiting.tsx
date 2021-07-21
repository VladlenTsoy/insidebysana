import React, {useState} from "react"
import {formatPrice} from "utils/formatPrice"
import {OrderMore} from "../orderApi"
import ProductItem from "./product-item/ProductItem"
import styled from "./PaymentWaiting.module.css"
import Button from "components/button/Button"
import moment from "moment"
import {api} from "utils/api"
import {redirectPost} from "utils/redirectPost"
import Select from "components/select/Select"
import PaymentSvg from "assets/images/payment/payme.svg"
// import ApelsinSvg from "assets/images/payment/apelsin.png"
import CashSvg from "assets/images/payment/cash.svg"
import OrderSuccessful from "site/cart/order/order-successful/OrderSuccessful"
interface PaymentWaitingProps {
    order: OrderMore
}

const PaymentWaiting: React.FC<PaymentWaitingProps> = ({order}) => {
    const [loading, setLoading] = useState(false)
    const createdAt = moment(order.created_at).add(2, "hours")
    const minutesLeft = createdAt.diff(moment(), "minutes")
    function getTimeFromMins(mins: number) {
        let hours = Math.trunc(mins / 60)
        let minutes = mins % 60
        return hours + "ч. " + minutes + "м."
    }

    const [type, setType] = useState()
    const [success, setSuccess] = useState(false)

    const onClickHandler = async () => {
        try {
            setLoading(true)
            const response = await api.guest.post("/order/pay", {
                order_id: order.id,
                total_price: order.total_price,
                payment_id: type
            })
            setLoading(false)
            if (response.data.status === "success" && type !== 3) {
                const {payment_opts} = response.data
                redirectPost(payment_opts.url, payment_opts.form, payment_opts.method)
            } else setSuccess(true)
        } catch (e) {
            console.error(e)
        }
    }

    const totalPriceProducts = (order: OrderMore) => {
        return order.productColors.reduce(
            (acc, product) =>
                (acc +=
                    product.qty *
                    (product.discount
                        ? Math.round(product.price - (product.price / 100) * product.discount)
                        : product.price)),
            0
        )
    }

    const typePaymentChangeHandler = (e: any) => setType(e.value)

    const types = [
        {id: 3, title: "Наличные", icon: CashSvg},
        {id: 1, title: "Payme", icon: PaymentSvg}
        // {id: 4, title: "Apelsin", icon: ApelsinSvg}
    ]

    if (success)
        return (
            <div className={`container ${styled.wrapper}`}>
                <OrderSuccessful orderId={order.id} />
            </div>
        )

    return (
        <>
            <div className={styled.order}>
                <div className={styled.message}>
                    <p>Срок действия вашей брони истекает через {getTimeFromMins(minutesLeft)}</p>
                    <p>Пожалуйста, перейдите в корзину, чтобы оплатить заказ.</p>
                </div>
                <div className={styled.products}>
                    {order.productColors.map(product => (
                        <ProductItem product={product} key={`${product.id} ${product.size_id}`} />
                    ))}
                </div>
                <div className={styled.subInfo}>
                    {order.promo_code && (
                        <>
                            <div className={styled.subPromoCodeItem}>
                                <div className={styled.discountCode}>
                                    <span className={styled.title}>Промо-код:</span>
                                    <span>{order.promo_code.code}</span>
                                </div>
                                <div className={styled.discountCode}>
                                    <span className={styled.price}>
                                        {formatPrice(totalPriceProducts(order))}
                                    </span>{" "}
                                    -{" "}
                                    <span className={styled.discount}>
                                        {order.promo_code.type === "percent"
                                            ? `${order.promo_code.discount}%`
                                            : `${formatPrice(order.promo_code.discount)} сум`}
                                    </span>{" "}
                                    ={" "}
                                    <span className={styled.totalPrice}>
                                        {order.promo_code.type === "percent"
                                            ? formatPrice(
                                                  totalPriceProducts(order),
                                                  order.promo_code.discount
                                              )
                                            : formatPrice(
                                                  totalPriceProducts(order) - order.promo_code.discount
                                              )}{" "}
                                        сум
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
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
                <div className={styled.typePayment}>
                    <div className={styled.select}>
                        <Select
                            onChange={typePaymentChangeHandler}
                            placeholder="Тип оплаты"
                            options={types.map(type => ({
                                label: (
                                    <div className={styled.option}>
                                        <img src={type.icon} alt={type.title} />
                                        {type.title}
                                    </div>
                                ),
                                value: type.id
                            }))}
                        />
                    </div>
                </div>
                <div className={styled.action}>
                    <Button onClick={onClickHandler} loading={loading} disabled={!type}>
                        Оплатить
                    </Button>
                </div>
            </div>
        </>
    )
}
export default PaymentWaiting
