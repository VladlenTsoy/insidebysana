import React, {useEffect} from "react"
import {Button, Descriptions, Typography} from "antd"
import {Order} from "types/Order"
import {formatDate} from "utils/formatDate"
import Avatar from "antd/lib/avatar/avatar"
import {UserOutlined} from "@ant-design/icons"
import {formatPhone} from "utils/formatPhone"
import {formatPrice} from "utils/formatPrice"
import Address from "./address/Address"
import ClientMoreAction from "components/more/client-more-action/ClientMoreAction"
// import {useSelectOrderById} from "store/admin/order/orderSelectors"
// import {useAdminDispatch} from "store/admin/store"
// import {fetchOrderById} from "store/admin/order/fetchOrderById"
// import {LoadingBlock} from "lib/ui"
// import PaymentStateBlock from "lib/components/blocks/payment-state-block/PaymentStateBlock"

const {Text} = Typography

interface InformationProps {
    orderId: Order["id"]
}

const Information: React.FC<InformationProps> = ({orderId}) => {
    // const order: any = useSelectOrderById(orderId)
    // const dispatch = useAdminDispatch()

    // useEffect(() => {
    //     const promise = dispatch(fetchOrderById(orderId))
    //     return () => {
    //         promise.abort()
    //     }
    // }, [dispatch, orderId])

    // return (
    //     <div className="information">
    //         {!order ? (
    //             <LoadingBlock maxHeight="300px" />
    //         ) : (
    //             <Descriptions
    //                 column={1}
    //                 bordered
    //                 className="descriptions"
    //                 title="Информация о сделке"
    //                 size="small"
    //             >
    //                 <Descriptions.Item label="ID сделки">{order.id}</Descriptions.Item>
    //                 <Descriptions.Item label="Создана">
    //                     {formatDate(order.created_at, "HH:mm DD-MMM", "HH:mm DD-MM-YYYY")}
    //                 </Descriptions.Item>
    //                 <Descriptions.Item label="Статус оплаты">
    //                     <PaymentStateBlock paymentState={order.payment_state} isEdit orderId={order.id} />
    //                 </Descriptions.Item>
    //                 <Descriptions.Item label="Менеджер">
    //                     {order.user?.full_name || <Text type="secondary">Неизвестно</Text>}
    //                 </Descriptions.Item>
    //                 {/* <Descriptions.Item label="Скидка от менеджера">{order?.discount || 0}%</Descriptions.Item> */}
    //                 <Descriptions.Item label="Промокод">
    //                     {order.promo_code ? (
    //                         `${order.promo_code?.code} ${
    //                             order.promo_code?.type === "fixed"
    //                                 ? `${formatPrice(order.promo_code.discount)} сум`
    //                                 : `${order.promo_code.discount}%`
    //                         }`
    //                     ) : (
    //                         <Text type="secondary">Пусто</Text>
    //                     )}
    //                 </Descriptions.Item>
    //                 {/* <Descriptions.Item label="Тип оплаты">{order.payment.title}</Descriptions.Item> */}
    //                 {!!order.discount && (
    //                     <Descriptions.Item label="Скидка">
    //                         {order.discount.type === "percent"
    //                             ? `${order.discount.discount}%`
    //                             : `${formatPrice(order.discount.discount)} сум`}
    //                     </Descriptions.Item>
    //                 )}
    //                 <Descriptions.Item label="Итог">{formatPrice(order.total_price)} сум</Descriptions.Item>

    //                 {order.payments.map((payment: any) => (
    //                     <Descriptions.Item label={payment.title} key={payment.payment_id}>
    //                         {formatPrice(payment.price)} сум
    //                     </Descriptions.Item>
    //                 ))}
    //             </Descriptions>
    //         )}

    //         {!!order?.client && (
    //             <div className="client">
    //                 <Avatar shape="square" icon={<UserOutlined />} size="large" />
    //                 <div className="details">
    //                     <div className="full_name">{order.client.full_name}</div>
    //                     <a className="phone" href={`tel:${order.client.phone}`}>
    //                         {formatPhone(order.client.phone)}
    //                     </a>
    //                 </div>
    //                 <div className="action">
    //                     <ClientMoreAction clientId={order.client.id}>
    //                         <Button>Подробнее</Button>
    //                     </ClientMoreAction>
    //                 </div>
    //             </div>
    //         )}
    //         <Address orderId={orderId} />
    //     </div>
    // )
    return <></>
}
export default Information
