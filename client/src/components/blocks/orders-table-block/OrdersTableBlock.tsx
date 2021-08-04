import {DatePicker, Typography} from "antd"
import {RangePickerProps} from "antd/lib/date-picker/generatePicker"
import moment from "moment"
import React from "react"
import {formatPrice} from "utils/formatPrice"
import OrderColumn from "./OrderColumn"
import "./OrdersTableBlock.less"
import {OrderTableColumn} from "./OrderTableColumn"
//@ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel"

const {Text} = Typography
const {RangePicker} = DatePicker

interface OrdersTableBlockProps {
    payments: {id: number; title: string; logo?: string}[]
    loading: boolean
    orders: OrderTableColumn[]
    onChangeHandler?: RangePickerProps<any>["onChange"]
    access: "admin" | "manager" | "cashier"
}

const OrdersTableBlock: React.FC<OrdersTableBlockProps> = ({
    loading,
    onChangeHandler,
    orders,
    access,
    payments
}) => {
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

    return (
        <div className="orders-table-blocks">
            {!!onChangeHandler && (
                <div className="header">
                    <RangePicker
                        size="large"
                        onChange={onChangeHandler}
                        defaultValue={[moment(), moment()]}
                        format="DD-MM-YYYY"
                    />
                    <ReactHTMLTableToExcel
                        className="ant-btn ant-btn-lg"
                        table="table-to-xls"
                        filename="Заказы"
                        sheet="Заказы"
                        buttonText="Скачать в XSL"
                    />
                </div>
            )}
            {loading ? (
                <>Загрузка</>
            ) : (
                <>
                    <table className="table-orders" id="table-to-xls">
                        <thead>
                            <tr>
                                <th>ID Заказа</th>
                                <th>Дата</th>
                                <th>Тип оплаты</th>
                                {access !== "cashier" && (
                                    <>
                                        <th>Откуда</th>
                                        <th>Статус оплаты</th>
                                    </>
                                )}
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
                            {orders.map(order => [
                                <OrderColumn order={order} key={order.id} access={access} />
                            ])}
                        </tbody>
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
                            {payments.map(payment => (
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
                </>
            )}
        </div>
    )
}
export default OrdersTableBlock
