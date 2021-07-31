import {Client} from "types/Client"
import React, {useCallback, useState} from "react"
import {useCreateOrderMutation} from "pos/features/order/orderApi"
import {useCartProductColors, useCartParams} from "pos/features/cart/cartSlice"
import {clearCart} from "pos/features/cart/cartSlice"
import {useDispatch} from "pos/store"
import {useGetSizeQuery} from "pos/layouts/header/sizeApi"
import "./CreateOrder.less"
import Header from "./Header"
import {useCheckPrint} from "utils/CheckPrint"
import Container from "./container/Container"
import {Button} from "antd"
import ProcessingBlock from "./create-order-form/ProcessingSwitch"
import PriceList from "./create-order-form/PriceList"
import Discount from "./create-order-form/Discount"
import PaymentsBlock from "./container/payments-block/PaymentBlock"
import ClientSearch from "./create-order-form/ClientSearch"
import Form from "antd/lib/form/Form"
import ClientSourceList from "./create-order-form/ClientSourceList"

interface CreateOrderProps {
    close: () => void
}

const CreateOrder: React.FC<CreateOrderProps> = ({close}) => {
    const [selectClient, setSelectClient] = useState<Client | null>(null)
    const products = useCartProductColors()
    const {
        totalPrice,
        additionalServices,
        discount,
        processing,
        payments,
        createOrderButton
    } = useCartParams()
    // const print = useCheckPrint()
    const dispatch = useDispatch()
    const {data: sizes} = useGetSizeQuery()
    const [createOrder] = useCreateOrderMutation()

    const updateSelectClient = useCallback((client: Client | null) => {
        setSelectClient(client)
    }, [])

    const onFinishHandler = async (values: any) => {
        // dispatch(changeButtonSubmit({loading: true}))

        const orderProducts = products.map(({product, product_color_id, qty, size_id}) => ({
            discount: product?.discount,
            id: product_color_id,
            qty,
            size_id,
            price: product.price
        }))

        const response = await createOrder({
            additionalServices: additionalServices,
            processing: processing,
            client: selectClient,
            payments: payments,
            discount: discount,
            products: orderProducts,
            total_price: totalPrice
        })

        // await print({
        //     additionalServices,
        //     products,
        //     totalPrice,
        //     order: response,
        //     payments,
        //     discount,
        //     payChange,
        //     sizes
        // })

        dispatch(clearCart())
        close()
    }

    return (
        <Form className="create-order" layout="vertical" size="large">
            <div className="header"></div>
            <div className="container">
                <div className="create-order-form">
                    <div></div>
                </div>
                <div className="finish-block">
                    <div className="cart-details">
                        <ClientSearch selectClient={selectClient} updateSelectClient={updateSelectClient} />
                        <ClientSourceList />
                        <div className="fixed">
                            <Discount />
                            <PriceList />
                            <ProcessingBlock />
                            <Button
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
            {/* <Header close={close} />
            <Container
                selectClient={selectClient}
                updateSelectClient={updateSelectClient}
                onFinishHandler={onFinishHandler}
            /> */}
        </Form>
    )
}
export default React.memo<CreateOrderProps>(CreateOrder)
