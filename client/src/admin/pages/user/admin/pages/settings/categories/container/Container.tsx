import React from "react"
import {useLoadingCategory, useSelectAllCategories} from "admin/store/common/category/categorySelectors"
import {Menu, Table} from "antd"
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import EditorCategoryAction from "admin/lib/components/editors/editor-category-action/EditorCategoryAction"
import {SubCategory} from "admin/lib/types/Category"
import DeleteCategoryAction from "./delete-category-action/DeleteCategoryAction"
import MenuButton from "admin/lib/components/menu-button/MenuButton"
import HideItem from "./hide-action/HideItem"

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
            <HideItem category={record} />
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
        title: "Название",
        dataIndex: "title",
        key: "title"
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} />
    }
]

const Container = () => {
    const loading = useLoadingCategory()
    const categories = useSelectAllCategories()

    const expandedRowRender = (column: any) => {
        return <Table columns={columns} rowKey="id" dataSource={column.sub_categories} pagination={false} />
    }

    const checkRowClass = (record: any) => {
        if (record.hide_id) return "tr-block"
        return ""
    }

    return (
        <Table
            rowClassName={checkRowClass}
            columns={columns}
            rowKey="id"
            loading={loading}
            dataSource={categories}
            expandable={{expandedRowRender}}
        />
    )
}

export default Container
