import React from "react"
import "./Products.less"
import {Button, Tabs} from "antd"
import ProductList from "admin/features/product/ProductList"
import {Link, useHistory, useParams} from "react-router-dom"
import {PlusOutlined} from "@ant-design/icons"

const {TabPane} = Tabs

const Products: React.FC = () => {
    const params = useParams<{status: string}>()
    const history = useHistory()

    const onChangeHandler = (status: any) => {
        history.push({pathname: `/products/${status}`})
    }

    return (
        <Tabs
            defaultActiveKey={params.status || `all`}
            size="large"
            className="tabs-container-products"
            onChange={onChangeHandler}
            tabBarExtraContent={
                <Link to="/products/create">
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Добавить
                    </Button>
                </Link>
            }
        >
            <TabPane tab={`Все продукты`} key="all"></TabPane>
            <TabPane tab={`В проекте`} key="draft"></TabPane>
            <TabPane tab={`Опубликованные`} key="published">
                <ProductList />
            </TabPane>
            <TabPane tab="Закончились" key="ending">
                Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Архив" key="archive">
                Content of Tab Pane 2
            </TabPane>
        </Tabs>
    )
}

export default Products
