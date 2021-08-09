import React, {useEffect, useState} from "react"
import styled from "./RightBlock.module.css"
import {formatPrice} from "utils/formatPrice"
import Products from "./products/Products"
import Promo from "./promo/Promo"
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined"
import {useSelectAllProductCart} from "../../../cartSlice"
import Collapse, {Panel} from "rc-collapse"
import "rc-collapse/assets/index.css"
import motion from "utils/collapseMotionUtil"
import {useScreenSize} from "hooks/useScreenSize"
import LeftOutlined from "@ant-design/icons/LeftOutlined"
import {Delivery} from "types/Delivery"
import {AdditionalService} from "types/AdditionalService"

const expandIcon = ({isActive}: any) => (
    <LeftOutlined className={`${styled.icon} ${isActive && styled.active}`} />
)

interface RightBlockProps {
    delivery: Delivery | null
    promoCode: any
    setPromoCode: any
    total: any
    additionalService: AdditionalService | null
    setTotal: any
}

const RightBlock: React.FC<RightBlockProps> = ({
    delivery,
    promoCode,
    setPromoCode,
    setTotal,
    total,
    additionalService
}) => {
    const [priceProducts, setPriceProducts] = useState(0)
    const products = useSelectAllProductCart()
    const {width} = useScreenSize()

    useEffect(() => {
        const price = products.reduce((state, product) => {
            return (state += product.total_price)
        }, 0)
        setPriceProducts(price)
    }, [products])

    useEffect(() => {
        let total = priceProducts
        if (promoCode) {
            if (promoCode?.type === "percent")
                total = priceProducts - (priceProducts / 100) * promoCode.discount
            else total = priceProducts - promoCode.discount
        }

        if (additionalService) total += additionalService.price

        setTotal(total)
    }, [promoCode, priceProducts, setTotal, additionalService])

    const content = (
        <>
            <Products />
            <Promo promoCode={promoCode} setPromoCode={setPromoCode} />
            <div className={styled.prices}>
                <div className={styled.price}>
                    <div>Сумма по товарам</div>
                    <div>{formatPrice(total)} сум</div>
                </div>
                <div className={styled.price}>
                    <div>Стоимость доставки</div>
                    <div>{delivery ? `${formatPrice(delivery.price)} сум` : "Выберите доставку"}</div>
                </div>
                <div className={styled.price}>
                    <div>Упаковка</div>
                    <div>{formatPrice(additionalService?.price || 0)} сум</div>
                </div>
            </div>
            <div className={styled.total}>
                <div className={styled.title}>Итого:</div>
                <div>{formatPrice(total + (delivery ? delivery.price : 0))} сум</div>
            </div>
        </>
    )

    return (
        <div className={styled.rightBlock} id="order-right-block">
            {width > 992 ? (
                content
            ) : (
                <Collapse openMotion={motion} className={styled.collapse} expandIcon={expandIcon}>
                    <Panel
                        header={
                            <div className={styled.collapseHeaderContent}>
                                <div className={styled.collapseHeaderTitle}>
                                    <ShoppingCartOutlined />
                                    Список товаров
                                </div>
                                <div className={styled.collapseHeaderPrice}>{formatPrice(total)} сум</div>
                            </div>
                        }
                        headerClass={styled.collapseHeader}
                        className={styled.collapsePanel}
                    >
                        {content}
                    </Panel>
                </Collapse>
            )}
        </div>
    )
}

export default RightBlock
