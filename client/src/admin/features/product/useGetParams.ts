import {useHistory} from "react-router-dom"
import {useCallback, useEffect, useState} from "react"
import {ParamsProps} from "./product-list/ProductList"

const PAGE_CURRENT = 1
const PAGE_SIZE = 50

const selectParams = (location: any) => {
    const status = location.pathname.replace("/products/", "") || "all"
    const query = new URLSearchParams(location.search)
    const search = query.get("search") || ""
    const categoryIds = query.get("categoryIds")
        ? JSON.parse(query.get("categoryIds") || "")
        : []
    const sizeIds = query.get("sizeIds")
        ? JSON.parse(query.get("sizeIds") || "")
        : []
    const current = query.get("current")
        ? Number(query.get("current"))
        : PAGE_CURRENT
    const pageSize = query.get("pageSize")
        ? Number(query.get("pageSize"))
        : PAGE_SIZE

    return {status, search, categoryIds, sizeIds, current, pageSize, query}
}

export const useGetParams = () => {
    const history = useHistory()
    const {
        status,
        search,
        categoryIds,
        sizeIds,
        current,
        pageSize
    } = selectParams(history.location)
    const [params, setParams] = useState<ParamsProps>({
        type: status,
        search: search,
        categoryIds: categoryIds,
        sizeIds: sizeIds,
        sorter: {field: "created_at", order: "descend"},
        pagination: {current, pageSize}
    })

    const checkArray = useCallback((arr: number[], val: number) => {
        return arr.includes(val)
            ? arr.filter(_val => _val !== val)
            : [...arr, Number(val)]
    }, [])

    const updateParams = useCallback(
        (key, val) => {
            const {query, categoryIds, sizeIds} = selectParams(history.location)
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
                    value = val
                        ? checkArray(
                              key === "categoryIds" ? categoryIds : sizeIds,
                              Number(val)
                          )
                        : []
                    query.set(key, JSON.stringify(value))
                    break
            }
            history.push({
                search: query.toString()
            })
        },
        [history, checkArray]
    )

    const checkParams = useCallback(location => {
        const {
            status,
            search,
            categoryIds,
            sizeIds,
            current,
            pageSize
        } = selectParams(location)
        //
        setParams({
            type: status,
            search: search || "",
            categoryIds: categoryIds,
            sizeIds: sizeIds,
            sorter: {field: "created_at", order: "descend"},
            pagination: {
                current: current || PAGE_CURRENT,
                pageSize: pageSize || PAGE_SIZE
            }
        })
    }, [])

    useEffect(() => {
        history.listen(checkParams)
    }, [history, checkParams])

    return {params, updateParams}
}
