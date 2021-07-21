import React, {useEffect, useState} from "react"
import "./Products.less"
import {fetchProductColors} from "../../../../../store/admin/product-color/fetchProductColors"
import {useAdminDispatch} from "../../../../../store/admin/store"
import Container from "./container/Container"
import Header from "./header/Header"

const Products: React.FC = () => {
    const [isMiniColumns, setMiniColumns] = useState<boolean>(true)
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchProductColors())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <Header
                setMiniColumns={setMiniColumns}
                isMiniColumns={isMiniColumns}
            />
            <Container isMiniColumns={isMiniColumns} />
        </>
    )
}

export default Products
