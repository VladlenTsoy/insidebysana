import React from "react"
import {Menu, Table} from "antd"
import MenuButton from "../../../../../../../lib/components/menu-button/MenuButton"
import {useLoadingColors, useSelectAllColors} from "../../../../../../../store/admin/color/colorSelectors"
import {Color} from "../../../../../../../lib/types/Color"
import {EditOutlined} from "@ant-design/icons"
import EditorColorAction from "../../../../../../../lib/components/editors/editor-color-action/EditorColorAction"
import DeleteItem from "./delete-item/DeleteItem"

const menu = (record: Color) => (
    <Menu>
        <Menu.Item>
            <EditorColorAction color={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorColorAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteItem color={record} />
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Цвет",
        dataIndex: "hex",
        render: (color: string) => <div
            style={{borderRadius: "50%", background: color, width: "20px", height: "20px"}} />
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} />
    }
]

const Container = () => {
    const loading = useLoadingColors()
    const colors = useSelectAllColors()

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={colors} />
}

export default Container
