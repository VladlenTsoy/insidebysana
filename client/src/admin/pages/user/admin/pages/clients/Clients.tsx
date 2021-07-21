import React, {useEffect, useState} from "react"
import {useAdminDispatch} from "../../../../../store/admin/store"
import {fetchClients} from "../../../../../store/admin/client/fetchClients"
import Header from "./header/Header"
import Container from "./container/Container"

const Clients = () => {
    const [search, setSearch] = useState<string>("")
    const [sorter, setSorter] = useState({field: "created_at", order: "descend"})
    const [pagination, setPagination] = useState({current: 1, pageSize: 10})

    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchClients({search, sorter, pagination}))
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

export default Clients
