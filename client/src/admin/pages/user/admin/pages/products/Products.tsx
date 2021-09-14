import React from "react"
import "./Products.less"
import {Button, Tabs} from "antd"
import ProductList from "admin/features/product/product-list/ProductList"
import {Link, useHistory, useParams} from "react-router-dom"
import {PlusOutlined, SkinOutlined} from "@ant-design/icons"
import HeaderPage from "admin/components/header-page/HeaderPage"

const {TabPane} = Tabs

const Products: React.FC = () => {
    const params = useParams<{status: string}>()
    const history = useHistory()

    const onChangeHandler = (status: any) => {
        history.push({pathname: `/products/${status}`})
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
            <Tabs
                defaultActiveKey={params.status || `all`}
                size="large"
                className="tabs-container-products"
                onChange={onChangeHandler}
            >
                <TabPane tab={`Все продукты`} key="all">
                    <ProductList type="all" />
                </TabPane>
                <TabPane tab={`В проекте`} key="draft">
                    <ProductList type="draft" />
                </TabPane>
                <TabPane tab={`Опубликованные`} key="published">
                    <ProductList type="published" />
                </TabPane>
                <TabPane tab="Закончились" key="ending">
                    <ProductList type="ending" />
                </TabPane>
                <TabPane tab="Архив" key="archive">
                    <ProductList type="archive" />
                </TabPane>
            </Tabs>
        </>
    )
}

export default Products
