import React from "react"
import {Table, Tag} from "antd"
import {useGetAllProductsQuery} from "./productApi"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import {formatDate} from "utils/formatDate"
import PriceBlock from "components/blocks/price-block/PriceBlock"
import MenuButton from "admin/lib/components/menu-button/MenuButton"
import DropdownMenu from "admin/pages/user/admin/pages/products/container/dropdown-menu/DropdownMenu"

const columns = [
    {
        title: "ID",
        dataIndex: "id",
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
        render: (title: string, record: any) => (
            <>
                {title} ({record.color.title}) {record.is_new ? <Tag color="green">New</Tag> : <></>}
            </>
        ),
        sorter: true
    },
    {
        title: "Цена",
        dataIndex: ["details", "price"],
        key: "price",
        sorter: true,
        render: (val: number, record: any) => <PriceBlock discount={record.discount} price={val} />
    },
    {
        title: "Теги",
        dataIndex: "tags",
        render: (tags: any[], record: any) => (
            <div className="column-tags">
                {tags.map(tag => (
                    <Tag color="blue" key={`${record.id}-${tag.tag_id}`}>
                        {tag.title}
                    </Tag>
                ))}
            </div>
        )
    },
    {
        title: "Дата",
        dataIndex: "created_at",
        key: "created_at",
        sorter: true,
        defaultSortOrder: "descend" as "descend",
        render: (created: string) => formatDate(created)
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={DropdownMenu(record)} size="large" />
    }
]

const ProductList: React.FC = () => {
    const {isLoading, data} = useGetAllProductsQuery()

    return (
        <>
            <Table
                size="large"
                loading={isLoading}
                rowKey="id"
                scroll={{x: "100%"}}
                pagination={{pageSize: 20}}
                dataSource={data}
                columns={columns}
                // onChange={onChange}
            />
        </>
    )
}
export default ProductList
