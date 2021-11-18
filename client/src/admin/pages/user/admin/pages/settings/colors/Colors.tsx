import React, {useEffect} from "react"
import Header from "./header/Header"
import Container from "./container/Container"
import {useAdminDispatch} from "../../../../../../store"
import {fetchColors} from "../../../../../../store/admin/color/fetchColors"

const Colors = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchColors())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <Header/>
            <Container/>
        </>
    )
}

export default Colors