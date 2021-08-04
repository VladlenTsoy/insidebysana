import React from "react"
import {Typography} from "antd"
import {useGetOrdersQuery} from "../orderApi"
import {useGetPaymentMethodQuery} from "./paymentMethodsApi"
import "./OrdersList.less"
import OrderColumn from "./OrderColumn"
import {formatPrice} from "utils/formatPrice"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"

const {Text} = Typography

const Orders: React.FC = () => {
    const {data: orders, isLoading: isLoadingOrders} = useGetOrdersQuery()
    const {data: paymentMethods, isLoading: isLoadingPaymentMethods} = useGetPaymentMethodQuery()

    const totalPayment = (typePayment: number | null) => {
        if (orders)
            return orders.reduce((acc, order) => {
                order.payments.map(payment => {
                    if (typePayment && Number(payment.payment_id) === typePayment)
                        return (acc += Number(payment.price))
                    else if (typePayment === null) return (acc += Number(payment.price))
                    return acc
                })
                return acc
            }, 0)
        return 0
    }

    if (isLoadingOrders && isLoadingPaymentMethods) return <LoadingBlock />

    return (
        <div className="orders-list">
            <div className="order-scroll-table">
                <table className="table-orders">
                    <thead>
                        <tr>
                            <th>ID Заказа</th>
                            <th>Дата</th>
                            <th>Тип оплаты</th>
                            <th>Клиeнт</th>
                            <th>Наименование</th>
                            <th>Цвет</th>
                            <th>Размер</th>
                            <th>Кол-во</th>
                            <th>Скидка</th>
                            <th>Сумма</th>
                            <th>Итого</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(order => [<OrderColumn order={order} key={order.id} />])}
                    </tbody>
                </table>
            </div>
            <table className="orders-totals">
                <thead>
                    <tr>
                        <th colSpan={4} className="margin-column" />
                        <th colSpan={4} className="total-title">
                            Итоги
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4} className="margin-column" />
                        <td>
                            <Text type="secondary">Количество</Text>
                        </td>
                        <td>
                            {orders &&
                                orders.reduce(
                                    (acc, order) =>
                                        (acc += order.productColors.reduce(
                                            (acc, product) => (acc += product.qty),
                                            0
                                        )),
                                    0
                                )}
                        </td>
                        <td>шт.</td>
                    </tr>
                    {paymentMethods &&
                        paymentMethods.map(payment => (
                            <tr key={payment.id}>
                                <td colSpan={4} className="margin-column" />
                                <td>
                                    <Text type="secondary">{payment.title}</Text>
                                </td>
                                <td>{formatPrice(totalPayment(payment.id))}</td>
                                <td>сум</td>
                            </tr>
                        ))}
                    <tr>
                        <td colSpan={4} className="margin-column" />
                        <td>
                            <Text type="secondary">Общая сумма</Text>
                        </td>
                        <td>{formatPrice(totalPayment(null))}</td>
                        <td>сум</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Orders
