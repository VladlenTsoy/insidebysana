import React, {useEffect} from "react"
import Container from "./container/Container"
import {useAdminDispatch} from "../../../../../../store/admin/store"
import {fetchTags} from "../../../../../../store/admin/tag/fetchTags"

const Tags = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchTags())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <Container />
        </>
    )
}

export default Tags