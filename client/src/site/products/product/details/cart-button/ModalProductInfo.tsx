import React from "react"
import ImageBlock from "components/image-block/ImageBlock"
import {Link, useHistory} from "react-router-dom"
import {ProductColor} from "types/productColor"
import styled from "./ModalProductInfo.module.css"
import Button from "components/button/Button"
import {formatPrice} from "utils/formatPrice"
import Drawer from "components/drawer/Drawer"
import OrderingDrawer from "../../../../cart/order/Order"
import {useState} from "react"
import {useCallback} from "react"

interface ModalProductInfoProps {
    product: ProductColor
    close: () => void
}

const ModalProductInfo: React.FC<ModalProductInfoProps> = ({product, close}) => {
    const history = useHistory()
    const [visible, setVisible] = useState(false)

    const onClickHandler = () => {
        close()
        setVisible(true)
    }

    const closeOrder = useCallback(() => {
        history.push("/cart")
        setVisible(false)
    }, [history])

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
                    <Button type="secondary" filled onClick={onClickHandler}>
                        оформить заказ
                    </Button>
                </div>
                <div className={styled.actions}>
                    <Link to="/cart">ПРОСМОТРЕТЬ КОРЗИНУ</Link>
                    <div onClick={close}>ПРОДОЛЖИТЬ ПОКУПКИ</div>
                </div>
            </div>
            <Drawer visible={visible} width="100%" placement="right" onClose={closeOrder}>
                <OrderingDrawer onClose={closeOrder} />
            </Drawer>
        </>
    )
}
export default ModalProductInfo
