import React, {useEffect, useState} from "react"
import styled from "./FilterSort.module.css"
import Filter from "./filter/Filter"
// import Sort from "./sort/Sort"
import {fetchProductsByFilter} from "../fetchProductsByFilter"
import {useDispatch} from "../../store"
import {useParams} from "react-router-dom"
import {ProductsParamsProps} from "../Products"
import {useScreenSize} from "../../../hooks/useScreenSize"
import FilterMobile from "./filter-mobile/FilterMobile"
import {useCurrentFilter} from "../productSlice"

const FilterSort = () => {
    const {colorIds, price, sizeIds, subCategoryIds} = useCurrentFilter()
    const [sort] = useState({column: "created_at", dir: "desc"})
    const {width} = useScreenSize()
    const dispatch = useDispatch()
    const params = useParams<ProductsParamsProps>()

    useEffect(() => {
        const promise = dispatch(
            fetchProductsByFilter({
                sort,
                categoryId: params?.id,
                colorIds,
                price,
                sizeIds,
                subCategoryIds
            })
        )
        return () => {
            promise.abort()
        }
    }, [dispatch, params, sort, colorIds, price, sizeIds, subCategoryIds])

    return (
        <div className={styled.filterAction}>
            <div className={styled.filterActionContainer}>
                {width > 767 ? <Filter /> : <FilterMobile />}
                {/* <Sort setSort={setSort} /> */}
            </div>
        </div>
    )
}

export default FilterSort
