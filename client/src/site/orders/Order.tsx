import React, {useEffect, useState} from "react"
import styled from "./Order.module.css"
import OrderSuccessful from "../cart/order/order-successful/OrderSuccessful"
import {useParams} from "react-router"
import {apiRequest} from "utils/api"
import LoaderBlock from "components/loader-block/LoaderBlock"
import PaymentWaiting from "./payment-waiting/PaymentWaiting"
import Title from "components/title/Title"
import {Link} from "react-router-dom"
import {AdditionalService} from "types/AdditionalService"

export interface OrderMore {
    id: number
    payment_id: number
    total_price: string
    created_at: string
    address: {
        full_name: string
        city: string
        country: string
        phone: string
        address: string
    }
    delivery: {
        id: number
        title: string
        price: number
    }
    payment: {
        id: number
        title: string
    }
    payment_state: number
    additionalServices: AdditionalService[]
    productColors: {
        discount: number
        id: number
        price: number
        qty: number
        size_id: number
        size_title: string
        color_title: string
        title: string
        url_thumbnail: string
    }[]
}

const Order: React.FC = () => {
    const {id} = useParams<{id: string}>()
    const [loading, setLoading] = useState<boolean>(true)
    const [order, setOrder] = useState<OrderMore | null>(null)

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await apiRequest("get", `order/${id}`, {type: "guest"})
                await setOrder(response)
                setLoading(false)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [id])

    if (loading) return <LoaderBlock />

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
