import React from "react"
import "./TabAddedProducts.less"
import {ProductColor} from "admin/lib/types/product/ProductColor"
import {Button, InputNumber, Table} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import TagSize from "./tag-size/TagSize"
import PriceBlock from "admin/lib/components/blocks/price-block/PriceBlock"

const columns = ({deleteProduct, updateProductQty}: any) => [
    {
        title: "ID",
        dataIndex: ["product", "id"],
        key: "id"
    },
    {
        title: "Фото",
        dataIndex: ["product", "url_thumbnail"],
        key: "thumbnail",
        render: (text: any, record: any) => <img src={text} alt={record.product.details.title} width="50px" />
    },
    {
        title: "Название",
        dataIndex: ["product", "details", "title"],
        key: "title"
    },
    {
        title: "Размер",
        dataIndex: ["size_id"],
        key: "size_id",
        render: (text: number) => <TagSize sizeId={text} />
    },
    {
        title: "Стоимость",
        dataIndex: ["product", "details", "price"],
        key: "price",
        render: (text: number, {product}: any) => <PriceBlock discount={product?.discount} price={text} />
    },
    {
        title: "Кол-во",
        dataIndex: ["product", "sizes"],
        key: "qty",
        render: (text: any, record: any) => <>{text[record.size_id].qty}</>
    },
    {
        dataIndex: ["product", "sizes"],
        key: "count",
        render: (text: any, {size_id, product_color_id}: any) => (
            <InputNumber
                size="large"
                max={text[size_id].qty}
                min={1}
                defaultValue={1}
                onChange={value => {
                    updateProductQty({size_id, product_color_id, qty: value})
                }}
            />
        )
    },
    {
        render: (text: any, {size_id, product_color_id}: any) => (
            <Button
                size="large"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteProduct({size_id, product_color_id})}
            />
        )
    }
]

interface TabAddedProductsProps {
    deleteProduct: any
    updateProductQty: any
    products: {
        qty: number
        product_color_id: number
        size_id: number
        product: ProductColor
    }[]
}

const TabAddedProducts: React.FC<TabAddedProductsProps> = ({products, deleteProduct, updateProductQty}) => {
    return (
        <div className="added-list-products">
            <Table
                columns={columns({deleteProduct, updateProductQty})}
                dataSource={products}
                pagination={false}
                rowKey={(record: any) => record.product.id + "-" + record.size_id}
            />
        </div>
    )
}

export default TabAddedProducts
