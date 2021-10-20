import React, {useCallback, useEffect, useState} from "react"
import {Table} from "antd"
import {useGetAllProductsMutation} from "../productApi"
import {useHistory} from "react-router-dom"
import "./ProductList.less"
import {columns} from "./Columns"
import Header from "./header/Header"

type StatusType = "all" | "draft" | "published" | "ending" | "archive"

interface ParamsProps {
    type: StatusType | string
    search: string
    categoryIds: number[]
    sizeIds: number[]
    sorter: {field: string; order: "ascend" | "descend"}
    pagination: {current: number; pageSize: number}
}

interface ProductListProps {
    params: ParamsProps
    updateParams: (key: string, val: string | number) => void
}

const ProductList: React.FC<ProductListProps> = ({params, updateParams}) => {
    const [fetchProductColors, {isLoading, data}] = useGetAllProductsMutation()

    const onChangeHandler = (pagination: any) =>
        updateParams("pagination", pagination)

    let timeout: any
    const onSearchHandler = (e: any) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => updateParams("search", e.target.value), 300)
    }

    const onCategoryIdsHandler = useCallback(
        (categoryId?: number) =>
            categoryId && updateParams("categoryIds", categoryId),
        [updateParams]
    )

    const onSizeIdsHandler = useCallback((sizeId?: number) =>
            sizeId && updateParams("sizeIds", sizeId),
        [updateParams]
    )

    useEffect(() => {
        fetchProductColors(params)
    }, [fetchProductColors, params])

    return (
        <>
            <div className="product-list-container">
                <Header
                    search={params.search}
                    onSearch={onSearchHandler}
                    categoryIds={params.categoryIds}
                    sizeIds={params.sizeIds}
                    onCategories={onCategoryIdsHandler}
                    onSizes={onSizeIdsHandler}
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

const ProductListMemo = React.memo<ProductListProps>(ProductList, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
})

const SelectParams: React.FC = () => {
    const history = useHistory()
    const [params, setParams] = useState<ParamsProps>({
        type: "all",
        search: "",
        categoryIds: [],
        sizeIds: [],
        sorter: {field: "created_at", order: "descend"},
        pagination: {current: 1, pageSize: 50}
    })

    const checkArray = useCallback((arr: number[], val: number) => {
        console.log(arr, val, arr.includes(val))
        return arr.includes(val) ? arr.filter(_val => _val !== val) : [...arr, Number(val)]
    }, [])

    const updateParams = useCallback((key, val) => {
        const query = new URLSearchParams(history.location.search)
        const categoryIds: number[] = query.get("categoryIds") ? JSON.parse(query.get("categoryIds") || "") : []
        const sizeIds: number[] = query.get("sizeIds") ? JSON.parse(query.get("sizeIds") || "") : []
        let value = val

        switch (key) {
            case "search":
                query.set(key, val)
                break
            case "pagination":
                query.set("current", JSON.stringify(val.current))
                query.set("pageSize", JSON.stringify(val.pageSize))
                break
            case "categoryIds":
            case "sizeIds":
                value = val ? checkArray((key === "categoryIds" ? categoryIds : sizeIds), Number(val)) : []
                query.set(key, JSON.stringify(value))
                break
        }
        history.push({
            search: query.toString()
        })
    }, [history, checkArray])

    const checkParams = useCallback((location) => {
        const status = location.pathname.replace("/products/", "")
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
            type: status,
            search: search || prevState.search,
            categoryIds: categoryIds || prevState.categoryIds,
            sizeIds: sizeIds || prevState.sizeIds,
            pagination: {
                current: current || prevState.pagination.current,
                pageSize: pageSize || prevState.pagination.pageSize
            }
        }))
    },[])

    useEffect(() => {
        history.listen(checkParams)
    }, [history])

    return <ProductListMemo params={params} updateParams={updateParams} />
}

export default SelectParams
