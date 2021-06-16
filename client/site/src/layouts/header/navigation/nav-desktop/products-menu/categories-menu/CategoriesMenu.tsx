import React from "react"
import {Link} from "react-router-dom"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import {useLoadingCategories, useSelectAllCategories} from "../../../../../../store/category/categoriesSelector"

const CategoriesMenu = () => {
    const categories = useSelectAllCategories()
    const loading = useLoadingCategories()

    if (loading)
        return <div><LoadingOutlined/></div>

    return (
        <>
            {
                categories.map(category =>
                    <Link to={`/products/${category.id}/${category.url}`} key={category.id}>{category.title}</Link>
                )
            }
        </>
    )
}

export default CategoriesMenu