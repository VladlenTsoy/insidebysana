import React from "react"
import {Draggable} from "react-beautiful-dnd"
import {Button, Dropdown, Menu, Tooltip} from "antd"
import {
    CalendarOutlined,
    CarOutlined,
    CheckOutlined,
    DeleteOutlined,
    EditOutlined,
    FieldNumberOutlined,
    HourglassOutlined,
    IdcardOutlined,
    InfoCircleOutlined,
    MoreOutlined,
    PhoneFilled,
    SkinOutlined,
    StopOutlined,
    UserOutlined
} from "@ant-design/icons"
import {formatPrice} from "../../../utils/formatPrice"
import {OrderCardType} from "../Order"
import "./OrderCard.less"
import {formatDate} from "utils/formatDate"
// import DeleteOrder from "./DeleteOrderAction"
import HideOrderAction from "./HideOrderAction"
import OrderMoreAction from "admin/lib/components/more/order-more-action/OrderMoreAction"
import EditorOrderAction from "admin/lib/components/editors/editor-order-action/EditorOrderAction"
// import ToArchiveOrder from "./SendToArchiveOrderAction"
import ClientMoreAction from "admin/lib/components/more/client-more-action/ClientMoreAction"

interface OrderCardProps {
    order: OrderCardType
    index: number
}

const OrderCard: React.FC<OrderCardProps> = ({order, index}) => {
    const menu = (
        <Menu>
            <Menu.Item icon={<InfoCircleOutlined />} key="more">
                <OrderMoreAction orderId={order.id}>
                    <span>Подробнее</span>
                </OrderMoreAction>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="edit">
                <EditorOrderAction orderId={order.id}>
                    <span>Редактировать</span>
                </EditorOrderAction>
            </Menu.Item>
            {/* <Menu.Item icon={<ContainerOutlined />} key="archive">
                <ToArchiveOrder orderId={order.id} />
            </Menu.Item> */}
            <Menu.Item icon={<DeleteOutlined />} key="cart" danger>
                <HideOrderAction orderId={order.id} />
            </Menu.Item>
            {/* <Menu.Item icon={<DeleteOutlined />} key="delete" danger>
                <DeleteOrder orderId={order.id} />
            </Menu.Item> */}
        </Menu>
    )

    return (
        <Draggable draggableId={`order-${order.id}`} key={order.id} index={index}>
            {provided => (
                <div
                    className="order-card"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="order-card-header">
                        <div className="information">
                            <div className="date">
                                <CalendarOutlined />
                                <span>{formatDate(order.created_at)}</span>
                            </div>
                            <div>
                                <div className="id">
                                    <FieldNumberOutlined />
                                    <span>{order.id}</span>
                                </div>
                            </div>
                        </div>
                        {order.delivery.price !== 0 && (
                            <div className="delivery">
                                <Tooltip title={order.delivery.title}>
                                    <CarOutlined />
                                </Tooltip>
                            </div>
                        )}
                        <div className="status">
                            {order.payment_state === 1 && (
                                <Tooltip title="Оплачен">
                                    <div className="check">
                                        <CheckOutlined />
                                    </div>
                                </Tooltip>
                            )}
                            {order.payment_state === -1 && (
                                <Tooltip title="Отменен">
                                    <div className="cancel">
                                        <StopOutlined />
                                    </div>
                                </Tooltip>
                            )}
                            {order.payment_state === 0 && (
                                <Tooltip title="Ожидание">
                                    <div className="wait">
                                        <HourglassOutlined />
                                    </div>
                                </Tooltip>
                            )}
                        </div>
                        <div className="action">
                            <Dropdown overlay={menu} placement="bottomRight" arrow trigger={["click"]}>
                                <Button icon={<MoreOutlined />} />
                            </Dropdown>
                        </div>
                    </div>
                    {!!order.client && (
                        <div className="client">
                            <div className="information">
                                <UserOutlined />
                                <span className="full-name">{order.client.full_name}</span>
                            </div>
                            <div className="actions">
                                <ClientMoreAction clientId={order.client.id}>
                                    <Button icon={<IdcardOutlined />} />
                                </ClientMoreAction>
                                {order.client.phone && (
                                    <a href={`tel:${order.client.phone}`}>
                                        <Button icon={<PhoneFilled />} />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="order-card-footer">
                        <div className="information">
                            <div className="products">
                                <SkinOutlined />
                                <b>{order.product_color_qty}</b>
                            </div>
                        </div>
                        <div className="total-price">
                            {order.promo_code && (
                                <div className="discount">
                                    <span>{order.promo_code.code}</span>
                                    {order.promo_code.type === "percent" ? (
                                        <>
                                            -<b>{order.promo_code.discount}</b>%
                                        </>
                                    ) : (
                                        <>
                                            -<b>{order.promo_code.discount}</b>сум
                                        </>
                                    )}
                                </div>
                            )}
                            {order.discount && (
                                <div className="discount">
                                    Скидка
                                    {order.discount.type === "percent" ? (
                                        <>
                                            -<b>{order.discount.discount}</b>%
                                        </>
                                    ) : (
                                        <>
                                            -<b>{formatPrice(order.discount.discount)}</b>сум
                                        </>
                                    )}
                                </div>
                            )}
                            <div className="price">
                                <b>{formatPrice(order.total_price)}</b> сум
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default React.memo<OrderCardProps>(OrderCard)
