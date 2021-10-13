import React from "react"
import {Button, Tooltip} from "antd"
import PreviewImage from "./PreviewImage"
import Details from "./Details"
import Sizes from "./Sizes"
import {formatDate} from "utils/formatDate"
import {formatPrice} from "utils/formatPrice"
import {ClockCircleOutlined, EditOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom"

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
        dataIndex: ["title"],
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
    // {
    //     dataIndex: "tags",
    //     render: (tags: any[], record: any) => (
    //         <div className="column-tags">
    //             {tags &&
    //                 tags.map(tag => (
    //                     <Tag color="blue" key={`${record.id}-${tag.tag_id}`}>
    //                         {tag.title.toUpperCase()}
    //                     </Tag>
    //                 ))}
    //         </div>
    //     )
    // },
    {
        dataIndex: "status",
        width: "130px",
        render: (status: "draft" | "published" | "archive" | "ending") => (
            <>
                {status === "published" && <div className="status success">Размещён</div>}
                {status === "archive" && <div className="status danger">В архиве</div>}
                {status === "draft" && <div className="status draft">В проекте</div>}
                {status === "ending" && <div className="status warning">Закончился</div>}
            </>
        )
    },
    {
        width: "56px",
        render: (_: undefined, record: any) => (
            <Link to={`/products/edit/${record.id}`}>
                <Button type="text" icon={<EditOutlined />} shape="circle" size="large" />
            </Link>
        )
    }
]
