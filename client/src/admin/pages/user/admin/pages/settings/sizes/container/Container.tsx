import React from "react"
import {Table, Menu, Tag} from "antd"
import {useLoadingSizes, useSelectAllSizes} from "../../../../../../../store/common/size/sizeSelectors"
import EditorSizeAction from "admin/lib/components/editors/editor-size-action/EditorSizeAction"
import {Size} from "admin/lib/types/Size"
import {EditOutlined, EyeInvisibleOutlined} from "@ant-design/icons"
import DeleteItem from "./delete-item/DeleteItem"
import HideItem from "./hide-item/HideItem"
import MenuButton from "admin/lib/components/menu-button/MenuButton"

const menu = (record: Size) => (
    <Menu>
        <Menu.Item>
            <EditorSizeAction size={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorSizeAction>
        </Menu.Item>
        <Menu.Item>
            <HideItem size={record} />
        </Menu.Item>
        <Menu.Item>
            <DeleteItem size={record} />
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
        render: (title: string, record: any) => (
            <>
                {title}{" "}
                {!!record.hide_id && (
                    <Tag icon={<EyeInvisibleOutlined />} color="red">
                        Скрыт
                    </Tag>
                )}
            </>
        )
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} />
    }
]

const Container: React.FC = () => {
    const loading = useLoadingSizes()
    const sizes = useSelectAllSizes()

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={sizes} />
}

export default Container
