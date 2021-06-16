import React, {useState} from "react"
import {apiRequest} from "../../../../utils/api"
import {Form, Select, Typography} from "antd"
import {ProductColor} from "../../../types/product/ProductColor"

const {Text} = Typography

interface SelectProductsProps {
    setProduct: any
}

const SelectProducts: React.FC<SelectProductsProps> = ({setProduct}) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<ProductColor[]>([])
    const [prevTimeout, setPrevTimeout] = useState<any>(0)

    const onChangeHandler = async (value: any) => {
        setProduct(products.find(product => product.id === value))
    }

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
        <Form.Item name="client_id" label="Продукт" rules={[{required: true, message: "Выберите продукт!"}]}>
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
                        <Text type="secondary">{product.id}</Text>
                        <img src={product.url_images[0]} alt={product.details.title} width="50px" />
                        {product.details.title}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default SelectProducts
