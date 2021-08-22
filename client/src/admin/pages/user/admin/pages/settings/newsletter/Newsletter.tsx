import React, {useEffect} from "react"
import Container from "./container/Container"
import {useAdminDispatch} from "../../../../../../store"
import {fetchNewsletter} from "../../../../../../store/admin/newsletter/fetchNewsletter"

const Newsletter = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchNewsletter())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <Container/>
        </>
    )
}

export default Newsletter