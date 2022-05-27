import React from "react"
import {Menu, Table} from "antd"
import {EditOutlined} from "@ant-design/icons"
import EditorProductStorageAction from "../editor-product-storages-action/EditorProductStoragesAction"
import MenuButton from "../../../../../../../lib/components/menu-button/MenuButton"
import {ProductStorage} from "../../../../../../../../types/product/ProductStorage"
import {
    useLoadingProductStorage,
    useSelectAllProductStorages
} from "../../../../../../../store/admin/product-storage/productStorageSelectors"

const menu = (productStorage: ProductStorage) => (
    <Menu>
        <Menu.Item>
            <EditorProductStorageAction productStorage={productStorage}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorProductStorageAction>
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
    const loading = useLoadingProductStorage()
    const productStorages = useSelectAllProductStorages()

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={productStorages} />
}

export default Container
