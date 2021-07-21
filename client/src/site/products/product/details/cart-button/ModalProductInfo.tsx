import React from "react"
import ImageBlock from "components/image-block/ImageBlock"
import {Link} from "react-router-dom"
import {ProductColor} from "types/productColor"
import styled from "./ModalProductInfo.module.css"
import Button from "components/button/Button"
import {formatPrice} from "utils/formatPrice"

interface ModalProductInfoProps {
    product: ProductColor
    close: () => void
}

const ModalProductInfo: React.FC<ModalProductInfoProps> = ({product, close}) => {
    return (
        <>
            <div className={styled.content}>
                <p className={styled.text}>Спасибо!</p>
                <p className={`${styled.text} ${styled.mb}`}>Вы добавили товар в корзину:</p>
                <div className={styled.imageBlock}>
                    <div className={styled.image}>
                        <ImageBlock src={product.images[0].url} />
                    </div>
                </div>

                <p className={styled.title}>{product.title}</p>
                <p className={styled.price}>{formatPrice(product.price, product.discount)} сум</p>
                <div className={styled.button}>
                    <Link to="/cart/order">
                        <Button type="secondary" filled>
                            оформить заказ
                        </Button>
                    </Link>
                </div>
                <div className={styled.actions}>
                    <Link to="/cart">ПРОСМОТРЕТЬ КОРЗИНУ</Link>
                    <div onClick={close}>ПРОДОЛЖИТЬ ПОКУПКИ</div>
                </div>
            </div>
        </>
    )
}
export default ModalProductInfo
