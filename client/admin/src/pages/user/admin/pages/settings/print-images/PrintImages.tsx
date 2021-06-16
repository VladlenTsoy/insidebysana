import React, {useEffect} from "react"
import Header from "./header/Header"
import Container from "./container/Container"
import {fetchPrintImages} from "store/admin/print-image/fetchPrintImages"
import {useAdminDispatch} from "store/admin/store"

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
