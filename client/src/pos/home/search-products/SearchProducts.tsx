import {CheckOutlined, FilterOutlined, SearchOutlined} from "@ant-design/icons"
import {Button, Input, Drawer} from "antd"
import React, {useEffect, useState} from "react"
import {fetchProductColorBySearch} from "../fetchProductColorBySearch"
import {useCategoryIdPos, useSizeIdPos} from "../posSelectors"
import {useDispatch} from "../../store"
import GridProducts from "./GridProducts"
import {useGetSizeQuery} from "./sizeApi"
import {changeCategoryId, changeSizeId, resetCategoryIdAndSizeId} from "../posSlice"
import {useGetCategoriesQuery} from "./categoryApi"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"
import "./SearchProducts.less"

const ButtonFilter = () => {
    const [visible, setVisible] = useState(false)
    const {data: sizes, isLoading: isLoadingSizes} = useGetSizeQuery()
    const {data: categories, isLoading: isLoadingCategories} = useGetCategoriesQuery()
    const dispatch = useDispatch()
    const categoryId = useCategoryIdPos()
    const sizeId = useSizeIdPos()

    const changeCategoryHandler = async (id: number) => {
        await dispatch(changeCategoryId(id))
    }

    const changeSizeHandler = async (id: number) => {
        await dispatch(changeSizeId(id))
    }

    const resetFilterHandler = async () => {
        await dispatch(resetCategoryIdAndSizeId({categoryId: 0, sizeId: 0}))
    }

    const openHandler = () => setVisible(true)
    const closeHandler = () => setVisible(false)

    return (
        <>
            <Button type="primary" size="large" icon={<FilterOutlined />} onClick={openHandler}>
                Фильтрация
            </Button>
            <Drawer
                closeIcon={false}
                visible={visible}
                onClose={closeHandler}
                placement="left"
                width="370"
                className="drawer-filter"
            >
                <div className="filter">
                    {isLoadingCategories || isLoadingSizes ? (
                        <LoadingBlock />
                    ) : (
                        <div className="filter-container">
                            <div className="filter-list categories-list">
                                <div
                                    className={`filter-item filter-item-all ${
                                        categoryId === 0 && "filter-item-active"
                                    }`}
                                    onClick={() => changeCategoryHandler(0)}
                                >
                                    {categoryId === 0 && <CheckOutlined />}
                                    Все
                                </div>
                                {categories?.map(category => (
                                    <div className="filter-group" key={category.id}>
                                        <span className="title-group"> {category.title}</span>
                                        <div>
                                            {category.sub_categories?.map(sub => (
                                                <div
                                                    className={`filter-item ${
                                                        categoryId === sub.id && "filter-item-active"
                                                    }`}
                                                    key={sub.id}
                                                    onClick={() => changeCategoryHandler(sub.id)}
                                                >
                                                    {categoryId === sub.id && <CheckOutlined />}
                                                    {sub.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="filter-list sizes-list">
                                <div
                                    className={`filter-item filter-item-all ${
                                        sizeId === 0 && "filter-item-active"
                                    }`}
                                    onClick={() => changeSizeHandler(0)}
                                >
                                    {sizeId === 0 && <CheckOutlined />}
                                    Все
                                </div>
                                {sizes?.map(size => (
                                    <div
                                        className={`filter-item ${
                                            sizeId === size.id && "filter-item-active"
                                        }`}
                                        key={size.id}
                                        onClick={() => changeSizeHandler(size.id)}
                                    >
                                        {sizeId === size.id && <CheckOutlined />}
                                        {size.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="filter-actions">
                        <Button block size="large" onClick={resetFilterHandler}>
                            Сбросить
                        </Button>
                        <Button type="primary" block size="large" onClick={closeHandler}>
                            Применить
                        </Button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

interface SearchProductsProps {
    searchRef: any
}

const SearchProducts: React.FC<SearchProductsProps> = ({searchRef}) => {
    const dispatch = useDispatch()

    const [search, setSearch] = useState<string>("")
    const categoryId = useCategoryIdPos()
    const sizeId = useSizeIdPos()

    let timeout: any

    const onChangeHandler = (e: any) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            setSearch(e.target.value)
        }, 500)
    }

    useEffect(() => {
        const promise = dispatch(fetchProductColorBySearch({search, categoryId, sizeId}))
        return () => {
            promise.abort()
        }
    }, [search, dispatch, categoryId, sizeId])

    return (
        <div className="search-container">
            <div className="search-wrapper">
                <ButtonFilter />
                <Input
                    suffix={<SearchOutlined />}
                    size="large"
                    onChange={onChangeHandler}
                    ref={searchRef}
                    placeholder="Введите SKU или название товара"
                />
            </div>
            <div className="products-wrapper">
                <GridProducts />
            </div>
        </div>
    )
}
export default SearchProducts
