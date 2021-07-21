import {Table} from "antd"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import {Client} from "types/Client"
import {OrderProductColor} from "types/Order"
import React, {useEffect, useState} from "react"
import {apiRequest} from "utils/api"

const columns = [
    {
        title: "ID",
        dataIndex: "id"
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
    }
]

interface WishlistProps {
    clientId: Client["id"]
}

const Wishlist: React.FC<WishlistProps> = ({clientId}) => {
    const [productColors, setProductColors] = useState<OrderProductColor[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await apiRequest("get", `admin/client/${clientId}/wishlist`)
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
export default Wishlist
