import React from "react"
import "./Products.less"
import {Button} from "antd"
import ProductList from "admin/features/product/product-list/ProductList"
import {Link, useHistory, useLocation, useParams} from "react-router-dom"
import {PlusOutlined, SkinOutlined} from "@ant-design/icons"
import HeaderPage from "admin/components/header-page/HeaderPage"
import ContainerPage from "admin/components/container-page/ContainerPage"
import Tabs, {Tab} from "admin/components/tabs/Tabs"

const statusTabs = [
    {name: "Все продукты", status: "all"},
    {name: "В проекте", status: "draft"},
    {name: "Опубликованные", status: "published"},
    {name: "Закончились", status: "ending"},
    {name: "Архив", status: "archive"}
]

const Products: React.FC = () => {
    const params = useParams<{status: string}>()
    const history = useHistory()
    const location = useLocation()

    const onChangeHandler = (status: any) => {
        history.push({pathname: `/products/${status}`, search: location.search})
    }

    return (
        <>
            <HeaderPage
                title="Товары"
                action={
                    <Link to="/products/create">
                        <Button type="primary" size="large" icon={<PlusOutlined />}>
                            Добавить
                        </Button>
                    </Link>
                }
                icon={<SkinOutlined />}
                tabs
            />
            <Tabs defaultActiveKey={params.status || `all`} onChange={onChangeHandler}>
                {statusTabs.map(tab =>
                    <Tab tab={tab.name} key={tab.status} />
                )}
            </Tabs>
            <ContainerPage>
                <ProductList />
            </ContainerPage>
        </>
    )
}

export default Products
