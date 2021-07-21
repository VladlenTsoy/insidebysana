import {Table} from "antd"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import {Client} from "types/Client"
import {OrderProductColor} from "types/Order"
import React, {useEffect, useState} from "react"
import {apiRequest} from "utils/api"

const columns = [
    {
        title: "SKU",
        dataIndex: "sku"
    },
    {
        title: "Фото",
        dataIndex: "url_thumbnail",
        render: (image: string, record: any) => (
            <div style={{width: "70px"}}>
                <ImageBlock image={image} title={record.title} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        title: "Размер",
        dataIndex: ["size", "title"]
    },
    {
        title: "Кол-во",
        dataIndex: "qty"
    }
]

interface CartProps {
    clientId: Client["id"]
}

const Cart: React.FC<CartProps> = ({clientId}) => {
    const [productColors, setProductColors] = useState<OrderProductColor[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await apiRequest("get", `admin/client/${clientId}/cart`)
                setProductColors(response)
                setLoading(false)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [clientId])

    return (
        <>
            <Table loading={loading} dataSource={productColors} pagination={false} columns={columns} />
        </>
    )
}
export default Cart
