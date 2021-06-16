import React from "react"
import LogoPng from "assets/images/logo.png"
import QRPng from "assets/images/qr.png"
import "./print.css"
import {formatPrice} from "utils/formatPrice"
import {OrderPayment} from "lib/types/Order"

interface PrintProps {
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

const Print: React.FC<PrintProps> = ({
    products,
    totalPrice,
    additionalServices,
    order,
    sizes,
    payments,
    discount,
    payChange
}) => {
    return (
        <div id="check-print" className="for-print">
            <table className="header">
                <tbody>
                    <tr>
                        <td className="logo">
                            <img src={LogoPng} alt="logo" />
                        </td>
                    </tr>
                    <tr>
                        <td className="company">YATT "KODENKO LYAYSAN MARSELEVNA"</td>
                    </tr>
                    <tr>
                        <td className="company">ЧЕК №{order.id}</td>
                    </tr>
                </tbody>
            </table>
            <table className="products">
                <thead>
                    <tr>
                        <th>АРТИКУЛ</th>
                        <th>НАИМЕНОВАНИЕ</th>
                        <th>РАЗМЕР</th>
                        <th>КОЛ-ВО</th>
                        <th>СУММА</th>
                        <th>ИТОГО</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="margin-no-border" colSpan={6} />
                    </tr>
                    {products.map(({size_id, product, product_color_id, qty}: any) => [
                        <tr className="product" key={`basic-${product_color_id}${size_id}`}>
                            <td>
                                PC{product_color_id}S{size_id}
                            </td>
                            <td className="title">
                                <div>
                                    {product.details.title} <div>{product.color.title}</div>
                                </div>
                            </td>
                            <td className="size">
                                {sizes.find((size: any) => Number(size.id) === Number(size_id))?.title}
                            </td>
                            <td className="qty">{qty}</td>
                            <td>{formatPrice(product.details.price, product.discount)}</td>
                            <td>{formatPrice(product.details.price * qty, product.discount)}</td>
                        </tr>,
                        <tr key={`border-${product_color_id}${size_id}`}>
                            <td className="margin-no-border" colSpan={6} />
                        </tr>
                    ])}
                    {additionalServices.map(additionalService => [
                        <tr className="product" key={additionalService.id}>
                            <td colSpan={3}>{additionalService.title}</td>
                            <td className="qty">{additionalService.qty}</td>
                            <td>{formatPrice(additionalService.price)}</td>
                            <td>{formatPrice(additionalService.price * additionalService.qty)}</td>
                        </tr>,
                        <tr key={`border-${additionalService.id}`}>
                            <td className="margin-no-border" colSpan={6} />
                        </tr>
                    ])}
                </tbody>
            </table>
            <div className="total-block">
                {discount && (
                    <div className="discount">
                        <div>Скидка:</div>
                        <div>
                            {discount.type === "fixed"
                                ? `${formatPrice(discount.discount)} сум`
                                : `${discount.discount}%`}
                        </div>
                    </div>
                )}
                <div className="total">
                    <div>ИТОГО К ОПЛАТЕ:</div>
                    <div>{formatPrice(totalPrice)} сум</div>
                </div>
                {payments.map(payment => (
                    <div className="sub" key={payment.payment_id}>
                        <div>{payment.label}:</div>
                        <div>{formatPrice(payment.price)} сум</div>
                    </div>
                ))}
            </div>
            <div className="information">
                <div className="">ПОСЕТИТЕ НАШ САЙТ</div>
                <div className="qr-image">
                    <img src={QRPng} alt="qr" />
                </div>
                <div>СПАСИБО ЗА ПОКУПКУ</div>
                <div>С любовью Сана ♥</div>
                <div>УЗБЕКИСТАН, Г. ТАШКЕНТ, УЛ. МОШТАБИБ, ДОМ 5</div>
            </div>
        </div>
    )
}

export default Print
