import {CheckCircleFilled} from "@ant-design/icons"
import PriceBlock from "lib/components/blocks/price-block/PriceBlock"
import {OrderPos} from "lib/types/Order"
import React from "react"
import {formatDate} from "utils/formatDate"
import {formatPrice} from "utils/formatPrice"

interface OrderColumnProps {
    order: OrderPos
}

const OrderColumn: React.FC<OrderColumnProps> = ({order}) => {
    const rowSpanMain = Number(order.productColors.length) + Number(order.additionalServices.length)
    return (
        <>
            {[
                <tr key={`basic-${order.id}`}>
                    <td rowSpan={rowSpanMain}>
                        {order.id}
                        {!!order.processing && <CheckCircleFilled className="order_processing" />}
                    </td>
                    <td rowSpan={rowSpanMain}>
                        {formatDate(order.created_at, "HH:mm DD MMM", "HH:mm DD/MM/YY")}
                    </td>
                    <td rowSpan={rowSpanMain}>
                        {order.payments.map(payment => (
                            <div key={payment.payment_id}>{payment.title}</div>
                        ))}
                    </td>
                    <td rowSpan={rowSpanMain}>{order?.client?.full_name}</td>
                    <td>{order.productColors[0]?.title}</td>
                    <td>{order.productColors[0]?.color_title}</td>
                    <td>{order.productColors[0]?.size_title}</td>
                    <td>{order.productColors[0]?.qty}</td>
                    <td>{order.productColors[0]?.discount && `${order.productColors[0]?.discount}%`}</td>
                    <td>
                        {formatPrice(order.productColors[0]?.price, order.productColors[0]?.discount)} сум
                    </td>
                    <td>
                        {formatPrice(
                            order.productColors[0]?.price * order.productColors[0]?.qty,
                            order.productColors[0]?.discount
                        )}{" "}
                        сум
                    </td>
                </tr>,
                order.productColors.length > 0 &&
                    order.productColors.map(
                        (product, key) =>
                            key !== 0 && (
                                <tr key={`${order.id}-${product.id}-${product.size_id}`}>
                                    <td>{product.title}</td>
                                    <td>{product.color_title}</td>
                                    <td>{product.size_title}</td>
                                    <td>{product.qty}</td>
                                    <td>{product.discount && `${product.discount}%`}</td>
                                    <td>{formatPrice(product.price, product.discount)} сум</td>
                                    <td>{formatPrice(product.price * product.qty, product.discount)} сум</td>
                                </tr>
                            )
                    ),
                order.additionalServices.length > 0 &&
                    order.additionalServices.map(additionalService => (
                        <tr key={`${order.id}-${additionalService.id}`}>
                            <td colSpan={3}>{additionalService.title}</td>
                            <td colSpan={2}>{additionalService.qty}</td>
                            <td>{formatPrice(additionalService.price)} сум</td>
                            <td>{formatPrice(additionalService.price * additionalService.qty)} сум</td>
                        </tr>
                    )),
                <tr key={`total-${order.id}`} className="total-row">
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>Итого</td>
                    <td>{order.productColors.reduce((acc, product) => (acc += product.qty), 0)}</td>
                    <td />
                    {order.discount ? (
                        <td>
                            Скидка: -
                            {order.discount.type === "percent"
                                ? `${order.discount.discount}%`
                                : `${formatPrice(order.discount.discount)} сум`}
                        </td>
                    ) : (
                        <td />
                    )}
                    <td>
                        <PriceBlock price={order.total_price} />
                    </td>
                </tr>
            ]}
        </>
    )
}
export default OrderColumn
