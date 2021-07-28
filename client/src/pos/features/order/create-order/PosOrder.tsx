import {Client} from "types/Client"
import React, {useCallback, useState} from "react"
import {useCreateOrderMutation} from "pos/features/order/orderApi"
import {
    useAdditionalServicesPos,
    useDiscountPos,
    usePayChange,
    usePayments,
    useProcessing,
    useCartProductColors,
    useTotalPricePos
} from "pos/features/cart/cartSlice"
import {changeButtonSubmit} from "pos/home/posSlice"
import {clearCart} from "pos/features/cart/cartSlice"
import {useDispatch} from "pos/store"
import {useGetSizeQuery} from "pos/layouts/sizeApi"
import "./PosOrder.less"
import Header from "./header/Header"
import {useCheckPrint} from "utils/CheckPrint"
import Container from "./container/Container"

const PosOrder: React.FC = () => {
    const [selectClient, setSelectClient] = useState<Client | null>(null)
    const dispatch = useDispatch()
    const products = useCartProductColors()
    const totalPrice = useTotalPricePos()
    const additionalServices = useAdditionalServicesPos()
    const discount = useDiscountPos()
    const {data: sizes} = useGetSizeQuery()
    const print = useCheckPrint()
    const [createOrder] = useCreateOrderMutation()

    const processing = useProcessing()
    const payments = usePayments()
    const payChange = usePayChange()

    const updateSelectClient = useCallback((client: Client | null) => {
        setSelectClient(client)
    }, [])

    const onFinishHandler = async (values: any) => {
        dispatch(changeButtonSubmit({loading: true}))

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
    }

    return (
        <div className="pos-order">
            <Header />
            <Container
                selectClient={selectClient}
                updateSelectClient={updateSelectClient}
                onFinishHandler={onFinishHandler}
            />
        </div>
    )
}
export default React.memo(PosOrder)
