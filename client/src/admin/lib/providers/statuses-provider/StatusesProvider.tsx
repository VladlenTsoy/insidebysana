import React, {useEffect} from "react"
import {useAdminDispatch} from "../../../store"
import {useLoadingStatuses} from "../../../store/admin/status/statusSelectors"
import {fetchStatuses} from "../../../store/admin/status/fetchStatuses"
import {Loader} from "../../ui"

const StatusesProvider: React.FC = ({children}) => {
    const dispatch = useAdminDispatch()
    const loading = useLoadingStatuses()

    useEffect(() => {
        const promise = dispatch(fetchStatuses())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading) return <Loader text={`Загрузка статусов...`} />

    return <>{children}</>
}

export default StatusesProvider