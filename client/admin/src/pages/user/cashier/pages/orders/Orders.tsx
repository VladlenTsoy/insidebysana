import {DatePicker, Typography} from "antd"
import {LoadingBlock} from "lib/ui"
import moment from "moment"
import React, {useEffect} from "react"
import {fetchOrders} from "store/cashier/order/fetchOrders"
import {useFilterDatesOrders, useLoadingOrders, useSelectAllOrders} from "store/cashier/order/orderSelectors"
import {updateFilterDates} from "store/cashier/order/orderSlice"
import {useCashierDispatch} from "store/cashier/store"
import {formatPrice} from "utils/formatPrice"
import OrderColumn from "./OrderColumn"
import "./Orders.less"

const {RangePicker} = DatePicker
const {Text} = Typography

const Orders: React.FC = () => {
    const orders = useSelectAllOrders()
    const loading = useLoadingOrders()
    const dispatch = useCashierDispatch()
    const dates = useFilterDatesOrders()

    const onChangeHandler = (e: any) => {
        if (e)
            dispatch(
                updateFilterDates({
                    from: moment(e[0]).toISOString(),
                    to: moment(e[1]).toISOString()
                })
            )
    }

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

    useEffect(() => {
        if (dates) {
            const promise = dispatch(
                fetchOrders({
                    dateFrom: dates.from,
                    dateTo: dates.to
                })
            )
            return () => {
                promise.abort()
            }
        }
    }, [dispatch, dates])

    return (
        <div className="wrapper-orders">
            <div className="header">
                <RangePicker
                    size="large"
                    onChange={onChangeHandler}
                    defaultValue={[moment(), moment()]}
                    format="DD-MM-YYYY"
                />
            </div>
            {loading ? (
                <LoadingBlock />
            ) : (
                <>
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
                        <tbody>{orders.map(order => [<OrderColumn order={order} key={order.id} />])}</tbody>
                    </table>
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
                                    {orders.reduce(
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
                            <tr>
                                <td colSpan={4} className="margin-column" />
                                <td>
                                    <Text type="secondary">Наличными</Text>
                                </td>
                                <td>{formatPrice(totalPayment(3))}</td>
                                <td>сум</td>
                            </tr>
                            <tr>
                                <td colSpan={4} className="margin-column" />
                                <td>
                                    <Text type="secondary">Карты</Text>
                                </td>
                                <td>{formatPrice(totalPayment(5))}</td>
                                <td>сум</td>
                            </tr>
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
                </>
            )}
        </div>
    )
}
export default Orders
