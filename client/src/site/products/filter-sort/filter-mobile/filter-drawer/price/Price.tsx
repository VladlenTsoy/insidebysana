import React from "react"
import FilterPriceRange from "components/filter-price-range/FilterPriceRange"
import {changeCurrentFilterPrice, useCurrentFilter, useFilterPrice} from "../../../../productSlice"
import {useDispatch} from "../../../../../store"
import styled from "./Price.module.css"

const Price = () => {
    const {min, max} = useFilterPrice()
    const {price} = useCurrentFilter()
    const dispatch = useDispatch()

    const onChangeHandler = (price: any) => dispatch(changeCurrentFilterPrice(price))

    return (
        <div className={styled.price}>
            <FilterPriceRange max={max} min={min} onChange={onChangeHandler} defaultValues={price} />
        </div>
    )
}

export default Price
