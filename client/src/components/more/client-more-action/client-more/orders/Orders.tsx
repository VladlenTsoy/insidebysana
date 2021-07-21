import {Button, Table} from "antd"
import PaymentStateBlock from "components/blocks/payment-state-block/PaymentStateBlock"
import {Client} from "types/Client"
import {Order} from "types/Order"
import React, {useEffect, useState} from "react"
import {apiRequest} from "utils/api"
import {formatDate} from "utils/formatDate"
import {formatPrice} from "utils/formatPrice"
import OrderMoreAction from "components/more/order-more-action/OrderMoreAction"

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Статус",
        dataIndex: ["status", "title"]
    },
    {
        title: "Тип оплаты",
        dataIndex: ["payment", "title"]
    },
    {
        title: "Статус платежа",
        dataIndex: "payment_state",
        render: (paymentState: number, record: any) => (
            <PaymentStateBlock paymentState={paymentState} orderId={record.id} />
        )
    },
    {
        title: "Сумма",
        dataIndex: "total_price",
        render: (price: any) => <div>{formatPrice(price)} сум</div>
    },
    {
        title: "Создан",
        dataIndex: "created_at",
        render: (created: any) => formatDate(created)
    },
    {
        render: (_: any, record: any) => (
            <OrderMoreAction orderId={record.id}>
                <Button>Подробнее</Button>
            </OrderMoreAction>
        )
    }
]

interface OrdersProps {
    clientId: Client["id"]
}

const Orders: React.FC<OrdersProps> = ({clientId}) => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await apiRequest("get", `admin/client/${clientId}/orders`)
                setOrders(response)
                setLoading(false)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [clientId])

    return (
        <>
            <Table loading={loading} dataSource={orders} pagination={false} columns={columns} />
        </>
    )
}
export default Orders
