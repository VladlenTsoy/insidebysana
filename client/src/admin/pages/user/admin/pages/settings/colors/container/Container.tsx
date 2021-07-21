import React from "react"
import {Menu, Table, Tag} from "antd"
import MenuButton from "../../../../../../../lib/components/menu-button/MenuButton"
import {useLoadingColors, useSelectAllColors} from "../../../../../../../store/admin/color/colorSelectors"
import {Color} from "../../../../../../../lib/types/Color"
import {EditOutlined, EyeInvisibleOutlined} from "@ant-design/icons"
import EditorColorAction from "../../../../../../../lib/components/editors/editor-color-action/EditorColorAction"
import DeleteItem from "./delete-item/DeleteItem"
import HideItem from "./hide-item/HideItem"

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
            <HideItem color={record} />
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
        render: (color: string) => (
            <div style={{borderRadius: "50%", background: color, width: "20px", height: "20px"}} />
        )
    },
    {
        title: "Название",
        dataIndex: "title",
        render: (title: string, record: any) => (
            <>
                {title}{" "}
                {!!record.hide_id && (
                    <Tag icon={<EyeInvisibleOutlined />} color="red">
                        Скрыт
                    </Tag>
                )}{" "}
            </>
        )
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
