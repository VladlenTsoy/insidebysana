import React, {useEffect} from "react"
import Header from "./header/Header"
import Container from "./container/Container"
import {useAdminDispatch} from "../../../../../../store"
import {fetchPromoCodes} from "../../../../../../store/admin/promo-code/fetchPromoCodes"

const PromoCodes = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchPromoCodes())
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

export default PromoCodes