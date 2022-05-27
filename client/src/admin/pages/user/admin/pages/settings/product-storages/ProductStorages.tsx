import React, {useEffect} from "react"
import {useAdminDispatch} from "../../../../../../store"
import Container from "./container/Container"
import Header from "./header/Header"
import {fetchProductStorage} from "../../../../../../store/admin/product-storage/fetchProductStorage"

const ProductStorages = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchProductStorage())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <div>
            <Header />
            <Container />
        </div>
    )
}

export default ProductStorages
