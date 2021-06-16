import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react"
import {Col, notification, Row, Switch} from "antd"
import {useDispatch} from "react-redux"
import {createOrder} from "../../../../../store/admin/order/createOrder"
import Information from "./information/Information"
import {Delivery} from "lib/types/Delivery"
import OrderProducts from "./order-products/OrderProducts"
import {Client} from "lib/types/Client"
import {formatPrice} from "utils/formatPrice"
import {OrderAddress, OrderDiscount, OrderPayment, OrderProduct} from "lib/types/Order"
import {SelectAdditionalService} from "lib/components/blocks/add-additional-service-block/AddAdditionalServiceBlock"
import {editOrder} from "store/admin/order/editOrder"

interface EditorOrderProps {
    setLoadingFinish: Dispatch<SetStateAction<boolean>>
    close: any
    order?: {
        id: number
        processing?: boolean
        additionalServices: SelectAdditionalService[]
        products: OrderProduct[]
        client?: Client
        delivery?: Delivery
        discount?: OrderDiscount
        address?: OrderAddress
        payments?: OrderPayment[]
    }
}

const EditorOrder: React.FC<EditorOrderProps> = ({close, setLoadingFinish, order}) => {
    const dispatch = useDispatch()
    const [processing, setProcessing] = useState(order?.processing || false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalPricePayments, setTotalPricePayments] = useState(0)

    const [products, setProducts] = useState<OrderProduct[]>(order?.products || [])
    const [client, setClient] = useState<Client | null>(order?.client || null)
    const [delivery, setDelivery] = useState<Delivery | null>(order?.delivery || null)
    const [discount, setDiscount] = useState<OrderDiscount | null>(order?.discount || null)
    const [address, setAddress] = useState<OrderAddress | null>(order?.address || null)
    const [payments, setPayments] = useState<OrderPayment[]>(order?.payments || [])
    const [additionalServices, setAdditionalServices] = useState<SelectAdditionalService[]>(
        order?.additionalServices || []
    )

    const updateSelectClient = useCallback((client: Client | null) => setClient(client), [])
    const updateSelectDelivery = useCallback((delivery: Delivery | null) => setDelivery(delivery), [])
    const updateSelectAddress = useCallback((address: OrderAddress | null) => setAddress(address), [])
    const updateSelectDiscount = useCallback((discount: OrderDiscount | null) => setDiscount(discount), [])
    const updateSelectPayments = useCallback((payments: OrderPayment[]) => setPayments(payments), [])

    const changeProcessingHandler = useCallback((val: boolean) => setProcessing(val), [])

    const onSubmitHandler = useCallback(
        async (values: any) => {
            if (!products.length)
                return notification["error"]({
                    message: "Невозможно создать сделку!"
                })

            const orderProducts = products.map(({product, product_color_id, qty, size_id}) => ({
                discount: product?.discount?.discount || 0,
                id: product_color_id,
                qty,
                size_id,
                price: product.details.price
            }))

            setLoadingFinish(true)
            if (order) {
                await dispatch(
                    editOrder({
                        id: order.id,
                        data: {
                            additionalServices,
                            processing,
                            payments,
                            client,
                            address,
                            delivery_id: delivery?.id || null,
                            discount,
                            products: orderProducts,
                            total_price: totalPrice,
                            created_at: values.created_at
                        }
                    })
                )
            } else {
                await dispatch(
                    createOrder({
                        additionalServices,
                        processing,
                        payments,
                        client,
                        address,
                        delivery_id: delivery?.id || null,
                        discount,
                        products: orderProducts,
                        total_price: totalPrice,
                        created_at: values.created_at
                    })
                )
            }
            setLoadingFinish(false)
            close()
        },
        [
            additionalServices,
            order,
            processing,
            address,
            client,
            close,
            delivery,
            discount,
            dispatch,
            products,
            setLoadingFinish,
            totalPrice,
            payments
        ]
    )

    useEffect(() => {
        let total = products.reduce((accumulator, {product, qty}) => {
            const price = product.discount
                ? (product.details.price - (product.details.price / 100) * product.discount.discount).toFixed(
                      0
                  )
                : product.details.price
            return accumulator + Number(price) * qty
        }, 0)

        if (additionalServices)
            total += additionalServices.reduce(
                (acc, additionalService) => (acc += additionalService.qty * additionalService.price),
                0
            )

        if (delivery) total += delivery.price

        if (discount) {
            total =
                discount.type === "fixed"
                    ? total - discount.discount
                    : total - discount.discount * (total / 100)
        }

        setTotalPrice(total)
    }, [products, setProducts, setTotalPrice, discount, delivery, additionalServices])

    useEffect(() => {
        if (payments.length) {
            setTotalPricePayments(payments.reduce((acc, payment) => (acc += payment.price), 0))
        }
    }, [payments])

    return (
        <Row gutter={30}>
            <Col xl={17} md={16}>
                <OrderProducts
                    defaultActiveKey={order ? "2" : "1"}
                    products={products}
                    setProducts={setProducts}
                />
            </Col>
            <Col xl={7} md={8}>
                <Information
                    additionalServices={additionalServices}
                    client={client}
                    delivery={delivery}
                    discount={discount}
                    address={address}
                    payments={payments}
                    onSubmitHandler={onSubmitHandler}
                    updateSelectAdditionalServices={setAdditionalServices}
                    updateSelectClient={updateSelectClient}
                    updateSelectDelivery={updateSelectDelivery}
                    updateSelectAddress={updateSelectAddress}
                    updateSelectDiscount={updateSelectDiscount}
                    updateSelectPayments={updateSelectPayments}
                />
                <label className="processing">
                    <span>На обработку</span>
                    <Switch onChange={changeProcessingHandler} checked={processing} />
                </label>
                <div className="total-price-block">
                    {!!payments.length && (
                        <div className="total-price-paid">
                            <div className="title">Оплата:</div>
                            <div
                                className={`price ${
                                    totalPrice !== totalPricePayments ? "danger" : "success"
                                } `}
                            >
                                {formatPrice(totalPricePayments)} сум
                            </div>
                        </div>
                    )}
                    <div className="total-price-paid">
                        <div className="title">Сумма к оплате:</div>
                        <div className="price">{formatPrice(totalPrice)} сум</div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default EditorOrder
