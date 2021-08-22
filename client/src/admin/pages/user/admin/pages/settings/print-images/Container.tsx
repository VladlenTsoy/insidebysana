import React from "react"
import {Space, Table, Menu, Button} from "antd"
import {useLoadingPrintImages, useSelectAllPrintImages} from "admin/store/admin/print-image/printImageSelectors"
import ImageBlock from "admin/lib/components/blocks/image-block/ImageBlock"
import {formatPrice} from "admin/utils/formatPrice"
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons"
import {PrintImage} from "admin/store/admin/print-image/PrintImage"
import EditorPrintImageAction from "admin/lib/components/editors/editor-print-image-action/EditorPrintImageAction"
import MenuButton from "admin/lib/components/menu-button/MenuButton"
import EditorPrintProductAction from "admin/lib/components/editors/editor-print-product-action/EditorPrintProductAction"
import {useAdminDispatch} from "admin/store"
import {useEffect} from "react"
import {fetchPrintProductsByImageId} from "admin/store/admin/print-product/fetchPrintProductsByImageId"
import {
    useLoadingPrintProducts,
    useSelectPrintProductsByImageId
} from "admin/store/admin/print-product/printProductSelectors"
import {PrintProduct} from "admin/store/admin/print-product/PrintProduct"
import DeletePrintImageAction from "./DeletePrintImageAction"
import DeletePrintProductAction from "./DeletePrintProductAction"

const menu = (record: PrintImage) => (
    <Menu>
        <Menu.Item>
            <EditorPrintImageAction printImage={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorPrintImageAction>
        </Menu.Item>
        <Menu.Item>
            <DeletePrintImageAction printImage={record}>
                <span>
                    <DeleteOutlined /> Удалить
                </span>
            </DeletePrintImageAction>
        </Menu.Item>
    </Menu>
)

const _menu = (record: PrintProduct) => (
    <Menu>
        <Menu.Item>
            <EditorPrintProductAction printImageId={record.print_image_id} printProduct={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorPrintProductAction>
        </Menu.Item>
        <Menu.Item>
            <DeletePrintProductAction printProduct={record}>
                <span>
                    <DeleteOutlined /> Удалить
                </span>
            </DeletePrintProductAction>
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Категория",
        dataIndex: ["category", "title"]
    },
    {
        title: "Картинка",
        dataIndex: "url_thumbnail",
        render: (image: string) => (
            <div style={{width: "90px"}}>
                <ImageBlock image={image} title={""} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        title: "Стоимость",
        dataIndex: "price",
        render: (price: number) => `${formatPrice(price)} сум`
    },
    {
        render: (_: undefined, record: any) => (
            <Space>
                <EditorPrintProductAction printImageId={record.id}>
                    <Button icon={<PlusOutlined />}>Товар</Button>
                </EditorPrintProductAction>
                <MenuButton overlay={menu(record)} />
            </Space>
        )
    }
]

const _columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Картинка",
        dataIndex: "url_thumbnail",
        render: (image: string) => (
            <div style={{width: "90px"}}>
                <ImageBlock image={image} title={""} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        title: "Товар",
        dataIndex: "title",
        render: (_: any, record: any) => `${record.product_color.title} (${record.product_color.color_title})`
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={_menu(record)} />
    }
]

const TableRowRender: React.FC<{column: any}> = ({column}) => {
    const dispatch = useAdminDispatch()
    const products: any[] = useSelectPrintProductsByImageId(column.id)
    const loading = useLoadingPrintProducts()

    useEffect(() => {
        const promise = dispatch(fetchPrintProductsByImageId({imageId: column.id}))
        return () => {
            promise.abort()
        }
    }, [column, dispatch])

    return <Table columns={_columns} rowKey="id" dataSource={products} pagination={false} loading={loading} />
}

const Container: React.FC = () => {
    const printImages = useSelectAllPrintImages()
    const loading = useLoadingPrintImages()

    const expandedRowRender = (column: any) => {
        return <TableRowRender column={column} />
    }

    return (
        <>
            <Table
                columns={columns}
                rowKey="id"
                loading={loading}
                dataSource={printImages}
                expandable={{expandedRowRender}}
            />
        </>
    )
}
export default Container
