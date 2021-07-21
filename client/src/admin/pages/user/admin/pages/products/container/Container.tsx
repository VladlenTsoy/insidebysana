import React from "react"
import {Table, Typography, Tag} from "antd"
import {
    useLoadingProductColors,
    useSelectAllProductColors
} from "../../../../../../store/admin/product-color/productSelectors"
import DropdownMenu from "./dropdown-menu/DropdownMenu"
import ImageBlock from "../../../../../../lib/components/blocks/image-block/ImageBlock"
import PriceBlock from "../../../../../../lib/components/blocks/price-block/PriceBlock"
import {formatDate} from "../../../../../../utils/formatDate"
import MenuButton from "../../../../../../lib/components/menu-button/MenuButton"
import {changePagination, changeSorter} from "../../../../../../store/admin/product-color/productColorSlice"
import {useAdminDispatch} from "../../../../../../store/admin/store"
import {fetchProductColors} from "../../../../../../store/admin/product-color/fetchProductColors"

const {Text} = Typography

const outputSize = (size: any) => {
    return (
        <div>
            {size ? (
                <Text
                    type={
                        Number(size.qty) === 0
                            ? "secondary"
                            : Number(size.qty) <= Number(size.min_qty)
                            ? "danger"
                            : undefined
                    }
                >
                    {size.qty}
                </Text>
            ) : (
                <Text type="secondary">0</Text>
            )}
        </div>
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
        title: "oversize",
        dataIndex: ["sizes", 7],
        key: "oversize",
        sorter: true,
        render: outputSize
    },
    {
        title: "onesize",
        dataIndex: ["sizes", 8],
        key: "onesize",
        sorter: true,
        render: outputSize
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

const otherSizes = [
    {
        title: "XS",
        dataIndex: ["sizes", 1],
        key: "XS",
        sorter: true,
        render: outputSize
    },
    {
        title: "S",
        dataIndex: ["sizes", 2],
        key: "S",
        sorter: true,
        render: outputSize
    },
    {
        title: "M",
        dataIndex: ["sizes", 3],
        key: "M",
        sorter: true,
        render: outputSize
    },
    {
        title: "L",
        dataIndex: ["sizes", 4],
        key: "L",
        sorter: true,
        render: outputSize
    },
    {
        title: "XL",
        dataIndex: ["sizes", 5],
        key: "XL",
        sorter: true,
        render: outputSize
    },
    {
        title: "XXL",
        dataIndex: ["sizes", 6],
        key: "XXL",
        sorter: true,
        render: outputSize
    }
]

const columnAllSize = [...columns]
columnAllSize.splice(5, 0, ...otherSizes)

interface ContainerProps {
    isMiniColumns: boolean
}

const Container: React.FC<ContainerProps> = ({isMiniColumns}) => {
    const products = useSelectAllProductColors()
    const loading = useLoadingProductColors()
    const dispatch = useAdminDispatch()

    const onChange = async (pagination: any, filters: any, sorter: any) => {
        await dispatch(
            changeSorter({
                field: sorter.field,
                order: sorter.order
            })
        )
        await dispatch(changePagination(pagination))
        await dispatch(fetchProductColors())
    }

    return (
        <>
            <Table
                loading={loading}
                rowKey="id"
                scroll={{x: "100%"}}
                pagination={{pageSize: 20}}
                dataSource={products}
                columns={isMiniColumns ? columns : columnAllSize}
                onChange={onChange}
            />
        </>
    )
}

export default Container
