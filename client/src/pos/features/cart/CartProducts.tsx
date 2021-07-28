import React from "react"
import {useCartProductColors, useTotalPricePos} from "pos/features/cart/cartSlice"
import ProductCart from "./CartProductItem"
import {Button} from "antd"
import "./CartProducts.less"
import {formatPrice} from "utils/formatPrice"
import AdditionalServicesAction from "pos/features/additional-services/AdditionalServicesAction"
import PosOrderAction from "pos/features/order/create-order/PosOrderAction"
import {FlagOutlined} from "@ant-design/icons"

interface AddedProductsProps {}

const AddedProducts: React.FC<AddedProductsProps> = () => {
    const products = useCartProductColors()
    const totalPrice = useTotalPricePos()

    return (
        <div className="cart-container">
            <div className="asdasd">
                <div className="cart-scroll-products">
                    {products.map(product => (
                        <ProductCart
                            product={product}
                            key={`${product.product_color_id}${product.size_id}`}
                        />
                    ))}
                </div>
                <div className="total-block">
                    <div className="additional-services-action">
                        <AdditionalServicesAction />
                    </div>
                    <div className="total-price">
                        <div>Сумма к оплате:</div>
                        <div>{formatPrice(totalPrice)} сум</div>
                    </div>
                    <PosOrderAction>
                        <Button
                            type="primary"
                            block
                            size="large"
                            disabled={!products.length}
                            icon={<FlagOutlined />}
                        >
                            Завершить
                        </Button>
                    </PosOrderAction>
                </div>
            </div>
        </div>
    )
}
export default AddedProducts
