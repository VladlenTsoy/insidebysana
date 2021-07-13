import React, {useEffect} from "react"
import Title from "../../components/title/Title"
import EmptyBlock from "../../components/empty-block/EmptyBlock"
import {useDispatch} from "../store"
import {fetchWishlist} from "./wishlistApi"
import {useLoadingWishlist, useSelectAllWishlist} from "./wishlistSlice"
import LoaderBlock from "../../components/loader-block/LoaderBlock"
import ClothesCard from "../../components/clothes-card/ClothesCard"
import GridClothesCard from "../../components/grid-clothes-card/GridClothesCard"

const Wishlist: React.FC = () => {
    const loading = useLoadingWishlist()
    const products = useSelectAllWishlist()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchWishlist())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <Title level={1}>Избранное</Title>
            {loading ? (
                <LoaderBlock />
            ) : products.length ? (
                <GridClothesCard>
                    {products.map((product: any) => (
                        <ClothesCard product={product} key={product.id} />
                    ))}
                </GridClothesCard>
            ) : (
                <EmptyBlock />
            )}
        </>
    )
}

export default Wishlist
