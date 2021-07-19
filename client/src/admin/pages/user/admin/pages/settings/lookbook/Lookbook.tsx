import React, {useEffect} from "react"
import {useAdminDispatch} from "../../../../../../store/admin/store"
import {fetchLookbook} from "../../../../../../store/admin/lookbook/fetchLookbook"
import Header from "./header/Header"
import Container from "./container/Container"

const Lookbook: React.FC = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchLookbook())
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