import React from "react"
import {
    useLoadingLookbookCategory,
    useSelectAllLookbookCategories
} from "../../../../../../store/admin/lookbook/lookbookSelectors"
import {Menu, Table} from "antd"
import {EditOutlined} from "@ant-design/icons"
import ImageBlock from "../../../../../../lib/components/blocks/image-block/ImageBlock"
import MenuButton from "../../../../../../lib/components/menu-button/MenuButton"
import {LookbookCategory} from "../../../../../../lib/types/Lookbook"
import DeleteItem from "./delete-item/DeleteItem"
import EditorLookbookCategoryAction from "admin/lib/components/editors/editor-lookbook-category-action/EditorLookbookCategoryAction"
import TableLookbook from "./TableLookbook"

const menu = (lookbookCategory: LookbookCategory) => (
    <Menu>
        <Menu.Item>
            <EditorLookbookCategoryAction lookbookCategory={lookbookCategory}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorLookbookCategoryAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteItem lookbookCategory={lookbookCategory} />
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Картинка",
        dataIndex: "url_image",
        render: (image: string) => (
            <div style={{width: "140px"}}>
                <ImageBlock image={image} title={""} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        render: (_: any, record: LookbookCategory) => <MenuButton overlay={menu(record)} />
    }
]

const Container = () => {
    const loading = useLoadingLookbookCategory()
    const lookbookCategories = useSelectAllLookbookCategories()

    const expandedRowRender = (column: any) => {
        return <TableLookbook categoryId={column.id} />
    }

    return (
        <Table
            columns={columns}
            rowKey="id"
            loading={loading}
            dataSource={lookbookCategories}
            expandable={{expandedRowRender}}
        />
    )
}

export default Container
