import React, {useEffect} from "react"
import {useAdminDispatch} from "../../../../../../store"
import {fetchSources} from "../../../../../../store/admin/source/fetchSources"
import Container from "./container/Container"
import Header from "./header/Header";

const Sources = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchSources())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <div>
            <Header />
            <Container />
        </div>
    )
}

export default Sources
