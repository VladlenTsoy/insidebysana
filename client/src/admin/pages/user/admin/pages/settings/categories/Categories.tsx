import React, {useEffect} from "react"
import Container from "./container/Container"
import Header from "./header/Header"
import {useAdminDispatch} from "../../../../../../store"
import {fetchCategories} from "../../../../../../store/common/category/fetchCategories"

const Categories = () => {
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchCategories())
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

export default Categories
