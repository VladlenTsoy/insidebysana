import React from "react"
import {Tag, Tooltip} from "antd"
import PreviewImage from "./PreviewImage"
import Details from "./Details"
import Sizes from "./Sizes"
import MenuButton from "admin/lib/components/menu-button/MenuButton"
import DropdownMenu from "admin/pages/user/admin/pages/products/container/dropdown-menu/DropdownMenu"
import {formatDate} from "utils/formatDate"
import {formatPrice} from "utils/formatPrice"
import {ClockCircleOutlined} from "@ant-design/icons"

export const columns = [
    {
        width: "60px",
        dataIndex: "id",
        render: (id: number) => `PC${id}`
    },
    {
        width: "61px",
        dataIndex: ["url_thumbnail"],
        render: (image: string, record: any) => <PreviewImage image={image} product={record} />
    },
    {
        dataIndex: ["details", "title"],
        render: (title: any, record: any) => <Details title={title} product={record} />
    },
    {
        render: (_: any, record: any) => <Sizes product={record} />
    },
    {
        dataIndex: ["details", "price"],
        render: (price: number, record: any) => (
            <div className="price-block">
                {record.discount ? (
                    <>
                        <Tooltip
                            title={record.discount.end_at ? `До ${formatDate(record.discount.end_at)}` : null}
                        >
                            <div className="discount">
                                {record.discount.end_at && <ClockCircleOutlined />}
                                <div>{record.discount.discount}%</div>
                            </div>
                        </Tooltip>
                        <span className="price">{formatPrice(price, record.discount)}</span>
                        <span className="extra">сум</span>
                    </>
                ) : (
                    <>
                        <span className="price">{formatPrice(price)}</span>
                        <span className="extra">сум</span>
                    </>
                )}
            </div>
        )
    },
    {
        dataIndex: "tags",
        render: (tags: any[], record: any) => (
            <div className="column-tags">
                {tags.map(tag => (
                    <Tag color="blue" key={`${record.id}-${tag.tag_id}`}>
                        {tag.title.toUpperCase()}
                    </Tag>
                ))}
            </div>
        )
    },
    {
        width: "130px",
        render: (_: any) => (
            <>
                <div className="status success">Размещён</div>
                {/* <div className="status danger">В архиве</div>
                <div className="status processing">В проекте</div>
                <div className="status warning">Закончился</div> */}
            </>
        )
    },
    {
        width: "56px",
        render: (_: undefined, record: any) => <MenuButton overlay={DropdownMenu(record)} size="large" />
    }
]
