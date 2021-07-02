import React from "react"
import ClothesCard from "components/clothes-card/ClothesCard"
import ErrorBlock from "components/error-block/ErrorBlock"
import {useGetProductsLatestQuery} from "./homeApi"
import LoaderBlock from "components/loader-block/LoaderBlock"
import GridMotion from "components/grid-motion/GridMotion"

const Home: React.FC = () => {
    const {data, isLoading, isError} = useGetProductsLatestQuery()

    if (isLoading) return <LoaderBlock />
    if (isError) return <ErrorBlock />

    return (
        <GridMotion>
            {data &&
                [...data, ...data, ...data, ...data, ...data].map((product, key) => (
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
    )
}
export default Home
