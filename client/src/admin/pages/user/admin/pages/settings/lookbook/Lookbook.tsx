import React, {useEffect} from "react"
import {useAdminDispatch} from "../../../../../../store"
import {fetchLookbookCategories} from "../../../../../../store/admin/lookbook/fetchLookbookCategories"
import Header from "./Header"
import Container from "./Container"

const Lookbook: React.FC = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchLookbookCategories())
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

export default Lookbook
