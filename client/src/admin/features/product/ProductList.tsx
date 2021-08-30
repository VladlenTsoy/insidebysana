import React, {useEffect} from "react"
import {Button, Image, Input, Table, Tag, Tooltip} from "antd"
import {useGetAllProductsMutation} from "./productApi"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import MenuButton from "admin/lib/components/menu-button/MenuButton"
import DropdownMenu from "admin/pages/user/admin/pages/products/container/dropdown-menu/DropdownMenu"
import "./ProductList.less"
import {useState} from "react"
import {ClockCircleOutlined, FilterOutlined, SearchOutlined} from "@ant-design/icons"
import {useSelectAllSizes} from "admin/store/common/size/sizeSelectors"
import {formatPrice} from "utils/formatPrice"
import {formatDate} from "utils/formatDate"
import {useHistory, useLocation} from "react-router-dom"

const ProductImagesView: React.FC<any> = ({image, product}) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <div style={{width: "45px"}} onClick={() => setVisible(prevState => !prevState)}>
                <div className="column-image-block">
                    <ImageBlock image={image} title={product.details.title} />
                </div>
            </div>
            <div style={{display: "none"}}>
                <Image.PreviewGroup preview={{visible, onVisibleChange: vis => setVisible(vis)}}>
                    <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                    <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
                    <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
                </Image.PreviewGroup>
            </div>
        </>
    )
}

const ProductList: React.FC = () => {
    const location = useLocation()
    const history = useHistory()
    const sizes = useSelectAllSizes()
    const [fetchProductColors, {isLoading, data}] = useGetAllProductsMutation()
    const [params, setParams] = useState({
        search: "",
        categoryId: 0,
        sorter: {field: "created_at", order: "descend"},
        pagination: {current: 1, pageSize: 50}
    })

    const onChangeHandler = (pagination: any, filters: any, sorter: any) => {
        history.push({
            search: `?current=${pagination.current}&pageSize=${pagination.pageSize}`
        })
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        //
        const search = query.get("search")
        const categoryId = query.get("categoryId") ? Number(query.get("categoryId")) : null
        const current = query.get("current") ? Number(query.get("current")) : null
        const pageSize = query.get("pageSize") ? Number(query.get("pageSize")) : null
        //
        setParams(prevState => ({
            ...prevState,
            search: search || prevState.search,
            categoryId: categoryId || prevState.categoryId,
            pagination: {
                current: current || prevState.pagination.current,
                pageSize: pageSize || prevState.pagination.pageSize
            }
        }))
    }, [location])

    useEffect(() => {
        console.log(params)

        fetchProductColors(params)
    }, [fetchProductColors, params])

    const columns = [
        {
            width: "60px",
            dataIndex: "id",
            render: (id: number) => `PC${id}`
        },
        {
            width: "61px",
            dataIndex: ["url_thumbnail"],
            render: (image: string, record: any) => <ProductImagesView image={image} product={record} />
        },
        {
            dataIndex: ["details", "title"],
            render: (title: any, record: any) => (
                <div className="title-block">
                    <div className="title">
                        {title}
                        {record.is_new && <div className="is-new">new</div>}
                    </div>
                    <div className="color-hex-block">
                        <div className="color-hex-circle" style={{background: record.color.hex}} />
                        {record.color.title}
                    </div>
                </div>
            )
        },
        {
            render: (_: any, record: any) => (
                <>
                    <div className="sizes-block">
                        {Object.keys(record.sizes).map((key: any) => {
                            const size = record.sizes[key]
                            const selectSize = sizes.find((size: any) => size.id === Number(key))
                            return (
                                <div
                                    key={key}
                                    className={`size-block ${
                                        size.qty <= 0 ? "danger" : size.qty <= size.min_qty ? "warning" : ""
                                    }`}
                                >
                                    <b>{selectSize?.title}</b>
                                    <span
                                        className={
                                            size.qty <= 0
                                                ? "danger"
                                                : size.qty <= size.min_qty
                                                ? "warning"
                                                : ""
                                        }
                                    >
                                        {size.qty}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </>
            )
        },
        {
            dataIndex: ["details", "price"],
            render: (price: number, record: any) => (
                <div className="price-block">
                    {record.discount ? (
                        <>
                            <Tooltip
                                title={
                                    record.discount.end_at ? `До ${formatDate(record.discount.end_at)}` : null
                                }
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

    return (
        <>
            <div className="product-list-container">
                <div className="header">
                    <Button size="large" icon={<FilterOutlined />}>
                        Фильтрация
                    </Button>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Введите название"
                        allowClear
                        // enterButton="Поиск"
                        size="large"
                        // onSearch={onSearchHandler}
                    />
                </div>
                <Table
                    size="small"
                    loading={isLoading}
                    showHeader={false}
                    rowKey="id"
                    scroll={{x: "100%"}}
                    dataSource={data ? data.results : []}
                    columns={columns}
                    onChange={onChangeHandler}
                    pagination={{...params.pagination, total: data?.total || 0, size: "default"}}
                    rowClassName="row-product"
                />
            </div>
        </>
    )
}
export default ProductList
