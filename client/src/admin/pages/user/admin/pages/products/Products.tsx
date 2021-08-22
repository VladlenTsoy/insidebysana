import React, {useEffect, useState} from "react"
import "./Products.less"
import {fetchProductColors} from "../../../../../store/admin/product-color/fetchProductColors"
import {useAdminDispatch} from "../../../../../store"
import Container from "./container/Container"
import Header from "./header/Header"
import {Tabs} from "antd"
import ProductList from "admin/features/product/ProductList"

const {TabPane} = Tabs

const Products: React.FC = () => {
    const [isMiniColumns, setMiniColumns] = useState<boolean>(true)
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchProductColors())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <Tabs defaultActiveKey="all" size="large">
                <TabPane tab="Все продукты" key="all">
                    <Header setMiniColumns={setMiniColumns} isMiniColumns={isMiniColumns} />
                    <Container isMiniColumns={isMiniColumns} />
                </TabPane>
                <TabPane tab="Опубликовано" key="published">
                    <ProductList />
                </TabPane>
                <TabPane tab="Закончились" key="ending">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Архив" key="archive">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </>
    )
}

export default Products
