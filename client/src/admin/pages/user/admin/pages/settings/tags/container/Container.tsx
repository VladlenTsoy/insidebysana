import React from "react"
import {Menu, Table} from "antd"
import {useLoadingTag, useSelectAllTags} from "../../../../../../../store/admin/tag/tagSelectors"
import {EditOutlined} from "@ant-design/icons"
import DeleteItem from "./delete-item/DeleteItem"
import {Tag} from "../../../../../../../lib/types/Tag"
import MenuButton from "../../../../../../../lib/components/menu-button/MenuButton"
import EditorTagAction from "../../../../../../../lib/components/editors/editor-tag-action/EditorTagAction"

const menu = (tag: Tag) => (
    <Menu>
        <Menu.Item>
            <EditorTagAction tag={tag}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorTagAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteItem tag={tag} />
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
        dataIndex: "title"
    },
    {
        render: (_: any, record: Tag) => <MenuButton overlay={menu(record)} />
    }
]

const Container = () => {
    const loading = useLoadingTag()
    const tags = useSelectAllTags()

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={tags} />
}

export default Container