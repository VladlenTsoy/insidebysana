import React, {useEffect} from "react"
import {fetchPrintCategories} from "admin/store/admin/print-category/fetchPrintCategories"
import {useAdminDispatch} from "admin/store"
import Container from "./container/Container"
import Header from "./header/Header"

const PrintCategories: React.FC = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchPrintCategories())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <Header />
            <Container />
        </>
    )
}
export default PrintCategories
