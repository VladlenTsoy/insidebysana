import React from "react"
import {Loader} from "lib/ui"
import {useUser} from "../../hooks/use-user"

const Admin = React.lazy(() => import("./admin/index"))
const Cashier = React.lazy(() => import("./cashier/Cashier"))

const Index: React.FC = () => {
    const {user} = useUser()

    return (
        <>
            <React.Suspense fallback={<Loader text="Загрузка доступа..." />}>
                {user?.access === "admin" && <Admin />}
                {user?.access === "cashier" && <Cashier />}
            </React.Suspense>
        </>
    )
}

export default Index
