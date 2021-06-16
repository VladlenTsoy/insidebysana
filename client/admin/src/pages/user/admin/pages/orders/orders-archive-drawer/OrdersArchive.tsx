import {MoreOutlined} from "@ant-design/icons"
import {Button, DatePicker, Table, Typography} from "antd"
import ImageBlock from "lib/components/blocks/image-block/ImageBlock"
import PriceBlock from "lib/components/blocks/price-block/PriceBlock"
import ClientMoreAction from "lib/components/more/client-more-action/ClientMoreAction"
import OrderMoreAction from "lib/components/more/order-more-action/OrderMoreAction"
import moment from "moment"
import React, {useEffect} from "react"
import {fetchOrdersArchive} from "store/admin/order-archive/fetchOrdersArchive"
import {
    useFilterDatesOrdersArchive,
    useLoadingOrdersArchive,
    useSelectAllOrdersArchive
} from "store/admin/order-archive/orderArchiveSelectors"
import {updateFilterDates} from "store/admin/order-archive/orderArchiveSlice"
import {useAdminDispatch} from "store/admin/store"
import {formatDate} from "utils/formatDate"
import {formatPrice} from "utils/formatPrice"
import "./OrdersArchive.less"

const {Text} = Typography
const {RangePicker} = DatePicker

const columns = [
    {
        title: "ID Заказа",
        dataIndex: "id"
    },
    {
        title: "Дата заказа",
        dataIndex: "created_at",
        render: (val: string) => formatDate(val, "HH:mm DD MMM", "HH:mm DD/MM/YY")
    },
    {
        title: "Тип оплаты",
        dataIndex: "payments",
        render: (payments: any[]) =>
            payments.map((payment: any) => <div key={payment.payment_id}>{payment.title}</div>)
    },
    {
        title: "Клиент",
        dataIndex: "client",
        render: (client: any) =>
            client ? (
                <ClientMoreAction clientId={client.id}>
                    <div>{client.full_name}</div>
                </ClientMoreAction>
            ) : (
                <Text type="secondary">Пусто</Text>
            )
    },
    {
        title: "Товаров",
        dataIndex: "productColors",
        render: (productColors: any[]) => productColors.reduce((acc, product) => (acc += product.qty), 0)
    },
    {
        title: "Скидка",
        dataIndex: "discount",
        render: (discount: any) =>
            discount
                ? discount.type === "percent"
                    ? `${discount.discount}%`
                    : `${formatPrice(discount.discount)} сум`
                : ""
    },
    {
        title: "Итог",
        dataIndex: "total_price",
        render: (val: number) => `${formatPrice(val)} сум`
    },
    {
        dataIndex: "id",
        render: (id: number) => (
            <OrderMoreAction orderId={id}>
                <Button icon={<MoreOutlined />} />
            </OrderMoreAction>
        )
    }
]

const OrderArchive: React.FC = () => {
    const orders = useSelectAllOrdersArchive()
    const loading = useLoadingOrdersArchive()
    const dispatch = useAdminDispatch()
    const dates = useFilterDatesOrdersArchive()

    const onChangeHandler = (e: any) => {
        if (e)
            dispatch(
                updateFilterDates({
                    from: moment(e[0]).toISOString(),
                    to: moment(e[1]).toISOString()
                })
            )
    }

    useEffect(() => {
        if (dates) {
            const promise = dispatch(
                fetchOrdersArchive({
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
        <div className="orders-archive">
            <div className="header">
                <RangePicker
                    size="large"
                    onChange={onChangeHandler}
                    defaultValue={[moment(), moment()]}
                    format="DD-MM-YYYY"
                />
            </div>
            <Table
                bordered
                columns={columns}
                rowKey="id"
                loading={loading}
                dataSource={orders}
                expandable={{expandedRowRender}}
                pagination={false}
            />
        </div>
    )
}

const expandedRowRender = (record: any) => {
    console.log(record)

    const columns = [
        {
            title: "SKU",
            render: (_: any, record: any) => `PC${record.id}S${record.size_id}`
        },
        {
            title: "Картинка",
            dataIndex: "url_thumbnail",
            render: (url_thumbnail: string) => (
                <div style={{width: "70px"}}>
                    <ImageBlock image={url_thumbnail} />
                </div>
            )
        },
        {
            title: "Название",
            dataIndex: "title"
        },
        {
            title: "Размер",
            dataIndex: "size_title"
        },
        {
            title: "Кол-во",
            dataIndex: ["qty"]
        },
        {
            title: "Цена",
            render: (_: any, product: any) => (
                <PriceBlock
                    price={product.price}
                    discount={product.discount ? {discount: product.discount} : undefined}
                />
            )
        }
    ]

    return <Table bordered columns={columns} dataSource={record.productColors} pagination={false} />
}
export default OrderArchive
