import React, {useCallback, useEffect, useState} from "react"
import styled from "./Details.module.css"
import {formatPrice} from "../../../utils/formatPrice"
import Colors from "./colors/Colors"
import Sizes from "./sizes/Sizes"
import Button from "../../../components/button/Button"
import Measurements from "./measurements/Measurements"
import {useStickyBlockScroll} from "../../../hooks/useStickyBlockScroll"
import Properties from "./properties/Properties"
import CartButton from "./cart-button/CartButton"
import {Size} from "../../../types/size"
import WishlistButton from "./wishlist-button/WishlistButton"

interface DetailsProps {
    product: any
}

const Details: React.FC<DetailsProps> = ({product}) => {
    const ref = useStickyBlockScroll()
    const [size, setSize] = useState<Size["id"] | null>(null)
    const [requireSize, setRequireSize] = useState(false)

    const selectSizeHandler = useCallback((sizeId) => {
        setSize(sizeId)
    }, [])

    const outputErrorSizeHandler = useCallback(() => {
        setRequireSize(true)
    }, [])

    useEffect(() => {
        if (size)
            setRequireSize(false)
    }, [size])

    return (
        <div className={styled.details}>
            <div className={styled.info} ref={ref} id="product-details-info">
                <h1 className={styled.title}>{product.title} ({product.color.title})</h1>
                <div className={styled.tagId}>ID: PC{product.id}{size ? `S${size}` : null}</div>
                <div className={styled.price}>
                    {product.discount && <div className={styled.prevPrice}>
                        {formatPrice(product.price)} - <span className={styled.discount}>{product.discount.discount}%</span>
                    </div>}
                    <div className={styled.mainPrice}>
                        {formatPrice(product.price, product.discount)} сум
                    </div>
                </div>
                <Colors colors={product.colors} />
                <Sizes sizes={product.sizes_props} requireSize={requireSize} selectSizeHandler={selectSizeHandler} />
                <CartButton product={product} sizeId={size} outputErrorSizeHandler={outputErrorSizeHandler} />
                {/* <div className={styled.buyNow}> */}
                    {/* <Button type="primary" filled block>Купить сейчас</Button> */}
                {/* </div> */}
                <WishlistButton productId={product.id} />
                <Properties properties={product.properties} productId={product.product_id}>
                    <Measurements productId={product.product_id} />
                </Properties>
                {/*<ScrollActionButton/>*/}
            </div>
        </div>
    )
}

export default Details