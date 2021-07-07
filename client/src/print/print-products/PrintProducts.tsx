import React from "react"
import {useGetProductsByPrintIdQuery} from "./productApi"
import {useParams} from "react-router-dom"
import ClothesCard from "print/components/clothes-card/ClothesCard"
import LoaderBlock from "print/components/loader-block/LoaderBlock"
import ErrorBlock from "print/components/error-block/ErrorBlock"
import GridMotion from "print/components/grid-motion/GridMotion"

interface ParamsProps {
    id: string
}

const PrintProducts: React.FC = () => {
    const {id} = useParams<ParamsProps>()
    const {data, isError, isLoading} = useGetProductsByPrintIdQuery(id)

    if (isLoading) return <LoaderBlock />
    if (isError) return <ErrorBlock />

    return (
        <>
            <GridMotion>
                {!!data &&
                    data.map((product, key) => (
                        <ClothesCard
                            link={`/product/${product.id}`}
                            title={product.title}
                            image={product.url_thumbnail}
                            price={product.price}
                            discount={product.discount}
                            priceVisible
                            key={key}
                        />
                    ))}
            </GridMotion>
        </>
    )
}

export default PrintProducts
