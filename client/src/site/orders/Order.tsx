import React from "react"
import styled from "./Order.module.css"
import OrderSuccessful from "../cart/order/order-successful/OrderSuccessful"
import {useParams} from "react-router"
import LoaderBlock from "components/loader-block/LoaderBlock"
import PaymentWaiting from "./payment-waiting/PaymentWaiting"
import Title from "components/title/Title"
import {Link} from "react-router-dom"
import {useGetOrderByIdQuery} from "./orderApi"

const Order: React.FC = () => {
    const {id} = useParams<{id: string}>()
    const {data: order, isLoading, error} = useGetOrderByIdQuery(id)

    if (isLoading) return <LoaderBlock />

    if (error) {
        return (
            <div className={`container ${styled.wrapper}  ${styled.notFound}`}>
                <p>Срок действия вашей брони, к сожалению, истёк.</p>
                <p>Вы можете оформить новый заказ.</p>
            </div>
        )
    }

    if (!order || order?.payment_state === 1)
        return (
            <div className={`container ${styled.wrapper} ${styled.notFound}`}>
                <p>К сожалению, заказ с указанным вами номером не найден.</p>
                <p>
                    Пожалуйста, попробуйте ещё раз или перейдите в раздел <Link to="/cart">"Корзина"</Link>.
                </p>
            </div>
        )

    if (order.payment_state === -1)
        return (
            <div className={`container ${styled.wrapper}  ${styled.notFound}`}>
                <p>Срок действия вашей брони, к сожалению, истёк.</p>
                <p>Вы можете оформить новый заказ.</p>
            </div>
        )

    if (order?.payment_id !== 3 && order.payment_state === 0)
        return (
            <div className={`container ${styled.wrapper}`}>
                <PaymentWaiting order={order} />
            </div>
        )

    return (
        <div className={`container ${styled.wrapper}`}>
            <OrderSuccessful orderId={id} />
        </div>
    )
}

const OrderWraper = () => {
    const {id} = useParams<{id: string}>()

    return (
        <>
            <Title level={1}>Заказ #{id}</Title>
            <Order />
        </>
    )
}

export default OrderWraper
