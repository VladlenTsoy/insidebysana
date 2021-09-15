import React, {useEffect} from "react"
import {Button, Input, Table} from "antd"
import {useGetAllProductsMutation} from "../productApi"
import {useState} from "react"
import {FilterOutlined, SearchOutlined} from "@ant-design/icons"
import {useHistory, useLocation} from "react-router-dom"
import "./ProductList.less"
import {columns} from "./Columns"

interface ProductListProps {
    type: "all" | "draft" | "published" | "ending" | "archive"
}

const ProductList: React.FC<ProductListProps> = ({type}) => {
    let timeout: any
    const location = useLocation()
    const history = useHistory()
    const [fetchProductColors, {isLoading, data}] = useGetAllProductsMutation()
    const [params, setParams] = useState({
        type,
        search: "",
        categoryId: 0,
        sorter: {field: "created_at", order: "descend"},
        pagination: {current: 1, pageSize: 50}
    })

    const onChangeHandler = (pagination: any, filters: any, sorter: any) => {
        history.push({
            search: `?current=${pagination.current}&pageSize=${pagination.pageSize}`
        })
    }

    const onSearchHandler = (e: any) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => setParams(prevState => ({...prevState, search: e.target.value})), 300)
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        //
        const search = query.get("search")
        const categoryId = query.get("categoryId") ? Number(query.get("categoryId")) : null
        const current = query.get("current") ? Number(query.get("current")) : null
        const pageSize = query.get("pageSize") ? Number(query.get("pageSize")) : null
        //
        setParams(prevState => ({
            ...prevState,
            search: search || prevState.search,
            categoryId: categoryId || prevState.categoryId,
            pagination: {
                current: current || prevState.pagination.current,
                pageSize: pageSize || prevState.pagination.pageSize
            }
        }))
    }, [location])

    useEffect(() => {
        console.log(params)

        fetchProductColors(params)
    }, [fetchProductColors, params])

    return (
        <>
            <div className="product-list-container">
                <div className="header">
                    <Button size="large" icon={<FilterOutlined />}>
                        Фильтрация
                    </Button>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Введите название"
                        allowClear
                        // enterButton="Поиск"
                        size="large"
                        onChange={onSearchHandler}
                    />
                </div>
                <Table
                    size="small"
                    loading={isLoading}
                    showHeader={false}
                    rowKey="id"
                    scroll={{x: "100%"}}
                    dataSource={data ? data.results : []}
                    columns={columns}
                    onChange={onChangeHandler}
                    pagination={{...params.pagination, total: data?.total || 0, size: "default"}}
                    rowClassName="row-product"
                />
            </div>
        </>
    )
}
export default ProductList
