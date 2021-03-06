import React, {useEffect, useState} from "react"
import {store} from "../../../store/store"
import {Loader} from "../../ui"
import {useUser} from "../../../hooks/use-user"

const StoreProvider: React.FC = ({children}) => {
    const {user} = useUser()
    const [loading, setLoading] = useState(!!user)

    useEffect(() => {
        if (user?.id) {
            ;(async () => {
                // setLoading(true)
                if (user.access === "admin" || user.access === "manager") {
                    const {adminReducer} = await import("../../../store/admin/store")
                    // @ts-ignore
                    store.replaceReducer(adminReducer)
                } else if (user.access === "cashier") {
                    const {cashierReducer} = await import("../../../store/cashier/store")
                    // @ts-ignore
                    store.replaceReducer(cashierReducer)
                }
                setLoading(false)
            })()
        } else setLoading(false)
    }, [user])

    if (loading) return <Loader text={`Загрузка пользователя...`} />

    return <>{children}</>
}

export default StoreProvider
