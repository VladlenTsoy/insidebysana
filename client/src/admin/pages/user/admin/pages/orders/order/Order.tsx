import React from "react"
import {Draggable} from "react-beautiful-dnd"
import moment from "moment"
import {Avatar} from "antd"
import {LoadingOutlined, UserOutlined} from "@ant-design/icons"
import {formatPrice} from "../../../../../../utils/formatPrice"
import {formatPhone} from "admin/utils/formatPhone"
import {Order as OrderCardProps} from "admin/lib/types/Order"
import PaymentStateBlock from "admin/lib/components/blocks/payment-state-block/PaymentStateBlock"
import OrderMoreAction from "admin/lib/components/more/order-more-action/OrderMoreAction"

interface OrderProps {
    task: OrderCardProps
    index: number
}

const Order: React.FC<OrderProps> = ({task, index}) => {
    return (
        <Draggable draggableId={`order-${task.id}`} key={task.id} index={index}>
            {provided => (
                <OrderMoreAction orderId={task.id}>
                    <div
                        className="task"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="header">
                            <div>
                                {task.loading && (
                                    <span className="loading">
                                        <LoadingOutlined />
                                    </span>
                                )}
                                <span className="id">
                                    <span>#</span>
                                    {task.id}
                                </span>
                                <span className="date">{moment(task.created_at).format("DD MMM YYYY")}</span>
                            </div>
                            <div>
                                <PaymentStateBlock paymentState={task.payment_state} orderId={task.id} />
                            </div>
                        </div>
                        <div className="client">
                            <Avatar shape="square" icon={<UserOutlined />} />
                            <div className="info">
                                {task.client ? (
                                    <>
                                        <span className="full-name">{task.client.full_name}</span>
                                        <a href={`tel:${task.client.phone}`} className="phone">
                                            {formatPhone(task.client.phone)}
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <span className="full-name">Пусто</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="total-price">
                            {task.promo_code && (
                                <div className="price">
                                    {task.promo_code.code}
                                    {task.promo_code.type === "percent" ? (
                                        <span className="discount">{task.promo_code.discount}%</span>
                                    ) : (
                                        <span className="discount">{task.promo_code.discount} сум</span>
                                    )}
                                </div>
                            )}
                            {task.discount && (
                                <div className="price">
                                    Скидка
                                    <span className="discount">
                                        {task.discount.type === "percent"
                                            ? `${task.discount.discount}%`
                                            : `-${formatPrice(task.discount.discount)} сум`}
                                    </span>
                                </div>
                            )}
                            <div className="price-discount">{formatPrice(task.total_price)} сум</div>
                        </div>
                    </div>
                </OrderMoreAction>
            )}
        </Draggable>
    )
}

export default Order
