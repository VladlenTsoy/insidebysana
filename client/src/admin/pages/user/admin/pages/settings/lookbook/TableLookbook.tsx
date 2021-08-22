import {EditOutlined} from "@ant-design/icons"
import EditorLookbookAction from "admin/lib/components/editors/editor-lookbook-action/EditorLookbookAction"
import MenuButton from "admin/lib/components/menu-button/MenuButton"
import {Lookbook} from "admin/lib/types/Lookbook"
import {fetchLookbookByCategoryId} from "admin/store/admin/lookbook/fetchLookbookByCategoryId"
import {useLoadingLookbook, useSelectLookbookByCategoryId} from "admin/store/admin/lookbook/lookbookSelectors"
import {useAdminDispatch} from "admin/store"
import {Menu, Table} from "antd"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import DeleteItem from "./delete-lookbook-item/DeleteItem"
import React from "react"
import {useEffect} from "react"

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
        render: (image: string) => (
            <div style={{width: "140px"}}>
                <ImageBlock image={image} title={""} />
            </div>
        )
    },
    {
        title: "Позиция",
        dataIndex: "position"
    },
    {
        render: (_: any, record: Lookbook) => <MenuButton overlay={menu(record)} />
    }
]

interface TableLookbookProps {
    categoryId: number
}

const TableLookbook: React.FC<TableLookbookProps> = ({categoryId}) => {
    const dispatch = useAdminDispatch()
    const loading = useLoadingLookbook()
    const lookbook: any = useSelectLookbookByCategoryId(categoryId)

    useEffect(() => {
        const promise = dispatch(fetchLookbookByCategoryId(categoryId))
        return () => {
            promise.abort()
        }
    }, [categoryId, dispatch])

    return (
        <>
            <Table dataSource={lookbook} loading={loading} pagination={false} columns={columns} />
        </>
    )
}
export default TableLookbook
