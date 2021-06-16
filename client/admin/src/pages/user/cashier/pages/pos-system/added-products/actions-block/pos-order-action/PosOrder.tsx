import {Client} from "lib/types/Client"
import React, {useCallback, useState} from "react"
import {createPosOrder} from "store/cashier/order/createPosOrder"
import {
    useAdditionalServicesPos,
    useDiscountPos,
    usePayChange,
    usePayments,
    useProcessing,
    useSelectAllPosProductColors,
    useTotalPricePos
} from "store/cashier/pos/posSelectors"
import {changeButtonSubmit, clearCart} from "store/cashier/pos/posSlice"
import {useCashierDispatch} from "store/cashier/store"
import {unwrapResult} from "@reduxjs/toolkit"
import {useSelectAllSizes} from "store/common/size/sizeSelectors"
import "./PosOrder.less"
import Header from "./header/Header"
import {useCheckPrint} from "utils/CheckPrint"
import Container from "./container/Container"

const PosOrder: React.FC = () => {
    const [selectClient, setSelectClient] = useState<Client | null>(null)
    const dispatch = useCashierDispatch()
    const products = useSelectAllPosProductColors()
    const totalPrice = useTotalPricePos()
    const additionalServices = useAdditionalServicesPos()
    const discount = useDiscountPos()
    const sizes = useSelectAllSizes()
    const print = useCheckPrint()

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
            price: product.details.price
        }))

        const promise = await dispatch(
            createPosOrder({
                additionalServices: additionalServices,
                processing: processing,
                client: selectClient,
                payments: payments,
                discount: discount,
                products: orderProducts,
                total_price: totalPrice
            })
        )
        const response: any = unwrapResult(promise)

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
