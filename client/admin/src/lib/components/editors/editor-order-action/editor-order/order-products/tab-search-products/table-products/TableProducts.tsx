import React from "react"
import "./TableProducts.less"
import {ProductColor} from "lib/types/product/ProductColor"
import {Table} from "antd"
import ImageBlock from "lib/components/blocks/image-block/ImageBlock"
import PriceBlock from "lib/components/blocks/price-block/PriceBlock"
import ActionButton from "./action-button/ActionButton"

const columns = ({addProduct, deleteProduct, addedProducts}: any) => {
    return [
        {
            title: "ID",
            dataIndex: ["id"],
            key: "id"
        },
        {
            title: "Фото",
            dataIndex: ["url_thumbnail"],
            key: "url_thumbnail",
            render: (image: string, record: any) => (
                <div style={{width: "70px"}}>
                    <ImageBlock image={image} title={record.details.title} />
                </div>
            )
        },
        {
            title: "Название",
            dataIndex: ["details", "title"],
            key: "title",
            render: (title: string, record: any) => `${title} (${record.color.title})`
        },
        {
            title: "Цена",
            dataIndex: ["details", "price"],
            key: "price",
            render: (price: number, product: any) => <PriceBlock discount={product.discount} price={price} />
        },
        {
            render: (_: any, product: any) => (
                <ActionButton
                    product={product}
                    addedProducts={addedProducts}
                    addProduct={addProduct}
                    deleteProduct={deleteProduct}
                />
            )
        }
    ]
}

interface ListProductsProps {
    loading: boolean
    addProduct: any
    deleteProduct: any
    addedProducts: any
    products: ProductColor[]
}

const TableProducts: React.FC<ListProductsProps> = ({
    loading,
    products,
    addProduct,
    addedProducts,
    deleteProduct
}) => {
    return (
        <Table
            columns={columns({addProduct, addedProducts, deleteProduct})}
            pagination={false}
            dataSource={products}
            loading={loading}
            rowKey="id"
        />
    )
}

export default TableProducts
