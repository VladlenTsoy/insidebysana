import React from "react"
import {useFilterColors} from "../../../productSlice"
import FilterButton from "../../../../../components/filter-button/FilterButton"
import DropdownCheckbox from "../../../../../components/dropdown-checkbox/DropdownCheckbox"

interface ColorsProps {
    onChange: any
}

const Colors: React.FC<ColorsProps> = ({onChange}) => {
    const colors = useFilterColors()
    const filterColors: any = colors.map(color => ({label: color.title, color: color.hex, value: String(color.id)}))
    return (
        <FilterButton title="Цвета">
            <DropdownCheckbox data={filterColors} onChange={onChange} />
        </FilterButton>
    )
}

export default Colors