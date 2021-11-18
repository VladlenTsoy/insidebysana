import React, {useEffect} from "react"
import Container from "./container/Container"
import Header from "./header/Header"
import {fetchSizes} from "../../../../../../store/common/size/fetchSizes"
import {useAdminDispatch} from "../../../../../../store"

const Sizes = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchSizes())
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

export default Sizes
