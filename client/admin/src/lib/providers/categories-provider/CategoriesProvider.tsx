import React, {useEffect} from "react"
import {useLoadingCategory} from "../../../store/common/category/categorySelectors"
import {useCommonDispatch} from "../../../store/common/store"
import {fetchCategories} from "../../../store/common/category/fetchCategories"
import {Loader} from "../../ui"

const CategoriesProvider: React.FC = ({children}) => {
    const loading = useLoadingCategory()
    const dispatch = useCommonDispatch()

    useEffect(() => {
        const promise = dispatch(fetchCategories())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading) return <Loader text={`Загрузка категорий...`} />

    return <>{children}</>
}

export default CategoriesProvider
