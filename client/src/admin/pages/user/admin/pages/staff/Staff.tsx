import React, {useEffect, useState} from "react"
import Header from "./header/Header"
import {useAdminDispatch} from "../../../../../store/admin/store"
import {fetchStaff} from "../../../../../store/admin/staff/fetchStaff"
import Container from "./container/Container"

const Staff = () => {
    const [search, setSearch] = useState("")
    const [sorter, setSorter] = useState({field: "created_at", order: "descend"})
    const [pagination, setPagination] = useState({current: 1, pageSize: 10})

    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchStaff({search, sorter, pagination}))
        return () => {
            promise.abort()
        }
    }, [dispatch, search, sorter, pagination])

    return (
        <>
            <Header setSearch={setSearch} />
            <Container setSorter={setSorter} setPagination={setPagination} />
        </>
    )
}

export default Staff
