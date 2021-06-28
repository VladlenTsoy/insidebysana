import React from "react"
import {Menu, Table} from "antd"
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import EditorCategoryAction from "lib/components/editors/editor-print-category-action/EditorPrintCategoryAction"
import {SubCategory} from "../../../../../../../lib/types/Category"
import DeleteCategoryAction from "./delete-category-action/DeleteCategoryAction"
import MenuButton from "../../../../../../../lib/components/menu-button/MenuButton"
import {
    useLoadingPrintCategories,
    useSelectAllPrintCategories
} from "store/admin/print-category/printCategorySelectors"
import ImageBlock from "lib/components/blocks/image-block/ImageBlock"

const menu = (record: SubCategory) => (
    <Menu>
        <Menu.Item>
            <EditorCategoryAction sub={!!record.category_id} category={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorCategoryAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteCategoryAction category={record}>
                <span>
                    <DeleteOutlined /> Удалить
                </span>
            </DeleteCategoryAction>
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Картинка",
        dataIndex: "url_image",
        render: (image: string) => (
            <div style={{width: "40px"}}>
                <ImageBlock image={image} title={""} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title",
        key: "title"
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} />
    }
]

const _columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Название",
        dataIndex: "title",
        key: "title"
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} />
    }
]

const Container = () => {
    const loading = useLoadingPrintCategories()
    const categories = useSelectAllPrintCategories()

    const expandedRowRender = (column: any) => {
        return <Table columns={_columns} rowKey="id" dataSource={column.sub_categories} pagination={false} />
    }

    return (
        <Table
            columns={columns}
            rowKey="id"
            loading={loading}
            dataSource={categories}
            expandable={{expandedRowRender}}
        />
    )
}

export default Container
