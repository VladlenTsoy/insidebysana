import React from "react"
import FilterButton from "../../../../../components/filter-button/FilterButton"
import DropdownCheckbox from "../../../../../components/dropdown-checkbox/DropdownCheckbox"
import {useFilterCategories} from "../../../../../store/product-card/productCardSelector"

interface CategoriesProps {
    onChange: any
}

const Categories: React.FC<CategoriesProps> = ({onChange}) => {
    const categories = useFilterCategories()
    const filterCategories: any = categories.map(category => ({label: category.title, value: String(category.id)}))
    return (
        <FilterButton title="Категории">
            <DropdownCheckbox data={filterCategories} onChange={onChange}/>
        </FilterButton>
    )
}

export default Categories