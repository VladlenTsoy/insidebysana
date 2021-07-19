import React, {useEffect} from "react"
import Header from "./Header"
import Container from "./Container"
import {fetchPrintImages} from "admin/store/admin/print-image/fetchPrintImages"
import {useAdminDispatch} from "admin/store/admin/store"

const PrintImages: React.FC = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchPrintImages())
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
export default PrintImages
