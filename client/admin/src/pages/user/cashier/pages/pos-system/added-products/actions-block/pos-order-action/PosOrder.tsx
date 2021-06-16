import {Alert, Form, InputNumber, Switch} from "antd"
import {Client} from "lib/types/Client"
import React, {useCallback, useEffect, useState} from "react"
import {createPosOrder} from "store/cashier/order/createPosOrder"
import {
    useAdditionalServicesPos,
    useDiscountPos,
    useSelectAllPosProductColors,
    useTotalPricePos
} from "store/cashier/pos/posSelectors"
import {clearCart} from "store/cashier/pos/posSlice"
import {useCashierDispatch} from "store/cashier/store"
import printJS from "print-js"
import {formatPrice} from "utils/formatPrice"
import {unwrapResult} from "@reduxjs/toolkit"
import Print from "./Print"
import ReactDOMServer from "react-dom/server"
import "./print.css"
import ClientAction from "./client-action/ClientAction"
import {useSelectAllSizes} from "store/common/size/sizeSelectors"
//size: 76.2mm 101.6mm; /*set any size you want*/
// 96.2
// 103.6

const styled = (h: number) => `
@media print {
    @page {
        size: 76.2mm ${h}mm; /*set any size you want*/
        page-break: avoid;
    }

    * {
        page-break: avoid;
    }
}
.for-print {
    width: 100%;
    overflow: hidden;
    font-family: Jost, sans-serif;
    color: black;
    font-size: 2mm;
    page-break: avoid;
}

.for-print .header {
    white-space: nowrap;
    margin-bottom: 1mm;
    width: 100%;
}

.for-print .header .logo {
    text-align: center;
}

.for-print .header .logo img {
    width: 60%;
    margin: 0 auto 1mm;
}

.for-print .header .company {
    text-align: center;
}

.for-print .products {
    width: 100%;
    margin-bottom: 0.5mm;
    border-collapse: collapse;
}

.for-print .products th {
    border: 1px solid black;
    text-align: center;
    font-weight: normal;
}

.for-print .products th,
.for-print .products td {
    padding: 0.5mm;
    white-space: nowrap;
}

.for-print .products .product {
    border: 1px solid black;
}

.for-print .products .product .title {
    line-height: 1.2;
    white-space: normal;
}

.for-print .products .product .size,
.for-print .products .product .qty {
    text-align: center;
}

.for-print .products .margin-no-border {
    padding: 1mm;
}

.for-print .total-block {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 3mm;
}

.for-print .total {
    font-size: 3mm;
    margin-bottom: 1mm;
    font-weight: bolder;
    display: flex;
    justify-content: space-between;
}

.for-print .total div {
    display: inline-block;
}

.for-print .total div:first-child {
    margin-right: 1mm;
}

.for-print .sub {
    text-align: left;
    font-size: 2mm;
    margin-bottom: .5mm;
    display: flex;
    justify-content: space-between;
}

.for-print .sub div {
    display: inline-block;
}

.for-print .sub div:first-child {
    margin-right: 1mm;
}

.for-print .information {
    text-align: center;
}

.for-print .information > div {
    margin-bottom: .5mm;
    font-size: 2mm;
}

.for-print .information .qr-image {
    width: 50%;
    margin: 0 auto;
}

.for-print .information .qr-image img {
    width: 100%;
}
`

interface PosOrderProps {
    setLoading: any
    updateDisabled: any
    close: any
}

const PosOrder: React.FC<PosOrderProps> = ({setLoading, close, updateDisabled}) => {
    const [selectClient, setSelectClient] = useState<Client | null>(null)
    const [payChange, setPayChange] = useState(0)
    const [cardTotal, setCardTotal] = useState(0)
    const [cashTotal, setCashTotal] = useState(0)
    const [processing, setProcessing] = useState<boolean>(false)
    const dispatch = useCashierDispatch()
    const products = useSelectAllPosProductColors()
    const totalPrice = useTotalPricePos()
    const additionalServices = useAdditionalServicesPos()
    const discount = useDiscountPos()
    const sizes = useSelectAllSizes()

    const updateSelectClient = useCallback((client: Client | null) => {
        setSelectClient(client)
    }, [])

    const onFinishHandler = async (values: any) => {
        setLoading(true)

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
                payments: {
                    cash: values.cash - payChange,
                    card: values.card
                },
                discount: discount,
                products: orderProducts,
                total_price: totalPrice
            })
        )
        const response: any = unwrapResult(promise)

        await printJS({
            targetStyles: ["*"],
            targetStyle: ["*"],
            printable: ReactDOMServer.renderToStaticMarkup(
                <Print
                    additionalServices={additionalServices}
                    products={products}
                    totalPrice={totalPrice}
                    order={response}
                    sizes={sizes}
                    cashTotal={cashTotal}
                    cardTotal={cardTotal}
                    payChange={payChange}
                />
            ),
            type: "raw-html",
            // css: "./print.css",
            style: styled(88.8 + (7.7 * products.length + 5 * additionalServices.length))
        })

        dispatch(clearCart())
        setLoading(false)
        close()
    }

    const changeCashTotalHandler = (e: any) => {
        setCashTotal(e)
    }

    const changeCardTotalHandler = (e: any) => {
        setCardTotal(e)
    }

    const changeProcessingHandler = (value: boolean) => {
        setProcessing(value)
    }

    useEffect(() => {
        const changePay = Number(cashTotal) + Number(cardTotal) - totalPrice
        setPayChange(Math.sign(changePay) > 0 ? changePay : 0)
    }, [cardTotal, cashTotal, totalPrice])

    useEffect(() => {
        if (totalPrice > cashTotal + cardTotal) updateDisabled(true)
        else updateDisabled(false)
    }, [cardTotal, cashTotal, totalPrice, updateDisabled])

    const priceStatus = totalPrice > cashTotal + cardTotal
    const leftToPay = totalPrice - (cardTotal + cashTotal)

    return (
        <>
            <ClientAction selectClient={selectClient} updateSelectClient={updateSelectClient} />
            <Form
                labelCol={{span: 6}}
                size="large"
                id="pos-create-order"
                className="pos-create-order"
                onFinish={onFinishHandler}
                initialValues={{cash: 0, card: 0}}
            >
                <Form.Item>
                    <Alert
                        type={priceStatus ? "error" : "success"}
                        message={`Сумма к оплате: ${formatPrice(
                            totalPrice
                        )} сум. Осталось внести: ${formatPrice(leftToPay > 0 ? leftToPay : 0)} сум`}
                        showIcon
                    />
                </Form.Item>
                <Form.Item label="Карта" name="card" validateStatus={priceStatus ? "error" : "success"}>
                    <InputNumber
                        onChange={changeCardTotalHandler}
                        formatter={val => formatPrice(Number(val))}
                        style={{width: "100%"}}
                    />
                </Form.Item>
                <Form.Item label="Наличные" name="cash" validateStatus={priceStatus ? "error" : "success"}>
                    <InputNumber
                        onChange={changeCashTotalHandler}
                        formatter={val => formatPrice(Number(val))}
                        style={{width: "100%"}}
                    />
                </Form.Item>
                <div className="pay-change">
                    <div className="total-price">
                        <div>Сдача:</div>
                        <div>{formatPrice(payChange)} сум</div>
                    </div>
                </div>
            </Form>
            <div>
                <label className="processing">
                    <span>На обработку</span>
                    <Switch onChange={changeProcessingHandler} checked={processing} />
                </label>
            </div>
        </>
    )
}
export default PosOrder
