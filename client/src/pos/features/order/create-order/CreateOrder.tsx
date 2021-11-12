import {Client} from "types/Client"
import React, {useCallback, useState} from "react"
import {useCreateOrderMutation} from "pos/features/order/orderApi"
import {
    changeCreateOrderButton,
    clearCart,
    useCartParams,
    useCartProductColors
} from "pos/features/cart/cartSlice"
import {useDispatch} from "pos/store"
import {useGetSizeQuery} from "pos/layouts/header/sizeApi"
import "./CreateOrder.less"
import Header from "./Header"
import {useCheckPrint} from "pos/features/print/CheckPrint"
import {Button, Form} from "antd"
import ProcessingBlock from "./create-order-form/ProcessingSwitch"
import PriceList from "./create-order-form/PriceList"
import Discount from "./create-order-form/Discount"
import ClientSearch from "./create-order-form/ClientSearch"
import ClientSourceList from "./create-order-form/ClientSourceList"
import Payments from "./create-order-form/Payments"

interface CreateOrderProps {
    close: () => void;
}

const CreateOrder: React.FC<CreateOrderProps> = ({close}) => {
    const [form] = Form.useForm()
    const [selectClient, setSelectClient] = useState<Client | null>(null)
    const products = useCartProductColors()
    const {
        totalPrice,
        additionalServices,
        discount,
        processing,
        payments,
        createOrderButton,
        payChange,
        clientSource,
        clientSourceComment
    } = useCartParams()
    const print = useCheckPrint()
    const dispatch = useDispatch()
    const {data: sizes} = useGetSizeQuery()
    const [createOrder] = useCreateOrderMutation()

    const updateSelectClient = useCallback((client: Client | null) => {
        setSelectClient(client)
    }, [])

    const clearPaymentHandler = useCallback(
        (payments: any) => {
            form.resetFields(["payments", payments.id])
        },
        [form]
    )

    const onFinishHandler = async () => {
        dispatch(changeCreateOrderButton({loading: true}))

        const orderProducts = products.map(
            ({product, product_color_id, qty, size_id}) => ({
                discount: product?.discount,
                id: product_color_id,
                qty,
                size_id,
                price: product.price
            })
        )

        const orderPayments = payments.map(payment => {
            return {...payment, price: payment.price - payChange}
        })

        const response = await createOrder({
            additionalServices: additionalServices,
            processing: processing,
            client: selectClient,
            payments: orderPayments,
            discount: discount,
            products: orderProducts,
            total_price: totalPrice,
            clientSourceId: clientSource?.id,
            clientSourceComment: clientSourceComment
        })

        await print({
            additionalServices,
            products,
            totalPrice,
            order: response,
            payments,
            discount,
            payChange,
            sizes
        })

        dispatch(clearCart())
        form.resetFields()
        setSelectClient(null)
        close()
    }

    return (
        <Form
            form={form}
            className="create-order"
            layout="vertical"
            size="large"
            onFinish={onFinishHandler}
        >
            <Header close={close} />
            <div className="container">
                <div className="create-order-form">
                    <Payments clearPaymentHandler={clearPaymentHandler} />
                </div>
                <div className="finish-block">
                    <div className="cart-details">
                        <ClientSearch
                            selectClient={selectClient}
                            updateSelectClient={updateSelectClient}
                        />
                        <ClientSourceList />
                        <div className="fixed">
                            <Discount />
                            <PriceList />
                            <ProcessingBlock />
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                block
                                disabled={createOrderButton.disabled}
                                loading={createOrderButton.loading}
                            >
                                Завершить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    )
}
export default React.memo<CreateOrderProps>(CreateOrder)
