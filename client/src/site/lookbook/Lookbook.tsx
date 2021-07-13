import React from "react"
import Title from "components/title/Title"
import styled from "./Lookbook.module.css"
import LoaderBlock from "components/loader-block/LoaderBlock"
import EmptyBlock from "components/empty-block/EmptyBlock"
import {useGetLookbookQuery} from "./lookbookApi"

const Lookbook: React.FC = () => {
    const {data: lookbook = [], isLoading} = useGetLookbookQuery()

    return (
        <>
            <Title level={1}>LOOKBOOK</Title>
            <div className="container">
                {isLoading ? (
                    <LoaderBlock />
                ) : lookbook.length ? (
                    lookbook.map(item => (
                        <div className={styled.lookbookItem} key={item.id}>
                            <img src={item.url_image} alt={`lookbook-${item.id}`} />
                        </div>
                    ))
                ) : (
                    <EmptyBlock />
                )}
            </div>
        </>
    )
}

export default Lookbook
