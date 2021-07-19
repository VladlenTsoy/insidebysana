import React from "react"
import {useLoadingLookbook, useSelectAllLookbook} from "../../../../../../../store/admin/lookbook/lookbookSelectors"
import {Menu, Table} from "antd"
import {EditOutlined} from "@ant-design/icons"
import ImageBlock from "../../../../../../../lib/components/blocks/image-block/ImageBlock"
import MenuButton from "../../../../../../../lib/components/menu-button/MenuButton"
import EditorLookbookAction
    from "../../../../../../../lib/components/editors/editor-lookbook-action/EditorLookbookAction"
import {Lookbook} from "../../../../../../../lib/types/Lookbook"
import DeleteItem from "./delete-item/DeleteItem"

const menu = (lookbook: Lookbook) => (
    <Menu>
        <Menu.Item>
            <EditorLookbookAction lookbook={lookbook}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorLookbookAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteItem lookbook={lookbook} />
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
        render: (image: string) => <div style={{width: '140px'}}>
            <ImageBlock image={image} title={""} />
        </div>
    },
    {
        title: "Позиция",
        dataIndex: "position"
    },
    {
        render: (_: any, record: Lookbook) => <MenuButton overlay={menu(record)} />
    }
]

const Container = () => {
    const loading = useLoadingLookbook()
    const lookbook = useSelectAllLookbook()

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={lookbook} />
}

export default Container