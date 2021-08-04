import React, {useEffect} from "react"
import "./App.less"
import {useDispatch} from "./store"
import Loader from "components/blocks/loader/Loader"
import {useUser} from "./auth/authSlice"
import {Route} from "react-router-dom"
import {fetchUser} from "./auth/authApi"
import Layout from "./layouts/Layout"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"

const Auth = React.lazy(() => import("./auth/Auth"))
const Home = React.lazy(() => import("./pages/Home"))
const Orders = React.lazy(() => import("./pages/Orders"))

const Routers: React.FC = () => {
    const {detail, token, loading} = useUser()
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) {
            const promise = dispatch(fetchUser())
            return () => {
                promise.abort()
            }
        }
    }, [dispatch, token])

    if (!!token && loading) return <Loader text="Загрузка доступа..." />
    return (
        <React.Suspense fallback={<Loader text="Загрузка доступа..." />}>
            {detail ? (
                <Layout>
                    <React.Suspense fallback={<LoadingBlock title="Загрузка..." />}>
                        <Route exact path="/" component={Home} />
                        <Route path="/orders" component={Orders} />
                    </React.Suspense>
                </Layout>
            ) : (
                <Auth />
            )}
        </React.Suspense>
    )
}
export default Routers
