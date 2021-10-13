import React, {useCallback, useEffect} from "react"
import {Table} from "antd"
import {useGetAllProductsMutation} from "../productApi"
import {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"
import "./ProductList.less"
import {columns} from "./Columns"
import Header from "./header/Header"

interface ProductListProps {
    type: "all" | "draft" | "published" | "ending" | "archive"
}

interface ParamsProps {
    type: ProductListProps["type"]
    search: string
    categoryIds: string[]
    sizeIds: string[]
    sorter: {field: string; order: "acscend" | "descend"}
    pagination: {current: number; pageSize: number}
}

const ProductList: React.FC<ProductListProps> = ({type}) => {
    let timeout: any
    const location = useLocation()
    const history = useHistory()
    const [fetchProductColors, {isLoading, data}] = useGetAllProductsMutation()
    const [params, setParams] = useState<ParamsProps>({
        type,
        search: "",
        categoryIds: [],
        sizeIds: [],
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

    const onCategoryIdsHandler = useCallback((categoryId: string) => {
        setParams(prevState => {
            if (prevState.categoryIds.includes(categoryId))
                return {
                    ...prevState,
                    categoryIds: prevState.categoryIds.filter(_categoryId => _categoryId !== categoryId)
                }
            return {...prevState, categoryIds: [...prevState.categoryIds, categoryId]}
        })
    }, [])

    const onsizeIdsHandler = useCallback((sizeId: string) => {
        setParams(prevState => {
            if (prevState.sizeIds.includes(sizeId))
                return {
                    ...prevState,
                    sizeIds: prevState.sizeIds.filter(_sizeId => _sizeId !== sizeId)
                }
            return {...prevState, sizeIds: [...prevState.sizeIds, sizeId]}
        })
    }, [])

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        //
        const search = query.get("search")
        const categoryIds = query.get("categoryIds") ? JSON.parse(query.get("categoryIds") || "") : null
        const sizeIds = query.get("sizeIds") ? JSON.parse(query.get("sizeIds") || "") : null
        const current = query.get("current") ? Number(query.get("current")) : null
        const pageSize = query.get("pageSize") ? Number(query.get("pageSize")) : null
        //
        setParams(prevState => ({
            ...prevState,
            search: search || prevState.search,
            categoryIds: categoryIds || prevState.categoryIds,
            sizeIds: sizeIds || prevState.sizeIds,
            pagination: {
                current: current || prevState.pagination.current,
                pageSize: pageSize || prevState.pagination.pageSize
            }
        }))
    }, [location])

    useEffect(() => {
        fetchProductColors(params)
    }, [fetchProductColors, params])

    return (
        <>
            <div className="product-list-container">
                <Header
                    onSearch={onSearchHandler}
                    categoryIds={params.categoryIds}
                    sizeIds={params.sizeIds}
                    onCategories={onCategoryIdsHandler}
                    onSizes={onsizeIdsHandler}
                />
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
