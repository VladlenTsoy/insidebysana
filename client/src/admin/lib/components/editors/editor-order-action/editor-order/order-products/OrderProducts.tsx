import React, {useCallback} from "react"
import {Badge, Tabs, Typography} from "antd"
import TabSearchProducts from "./tab-search-products/TabSearchProducts"
import TabAddedProducts from "./tab-added-products/TabAddedProducts"

const {Title} = Typography
const {TabPane} = Tabs

interface OrderProductsProps {
    products: any[]
    setProducts: any
    defaultActiveKey?: string
}

const OrderProducts: React.FC<OrderProductsProps> = ({defaultActiveKey, setProducts, products}) => {
    const addProduct = useCallback(
        product => {
            setProducts((prevState: any) => [...prevState, {...product, qty: 1}])
        },
        [setProducts]
    )

    const updateProductQty = useCallback(
        ({size_id, product_color_id, qty}: any) => {
            setProducts((prevState: any) =>
                prevState.map((product: any) => {
                    if (product.size_id === size_id && product.product_color_id === product_color_id)
                        product.qty = qty
                    return product
                })
            )
        },
        [setProducts]
    )

    const deleteProduct = useCallback(
        ({size_id, product_color_id}: any) => {
            setProducts((prevState: any) =>
                prevState.filter(
                    (product: any) =>
                        !(product.size_id === size_id && product.product_color_id === product_color_id)
                )
            )
        },
        [setProducts]
    )

    return (
        <div>
            <Title level={3}>Товары</Title>
            <div className="order-products-block">
                <Tabs defaultActiveKey={defaultActiveKey || "1"} size="large" style={{marginBottom: 32}}>
                    <TabPane tab="Поиск товаров" key="1">
                        <TabSearchProducts
                            addProduct={addProduct}
                            addedProducts={products}
                            deleteProduct={deleteProduct}
                        />
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                                Добавленные товары <Badge count={products.length} />
                            </>
                        }
                        key="2"
                    >
                        <TabAddedProducts
                            products={products}
                            deleteProduct={deleteProduct}
                            updateProductQty={updateProductQty}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default OrderProducts
