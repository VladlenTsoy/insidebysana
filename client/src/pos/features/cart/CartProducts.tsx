import React from "react"
import {useCartAdditionalServices, useCartParams, useCartProductColors} from "pos/features/cart/cartSlice"
import ProductCart from "./CartProductItem"
import {Button} from "antd"
import "./CartProducts.less"
import {formatPrice} from "utils/formatPrice"
import AdditionalServicesAction from "pos/features/additional-services/AdditionalServicesAction"
import CreateOrderAction from "pos/features/order/create-order/CreateOrderAction"
import {motion} from "framer-motion"
import CartAdditionalServiceItem from "../additional-services/CartAdditionalServiceItem"

interface AddedProductsProps {}

const AddedProducts: React.FC<AddedProductsProps> = () => {
    const products = useCartProductColors()
    const additionalServices = useCartAdditionalServices()
    const {totalPrice} = useCartParams()

    return (
        <motion.div
            animate={{opacity: 1, x: 0}}
            initial={{opacity: 0, x: 100}}
            exit={{opacity: 0, x: 100}}
            transition={{duration: 0.5}}
            className="cart-container"
        >
            <div className="cart-content">
                <div className="cart-scroll-products">
                    {products.map(product => (
                        <ProductCart
                            cartProduct={product}
                            key={`${product.product_color_id}${product.size_id}`}
                        />
                    ))}
                    {additionalServices.map(additionalService => (
                        <CartAdditionalServiceItem
                            additionalService={additionalService}
                            key={additionalService.id}
                        />
                    ))}
                </div>
                <div className="total-block">
                    <AdditionalServicesAction />
                    <div className="total-price">
                        <div>Сумма к оплате:</div>
                        <div>{formatPrice(totalPrice)} сум</div>
                    </div>
                    <CreateOrderAction>
                        <Button type="primary" block size="large" disabled={!products.length}>
                            Далее
                        </Button>
                    </CreateOrderAction>
                </div>
            </div>
        </motion.div>
    )
}
export default AddedProducts
