import FilterButton from "./FilterButton"
import React from "react"
import Search from "./Search"
import FilterTags from "./FilterTags"
import {useGetAllSizesQuery} from "admin/features/size/sizeApi"
import {useGetAllCategoriesQuery} from "admin/features/category/categoryApi"

interface HeaderProps {
    onSearch: (e: any) => void
    onCategories: (categoryId?: number) => void
    onSizes: (sizeId?: number) => void
    categoryIds: number[]
    sizeIds: number[]
    search: string
}

const Header: React.FC<HeaderProps> = ({search, categoryIds, sizeIds, onSearch, onCategories, onSizes}) => {
    const {data: sizes, isLoading: isLoadingSizes} = useGetAllSizesQuery()
    const {data: categories, isLoading: isLoadingCategories} = useGetAllCategoriesQuery()

    return (
        <>
            <div className="header">
                <FilterButton
                    sizes={sizes}
                    categories={categories}
                    onSizes={onSizes}
                    onCategories={onCategories}
                    categoryIds={categoryIds}
                    sizeIds={sizeIds}
                    isLoadingSizes={isLoadingSizes}
                    isLoadingCategories={isLoadingCategories}
                />
                <Search search={search} onSearch={onSearch} />
            </div>
            {!!(categoryIds.length || sizeIds.length) && (
                <div className="filter-sorter">
                    <FilterTags
                        sizes={sizes}
                        categories={categories}
                        categoryIds={categoryIds}
                        sizeIds={sizeIds}
                        isLoadingSizes={isLoadingSizes}
                        isLoadingCategories={isLoadingCategories}
                        onCategories={onCategories}
                        onSizes={onSizes}
                    />
                    {/* <Sorter /> */}
                </div>
            )}
        </>
    )
}
export default Header
