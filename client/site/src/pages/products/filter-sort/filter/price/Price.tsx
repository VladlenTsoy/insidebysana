import React from "react"
import FilterButton from "../../../../../components/filter-button/FilterButton"
import {useFilterPrice} from "../../../../../store/product-card/productCardSelector"
import FilterPriceRange from "../../../../../components/filter-price-range/FilterPriceRange"

interface PriceProps {
    onChange: any
}

const Price: React.FC<PriceProps> = ({onChange}) => {
    const {min, max} = useFilterPrice()

    return (
        <FilterButton title="Стоимость">
            <FilterPriceRange max={max} min={min} onChange={onChange} />
        </FilterButton>
    )
}

export default Price