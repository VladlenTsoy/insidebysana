import {Tag} from "antd"
import React from "react"
import {Category, SubCategory} from "types/Category"
import {Size} from "types/Size"
import styles from "./FilterTags.module.less"

interface FilterTagsProps {
    sizes?: Size[]
    categories?: Category[]
    categoryIds: number[]
    sizeIds: number[]
    isLoadingCategories: boolean
    isLoadingSizes: boolean
    onCategories: (categoryId: number) => void
    onSizes: (sizeId: number) => void
}

const FilterTags: React.FC<FilterTagsProps> = ({
    categoryIds,
    categories,
    sizeIds,
    sizes,
    isLoadingCategories,
    isLoadingSizes,
    onCategories,
    onSizes
}) => {
    return (
        <>
            <div className={styles.filterSelections}>
                {categoryIds.map(categoryId => {
                    const isFind = categories
                        ?.reduce<SubCategory[]>(
                            (acc, category) => [...acc, ...(category.sub_categories || [])],
                            []
                        )
                        ?.find(category => category.id === Number(categoryId))
                    if (isFind)
                        return (
                            <Tag className={styles.tag} closable onClose={() => onCategories(categoryId)} key={`size-${categoryId}`}>
                                <b>Категория:</b>
                                {isFind.title}
                            </Tag>
                        )
                    return null
                })}
                {sizeIds.map(sizeId => {
                    const isFind = sizes?.find(size => size.id === Number(sizeId))
                    if (isFind)
                        return (
                            <Tag className={styles.tag} closable onClose={() => onSizes(sizeId)} key={`size-${sizeId}`}>
                                <b>Размер:</b>
                                {isFind.title}
                            </Tag>
                        )
                    return null
                })}
            </div>
        </>
    )
}
export default FilterTags
