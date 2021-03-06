import {DatePicker, Select, Typography} from "antd"
import {RangePickerProps} from "antd/lib/date-picker/generatePicker"
import {PaymentMethod} from "admin/lib/types/payment/PaymentMethod"
import {User} from "admin/lib/types/User"
import {LoadingBlock} from "admin/lib/ui"
import moment from "moment"
import React from "react"
import {formatPrice} from "admin/utils/formatPrice"
import OrderColumn from "./OrderColumn"
import "./OrdersTableBlock.less"
import {OrderTableColumn} from "./OrderTableColumn"
//@ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import {Source} from "types/Source"

const {Text} = Typography
const {RangePicker} = DatePicker

interface OrdersTableBlockProps {
    payments: PaymentMethod[]
    loading: boolean
    orders: OrderTableColumn[]
    onChangeHandler?: RangePickerProps<any>["onChange"]
    access: User["access"]
    sources?: Source[]
    onChangeSourceHandler?: any
}

const OrdersTableBlock: React.FC<OrdersTableBlockProps> = ({
    loading,
    onChangeHandler,
    onChangeSourceHandler,
    sources,
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
        <>
            {!!onChangeHandler && !!onChangeSourceHandler && (
                <div className="header">
                    <Select
                        size="large"
                        className="filter-source"
                        onChange={onChangeSourceHandler}
                        defaultValue={0}
                    >
                        <Select.Option value={0}>??????</Select.Option>
                        {sources?.map(source => (
                            <Select.Option value={source.id}>{source.title}</Select.Option>
                        ))}
                    </Select>
                    <RangePicker
                        size="large"
                        onChange={onChangeHandler}
                        defaultValue={[moment(), moment()]}
                        format="DD-MM-YYYY"
                    />
                    <ReactHTMLTableToExcel
                        className="ant-btn ant-btn-lg"
                        table="table-to-xls"
                        filename="????????????"
                        sheet="????????????"
                        buttonText="?????????????? ?? XSL"
                    />
                </div>
            )}
            {loading ? (
                <LoadingBlock />
            ) : (
                <>
                    <table className="table-orders" id="table-to-xls">
                        <thead>
                            <tr>
                                <th>ID ????????????</th>
                                <th>????????</th>
                                <th>?????? ????????????</th>
                                {access !== "cashier" && (
                                    <>
                                        <th>????????????</th>
                                        <th>???????????? ????????????</th>
                                    </>
                                )}
                                <th>??????e????</th>
                                <th>????????????????????????</th>
                                <th>????????</th>
                                <th>????????????</th>
                                <th>??????-????</th>
                                <th>????????????</th>
                                <th>??????????</th>
                                <th>??????????</th>
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
                                    ??????????
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4} className="margin-column" />
                                <td>
                                    <Text type="secondary">????????????????????</Text>
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
                                <td>????.</td>
                            </tr>
                            {payments.map(payment => (
                                <tr key={payment.id}>
                                    <td colSpan={4} className="margin-column" />
                                    <td>
                                        <Text type="secondary">{payment.title}</Text>
                                    </td>
                                    <td>{formatPrice(totalPayment(payment.id))}</td>
                                    <td>??????</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} className="margin-column" />
                                <td>
                                    <Text type="secondary">?????????? ??????????</Text>
                                </td>
                                <td>{formatPrice(totalPayment(null))}</td>
                                <td>??????</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}
export default OrdersTableBlock
