import React, {useState} from "react"
import {apiRequest} from "utils/api"
import {Space, Form, Select, Typography} from "antd"
import {ProductColor} from "../../../types/product/ProductColor"
import "./SelectProducts.less"
import {useEffect} from "react"
import {useCallback} from "react"

const {Text} = Typography

interface SelectProductsProps {
    defautlValue?: string | number
    name?: string
    selectProduct?: (product: ProductColor | undefined) => void
}

const SelectProducts: React.FC<SelectProductsProps> = ({
    selectProduct,
    name = "product_id",
    defautlValue
}) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<ProductColor[]>([])
    const [prevTimeout, setPrevTimeout] = useState<any>(0)

    const onChangeHandler = async (value: any) => {
        selectProduct && selectProduct(products.find(product => product.id === value))
    }

    const onSearchHandler = async (value: string) => {
        clearTimeout(prevTimeout)
        if (value.trim().length) {
            setLoading(true)
            setPrevTimeout(
                setTimeout(async () => {
                    await searchProductColor(value)
                }, 500)
            )
        } else {
            setLoading(false)
        }
    }

    const searchProductColor = useCallback(async (value: string) => {
        try {
            const response = await apiRequest("post", `admin/product-colors`, {data: {search: value}})
            setProducts(response)
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        if (defautlValue) {
            setLoading(true)
            searchProductColor(String(defautlValue))
        }
    }, [searchProductColor, defautlValue])

    return (
        <Form.Item name={name} label="Продукт" rules={[{required: true, message: "Выберите продукт!"}]}>
            <Select
                showSearch
                filterOption={false}
                onSearch={onSearchHandler}
                onChange={onChangeHandler}
                loading={loading}
                placeholder="Введите название продукта"
            >
                {products.map(product => (
                    <Select.Option value={product.id} key={product.id}>
                        <Space>
                            <Text type="secondary">ID: {product.id}</Text>
                            <span>
                                {product.details.title} ({product.color.title})
                            </span>
                        </Space>
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default SelectProducts
