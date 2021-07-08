import React from "react"
import printJS from "print-js"
import ReactDOMServer from "react-dom/server"
import Print from "./Print"
import {OrderPayment} from "types/Order"

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

.for-print .products .product .discount-small {
    font-size: 1.7mm;
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

.for-print .discount {
    font-size: 2mm;
    margin-bottom: 1mm;
    font-weight: bolder;
    display: flex;
    justify-content: space-between;
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

interface Props {
    order: any
    products: any
    additionalServices: any[]
    totalPrice: any
    sizes: any
    discount: {
        type: string
        discount: number
    } | null
    payments: OrderPayment[]
    payChange: any
}

export const useCheckPrint = () => {
    const print = async ({
        additionalServices,
        products,
        totalPrice,
        order,
        sizes,
        discount,
        payments,
        payChange
    }: Props) => {
        await printJS({
            targetStyles: ["*"],
            targetStyle: ["*"],
            printable: ReactDOMServer.renderToStaticMarkup(
                <Print
                    additionalServices={additionalServices}
                    products={products}
                    totalPrice={totalPrice}
                    order={order}
                    sizes={sizes}
                    discount={discount}
                    payments={payments}
                    payChange={payChange}
                />
            ),
            type: "raw-html",
            // css: "./print.css",
            style: styled(
                88.8 + (7.7 * products.length + 5 * additionalServices.length + 2.5 * payments.length)
            )
        })
    }

    return print
}
