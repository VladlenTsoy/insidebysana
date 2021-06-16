import React from "react"
import {useCurrentFilter, useFilterCategories} from "../../../../../../store/product-card/productCardSelector"
import styled from "./Categoires.module.css"
import CheckOutlined from "@ant-design/icons/CheckOutlined"
import LoaderBlock from "../../../../../../components/loader-block/LoaderBlock"
import {useDispatch} from "../../../../../../store/store"
import {changeCurrentFilterCategories} from "../../../../../../store/product-card/productCardSlice"

const Categories: React.FC = () => {
    const categories = useFilterCategories()
    const {subCategoryIds: filterCategoryIds} = useCurrentFilter()
    const dispatch = useDispatch()

    const onClickHandler = (categoryId: number) => {
        dispatch(changeCurrentFilterCategories(
            filterCategoryIds.includes(categoryId) ?
                filterCategoryIds.filter(catId => catId !== categoryId) :
                [...filterCategoryIds, categoryId]
        ))
    }

    if (!categories.length)
        return <LoaderBlock />

    return (
        <>
            {categories.map(category =>
                <div className={styled.category} key={category.id} onClick={() => onClickHandler(category.id)}>
                    <span>{category.title}</span>
                    {filterCategoryIds.includes(category.id) && <CheckOutlined />}
                </div>
            )}
        </>
    )
}

export default Categories