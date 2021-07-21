import React from "react"
import {Menu, Table} from "antd"
import {useLoadingSources, useSelectAllSources} from "../../../../../../../store/admin/source/sourceSelectors"
import {SubCategory} from "../../../../../../../lib/types/Category"
import {EditOutlined} from "@ant-design/icons"
import EditorSourceAction from "../editor-source-action/EditorSourceAction"
import MenuButton from "../../../../../../../lib/components/menu-button/MenuButton"

const menu = (record: SubCategory) => (
    <Menu>
        <Menu.Item>
            <EditorSourceAction source={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorSourceAction>
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
    const loading = useLoadingSources()
    const sources = useSelectAllSources()

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={sources} />
}

export default Container
