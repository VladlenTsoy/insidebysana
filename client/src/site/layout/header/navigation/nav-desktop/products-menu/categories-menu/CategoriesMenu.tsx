import React from "react"
import {Link} from "react-router-dom"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import {useGetCategoriesQuery} from "./categoryApi"

const CategoriesMenu: React.FC = () => {
    const {data: categories = [], isLoading} = useGetCategoriesQuery()

    if (isLoading)
        return (
            <div>
                <LoadingOutlined />
            </div>
        )

    return (
        <>
            {categories.map(category => (
                <Link to={`/products/${category.id}/${category.url}`} key={category.id}>
                    {category.title}
                </Link>
            ))}
        </>
    )
}

export default CategoriesMenu
