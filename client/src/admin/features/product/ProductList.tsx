import React, {useEffect} from "react"
import {Button, Image, Input, Table, Tag} from "antd"
import {useGetAllProductsMutation} from "./productApi"
import ImageBlock from "components/blocks/image-block/ImageBlock"
// import {formatDate} from "utils/formatDate"
import PriceBlock from "components/blocks/price-block/PriceBlock"
import MenuButton from "admin/lib/components/menu-button/MenuButton"
import DropdownMenu from "admin/pages/user/admin/pages/products/container/dropdown-menu/DropdownMenu"
import "./ProductList.less"
import {useState} from "react"
import {FilterOutlined, SearchOutlined} from "@ant-design/icons"
import {useSelectAllSizes} from "admin/store/common/size/sizeSelectors"

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
    const sizes = useSelectAllSizes()
    const [fetchProductColors, {isLoading, data}] = useGetAllProductsMutation()
    const [params, setParams] = useState({
        search: "",
        categoryId: 0,
        sorter: {field: "created_at", order: "descend"},
        pagination: {current: 1, pageSize: 10}
    })

    const onChangeHandler = (pagination: any, filters: any, sorter: any) => {
        setParams(prevState => ({
            ...prevState,
            pagination,
            sorter: sorter.field ? {field: sorter.field, order: sorter.order} : prevState.sorter
        }))
    }

    useEffect(() => {
        fetchProductColors(params)
    }, [fetchProductColors, params])

    const columns = [
        {
            // title: "ID",
            dataIndex: "id"
        },
        {
            // title: "Фото",
            dataIndex: ["url_thumbnail"],
            render: (image: string, record: any) => <ProductImagesView image={image} product={record} />
        },
        {
            // title: "Название",
            dataIndex: ["details", "title"],
            render: (title: any, record: any) => (
                <div className="title-block">
                    <div className="title">{title}</div>
                    <div className="color-hex-block">
                        <div className="color-hex-circle" style={{background: record.color.hex}} />
                        {record.color.title}
                    </div>
                </div>
            ),
            sorter: true
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
            // title: "Цена",
            dataIndex: ["details", "price"],
            sorter: true,
            render: (val: number, record: any) => <PriceBlock discount={record.discount} price={val} />
        },
        {
            // title: "Теги",
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
            // title: "Статус",
            width: "130px",
            ellipsis: true,
            render: (_: any) => (
                <>
                    <div className="status success">Published</div>
                </>
            )
        }
    ]

    return (
        <>
            <div className="product-list-container">
                <div className="header">
                    <Button size="large" icon={<FilterOutlined />}>
                        Фильтрация
                    </Button>
                    <Input.Search
                        prefix={<SearchOutlined />}
                        placeholder="Введите название"
                        allowClear
                        enterButton="Поиск"
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
