import React from "react"
import {Loader} from "admin/lib/ui"
import {useUser} from "../../hooks/use-user"

const Admin = React.lazy(() => import("./admin/index"))

const Index: React.FC = () => {
    const {user} = useUser()

    return (
        <>
            <React.Suspense fallback={<Loader text="Загрузка доступа..." />}>
                {user?.access === "admin" && <Admin />}
                {user?.access === "manager" && <Admin />}
            </React.Suspense>
        </>
    )
}

export default Index
