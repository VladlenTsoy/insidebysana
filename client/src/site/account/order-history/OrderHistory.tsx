import React from "react"
import EmptyBlock from "components/empty-block/EmptyBlock"
import {useGetOrdersQuery} from "../../orders/orderApi"
import LoaderBlock from "components/loader-block/LoaderBlock"
import {formatPrice} from "utils/formatPrice"
import moment from "moment"
import styled from "./OrderHistory.module.css"
import Collapse, {Panel} from "rc-collapse"
import "rc-collapse/assets/index.css"
import LeftOutlined from "@ant-design/icons/LeftOutlined"
import motion from "utils/collapseMotionUtil"
import ImageBlock from "components/image-block/ImageBlock"

const expandIcon = ({isActive}: any) => (
    <LeftOutlined className={`${styled.icon} ${isActive && styled.active}`} />
)

const OrderHistory: React.FC = () => {
    const {data: orders = [], isLoading} = useGetOrdersQuery()

    console.log(orders)

    if (isLoading) return <LoaderBlock />

    if (!orders.length) return <EmptyBlock />

    return (
        <div id="profile-orders-collapse">
            <Collapse expandIcon={expandIcon} openMotion={motion}>
                {orders.map(order => (
                    <Panel
                        key={order.id}
                        header={
                            <div key={order.id} className={styled.cardOrder}>
                                <div className={styled.cardOrderHeader}>
                                    <div>
                                        Номер сделки: <span className={styled.id}>#{order.id}</span>
                                    </div>
                                    <div className={styled.created}>
                                        {moment(order.created_at).format("HH:mm DD-MM-YYYY")}
                                    </div>
                                </div>
                                <div className={styled.cardOrderBody}>
                                    <div className={styled.details}>
                                        <div>
                                            Оплата: <span>{JSON.stringify(order.payments)}</span>
                                        </div>
                                        <div>
                                            Доставка: <span>{order.delivery.title}</span>
                                        </div>
                                    </div>
                                    <div className={styled.rightBlock}>
                                        <div className={styled.discount}>
                                            Скидка:{" "}
                                            <span>
                                                {order.promo_code
                                                    ? order.promo_code.type === "fixed"
                                                        ? `${formatPrice(order.promo_code.discount)} сум`
                                                        : `${order.promo_code.discount}%`
                                                    : 0}
                                            </span>
                                        </div>
                                        <div className={styled.total_price}>
                                            {formatPrice(order.total_price)} сум
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <div className={styled.wrapperTable}>
                            <table className={styled.tableProducts}>
                                <thead>
                                    <tr>
                                        <th>SKU</th>
                                        <th>Фото</th>
                                        <th>Название</th>
                                        <th>Размер</th>
                                        <th>Кол-во</th>
                                        <th>Стоимость</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.productColors.map((productColor: any) => (
                                        <tr key={`PC${productColor.id}S${productColor.size_id}`}>
                                            <td>{`PC${productColor.id}S${productColor.size_id}`}</td>
                                            <td>
                                                <div className={styled.image}>
                                                    <ImageBlock
                                                        src={productColor.url_thumbnail}
                                                        alt={productColor.title}
                                                    />
                                                </div>
                                            </td>
                                            <td>{productColor.title}</td>
                                            <td>{productColor.size_title}</td>
                                            <td>{productColor.qty}</td>
                                            <td>
                                                <div>{formatPrice(productColor.price)} сум</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Panel>
                ))}
            </Collapse>
        </div>
    )
}

export default OrderHistory
