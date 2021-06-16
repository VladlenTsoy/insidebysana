import React from "react"
import {useCurrentFilter, useFilterPrice} from "../../../../../../store/product-card/productCardSelector"
import FilterPriceRange from "../../../../../../components/filter-price-range/FilterPriceRange"
import {changeCurrentFilterPrice} from "store/product-card/productCardSlice"
import {useDispatch} from "../../../../../../store/store"
import styled from "./Price.module.css"

const Price = () => {
    const {min, max} = useFilterPrice()
    const {price} = useCurrentFilter()
    const dispatch = useDispatch()

    const onChangeHandler = (price: any) => dispatch(changeCurrentFilterPrice(price))

    return (
        <div className={styled.price}>
            <FilterPriceRange max={max} min={min} onChange={onChangeHandler} defaultValues={price}/>
        </div>
    )
}

export default Price