import {Table} from "antd"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import PriceBlock from "components/blocks/price-block/PriceBlock"
import {Order, OrderProductColor} from "types/Order"
import React, {useEffect, useState} from "react"
import {apiRequest} from "utils/api"

const columns = [
    {
        title: "SKU",
        // dataIndex: ["details", "id"]
        render: (_: any, record: any) => `PC${record.details.id}S${record.size.id}`
    },
    {
        title: "Картинка",
        dataIndex: ["details", "url_thumbnail"],
        render: (url_thumbnail: string) => (
            <div style={{width: "70px"}}>
                <ImageBlock image={url_thumbnail} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: ["details", "title"]
    },
    {
        title: "Размер",
        dataIndex: ["size", "title"]
    },
    {
        title: "Кол-во",
        dataIndex: ["qty"]
    },
    {
        title: "Цена",
        render: (_: any, product: any) => (
            <PriceBlock
                price={product.price}
                discount={product.discount ? {discount: product.discount} : undefined}
            />
        )
    }
]

interface ProductsProps {
    orderId: Order["id"]
}

const Products: React.FC<ProductsProps> = ({orderId}) => {
    const [products, setProducts] = useState<OrderProductColor[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const response = await apiRequest("get", `admin/order/${orderId}/products`)
                setProducts(response)
                setLoading(false)
            } catch (e) {
                console.error(e)
                setLoading(false)
            }
        })()
    }, [orderId])

    return (
        <div className="products">
            <Table
                loading={loading}
                dataSource={products}
                columns={columns}
                pagination={false}
                size="large"
                rowKey={(row: any) => `${row.details.id}${row.size.id}`}
            />
        </div>
    )
}
export default Products
