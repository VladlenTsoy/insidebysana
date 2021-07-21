import React from "react"
import Title from "components/title/Title"
import styled from "./Lookbook.module.css"
import LoaderBlock from "components/loader-block/LoaderBlock"
import EmptyBlock from "components/empty-block/EmptyBlock"
import {useGetLookbookByLatestQuery, useGetLookbookCategoriesQuery} from "./lookbookApi"
import {Link} from "react-router-dom"

interface LookbookCategoryProps {
    categoryId: number
}

export const LookbookCategories: React.FC<LookbookCategoryProps> = ({categoryId}) => {
    const {data: categories, isLoading} = useGetLookbookCategoriesQuery(categoryId)
    if (isLoading) return <LoaderBlock />
    return (
        <>
            {categories &&
                categories.map(category => (
                    <Link to={`/lookbook/${category.id}`} className={styled.lookbookItem} key={category.id}>
                        <img src={category.url_image} alt={`lookbook-${category.id}`} />
                    </Link>
                ))}
        </>
    )
}

const Lookbook: React.FC = () => {
    const {data: lookbook, isLoading} = useGetLookbookByLatestQuery()

    return (
        <>
            <Title level={1}>{isLoading ? "LOOKBOOK" : lookbook?.title}</Title>
            <div className="container">
                {isLoading ? (
                    <LoaderBlock />
                ) : lookbook ? (
                    lookbook.images.map(item => (
                        <div className={styled.lookbookItem} key={item.id}>
                            <img src={item.url_image} alt={`lookbook-${item.id}`} />
                        </div>
                    ))
                ) : (
                    <EmptyBlock />
                )}
                {lookbook && <LookbookCategories categoryId={lookbook.id} />}
            </div>
        </>
    )
}

export default Lookbook
