import React from "react"
import FilterButton from "../../../../../components/filter-button/FilterButton"
import DropdownCheckbox from "../../../../../components/dropdown-checkbox/DropdownCheckbox"
import {useFilterSizes} from "../../../productSlice"

interface SizesProps {
    onChange: any
}

const Sizes: React.FC<SizesProps> = ({onChange}) => {
    const sizes = useFilterSizes()
    const filterSizes: any = sizes.map(size => ({label: size.title, value: String(size.id)}))
    return (
        <FilterButton title="Размеры">
            <DropdownCheckbox data={filterSizes} onChange={onChange}/>
        </FilterButton>
    )
}

export default Sizes