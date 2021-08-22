import {EditOutlined, PlusOutlined} from "@ant-design/icons"
import EditorHomeProductAction from "admin/lib/components/editors/editor-home-product-action/EditorHomeProductAction"
import MenuButton from "admin/lib/components/menu-button/MenuButton"
import {useAdminDispatch} from "admin/store"
import {Button, Menu, Table} from "antd"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import DeleteItem from "./delete-item/DeleteItem"
import React from "react"
import {useEffect} from "react"
import {fetchHomeProducts} from "./homeProductApi"
import {HomeProduct, useLoadingHomeProducts, useSelectAllHomeProducts} from "./homeProductSlice"

const menu = (homeProduct: HomeProduct) => (
    <Menu>
        <Menu.Item>
            <EditorHomeProductAction homeProduct={homeProduct}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorHomeProductAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteItem homeProduct={homeProduct} />
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Фото",
        dataIndex: ["url_thumbnail"],
        render: (image: string, record: any) => (
            <div style={{width: "70px"}}>
                <ImageBlock image={image} title={record.title} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: ["title"],
        render: (title: string, record: any) => (
            <>
                {title} ({record.color_title})
            </>
        )
    },
    {
        title: "Позиция",
        dataIndex: "position"
    },
    {
        render: (_: any, record: HomeProduct) => <MenuButton overlay={menu(record)} />
    }
]

const Home: React.FC = () => {
    const loading = useLoadingHomeProducts()
    const products = useSelectAllHomeProducts()
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchHomeProducts())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <div className="header-actions">
                <div className="left">
                    <EditorHomeProductAction>
                        <Button type="primary" size="large" icon={<PlusOutlined />}>
                            Добавить продукт на главную
                        </Button>
                    </EditorHomeProductAction>
                </div>
            </div>
            <Table columns={columns} rowKey="id" loading={loading} dataSource={products} pagination={false} />
        </>
    )
}
export default Home
