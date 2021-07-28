import React, {useState} from "react"
import {CheckOutlined, FilterOutlined} from "@ant-design/icons"
import {Button, Drawer} from "antd"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"
import {
    changeCategoryId,
    changeSizeId,
    resetCategoryIdAndSizeId,
    useCategoryIdPos,
    useSizeIdPos
} from "pos/features/product/productSlice"
import {useGetCategoriesQuery} from "pos/layouts/categoryApi"
import {useGetSizeQuery} from "pos/layouts/sizeApi"
import {useDispatch} from "pos/store"
import "./FilterButton.less"

const FilterButton: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const {data: sizes, isLoading: isLoadingSizes} = useGetSizeQuery()
    const {data: categories, isLoading: isLoadingCategories} = useGetCategoriesQuery()
    const dispatch = useDispatch()
    const categoryId = useCategoryIdPos()
    const sizeId = useSizeIdPos()

    // Фильтрация по категориям
    const changeCategoryHandler = async (id: number) => {
        await dispatch(changeCategoryId(id === categoryId ? 0 : id))
    }

    // Фильтрация по размеру
    const changeSizeHandler = async (id: number) => {
        await dispatch(changeSizeId(id === sizeId ? 0 : id))
    }

    // Сбросить фильтр
    const resetFilterHandler = async () => {
        await dispatch(resetCategoryIdAndSizeId({categoryId: 0, sizeId: 0}))
    }

    // Открыть фильтрацию
    const openHandler = () => setVisible(true)
    // Закрыть фильтрацию
    const closeHandler = () => setVisible(false)

    return (
        <>
            <Button type="link" size="large" icon={<FilterOutlined />} onClick={openHandler}>
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

export default FilterButton
