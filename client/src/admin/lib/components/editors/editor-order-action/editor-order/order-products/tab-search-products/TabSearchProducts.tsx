import React, {useState} from "react"
import {Input} from "antd"
import {ProductColor} from "../../../../../../types/product/ProductColor"
import {apiRequest} from "../../../../../../../utils/api"
import TableProducts from "./table-products/TableProducts"

interface TabSearchProductsProps {
    addProduct: any
    addedProducts: any
    deleteProduct: any
}

const TabSearchProducts: React.FC<TabSearchProductsProps> = ({addProduct, addedProducts, deleteProduct}) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<ProductColor[]>([])
    const [prevTimeout, setPrevTimeout] = useState<any>(0)

    const onSearchHandler = async (value: string) => {
        clearTimeout(prevTimeout)
        if (value.trim().length) {
            setLoading(true)
            setPrevTimeout(
                setTimeout(async () => {
                    await searchClient(value)
                }, 500)
            )
        } else {
            setLoading(false)
        }
    }

    const searchClient = async (value: string) => {
        try {
            const response = await apiRequest("post", `admin/product-colors`, {data: {search: value}})
            setProducts(response)
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

    return (
        <>
            <Input.Search
                size="large"
                placeholder="Введите id или название товара"
                width="100%"
                style={{marginBottom: "1rem"}}
                onSearch={onSearchHandler}
            />
            <TableProducts
                loading={loading}
                products={products}
                addProduct={addProduct}
                addedProducts={addedProducts}
                deleteProduct={deleteProduct}
            />
        </>
    )
}

export default TabSearchProducts
