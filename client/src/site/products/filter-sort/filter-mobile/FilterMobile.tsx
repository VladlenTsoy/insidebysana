import React, {useState} from "react"
import FilterOutlined from "@ant-design/icons/FilterOutlined"
import styled from "./FilterMobile.module.css"
import Drawer from "../../../../components/drawer/Drawer"
import FilterDrawer from "./filter-drawer/FilterDrawer"

interface FilterSortMobileProps {
}

const FilterMobile: React.FC<FilterSortMobileProps> = () => {
    const [visible, setVisible] = useState(false)

    const onClickHandler = () => setVisible(true)

    const onClose = () => setVisible(false)

    return (
        <>
            <div className={styled.filter} onClick={onClickHandler}>
                <span>Фильтрация</span><FilterOutlined />
            </div>
            <Drawer visible={visible} onClose={onClose}>
                <FilterDrawer onClose={onClose}/>
            </Drawer>
        </>
    )
}

export default FilterMobile