import React, {useEffect} from "react"
import ImageBlock from "../blocks/image-block/ImageBlock"
import PriceBlock from "../blocks/price-block/PriceBlock"
import {Menu, Table, Tag} from "antd"
import {formatDate} from "../../../utils/formatDate"
import MenuButton from "../menu-button/MenuButton"
import {useAdminDispatch} from "../../../store"
import {fetchProductColorsFromTrash} from "./fetchProductColorsFromTrash"
import {ProductColor} from "../../types/product/ProductColor"
import DeleteItem from "./delete-item/DeleteItem"
import ReturnItem from "./return-item/ReturnItem"
import {useLoadingTrashProductColors, useSelectAllTrashProductColors} from "./trashProductColorSelectors"

const DropdownMenu = (productColor: ProductColor) => {
    return (
        <Menu>
            <Menu.Item>
                <ReturnItem productColorId={productColor.id} />
            </Menu.Item>
            <Menu.Item>
                <DeleteItem productColorId={productColor.id} />
            </Menu.Item>
        </Menu>
    )
}

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
        render: (image: string, record: any) => <div style={{width: "70px"}}>
            <ImageBlock image={image} title={record.details.title} />
        </div>
    },
    {
        title: "Название",
        dataIndex: ["details", "title"],
        key: "title",
        render: (title: string, record: any) => <>{title} ({record.color.title})</>,
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
                    <Tag color="blue" key={`${record.id}-${tag.tag_id}`}>{tag.title}</Tag>
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

const TableTrashProducts = () => {
    const dispatch = useAdminDispatch()
    const loading = useLoadingTrashProductColors()
    const products = useSelectAllTrashProductColors()

    useEffect(() => {
        dispatch(fetchProductColorsFromTrash())
    }, [dispatch])

    return (
        <Table columns={columns} dataSource={products} loading={loading} />
    )
}

export default TableTrashProducts