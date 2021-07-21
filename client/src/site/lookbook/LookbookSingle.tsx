import EmptyBlock from "components/empty-block/EmptyBlock"
import LoaderBlock from "components/loader-block/LoaderBlock"
import Title from "components/title/Title"
import React from "react"
import {useParams} from "react-router-dom"
import {useGetLookbookByCategoryIdQuery} from "./lookbookApi"
import styled from "./Lookbook.module.css"
import {LookbookCategories} from "./Lookbook"

interface ParamsProps {
    id: string
}

const LookbookSingle: React.FC = () => {
    const {id} = useParams<ParamsProps>()
    const {data: lookbook, isLoading} = useGetLookbookByCategoryIdQuery(id)
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
export default LookbookSingle
