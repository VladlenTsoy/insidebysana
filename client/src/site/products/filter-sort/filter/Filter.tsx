import React from "react"
import styled from "./Filter.module.css"
import Sizes from "./sizes/Sizes"
import Categories from "./categories/Categories"
import Colors from "./colors/Colors"
import Price from "./price/Price"
import {useDispatch} from "../../../store"
import {
    changeCurrentFilterCategories,
    changeCurrentFilterColors,
    changeCurrentFilterPrice,
    changeCurrentFilterSizes
} from "../../productSlice"

interface FilterProps {}

const Filter: React.FC<FilterProps> = () => {
    const dispatch = useDispatch()

    const filterCategories = (categoryIds: any) => dispatch(changeCurrentFilterCategories(categoryIds))
    const filterColors = (colorIds: any) => dispatch(changeCurrentFilterColors(colorIds))
    const filterPrice = (price: any) => dispatch(changeCurrentFilterPrice(price))
    const filterSizes = (sizeIds: any) => dispatch(changeCurrentFilterSizes(sizeIds))

    return (
        <div className={styled.filter}>
            <Categories onChange={filterCategories} />
            <Sizes onChange={filterSizes} />
            <Colors onChange={filterColors} />
            <Price onChange={filterPrice} />
        </div>
    )
}

export default Filter
