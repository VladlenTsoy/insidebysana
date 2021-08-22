import React, {useEffect} from "react"
import {useLoadingColors} from "../../../store/admin/color/colorSelectors"
import {useAdminDispatch} from "../../../store"
import {fetchColors} from "../../../store/admin/color/fetchColors"
import {Loader} from "../../ui"

const ColorsProvider: React.FC = ({children}) => {
    const loading = useLoadingColors()
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchColors())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading) return <Loader text={`Загрузка цветов...`} />

    return <>{children}</>
}

export default ColorsProvider
