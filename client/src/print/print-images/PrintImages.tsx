import ClothesCard from "print/components/clothes-card/ClothesCard"
import LoaderBlock from "print/components/loader-block/LoaderBlock"
import ErrorBlock from "print/components/error-block/ErrorBlock"
import React from "react"
import {useParams} from "react-router-dom"
import {useGetPrintImagesByCategoryIdQuery} from "./printImageApi"
import GridMotion from "print/components/grid-motion/GridMotion"

interface ParamsProps {
    id: string
}

const PrintImages: React.FC = () => {
    const {id} = useParams<ParamsProps>()
    const {data, isLoading, isError} = useGetPrintImagesByCategoryIdQuery(id)

    if (isLoading) return <LoaderBlock />
    if (isError) return <ErrorBlock />

    return (
        <GridMotion>
            {data &&
                data.map(printImage => (
                    <ClothesCard
                        title={printImage.title}
                        image={printImage.url_image}
                        price={printImage.price}
                        key={printImage.id}
                        link={`/image/${printImage.id}`}
                        priceVisible
                    />
                ))}
        </GridMotion>
    )
}
export default PrintImages
