import React from "react"
import {useGetProductsByPrintIdQuery} from "./productApi"
import {useParams} from "react-router-dom"
import ClothesCard from "components/clothes-card/ClothesCard"
import LoaderBlock from "components/loader-block/LoaderBlock"
import ErrorBlock from "components/error-block/ErrorBlock"
import GridMotion from "components/grid-motion/GridMotion"

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
