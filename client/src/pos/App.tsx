import React, {useEffect} from "react"
import "./App.less"
import {Provider} from "react-redux"
import {store, useDispatch} from "./store"
import {locale} from "moment"
import "moment/locale/ru"
import {ConfigProvider} from "antd"
import Loader from "components/blocks/loader/Loader"
import ruRU from "antd/es/locale-provider/ru_RU"
import {useUser} from "./auth/authSlice"
import {BrowserRouter as Router, Switch} from "react-router-dom"
import {fetchUser} from "./auth/authApi"

const Auth = React.lazy(() => import("./auth/Auth"))
const Home = React.lazy(() => import("./Layout"))

locale("ru")

const OutputComponent = () => {
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
            {detail ? <Home /> : <Auth />}
        </React.Suspense>
    )
}

function App() {
    return (
        <Provider store={store}>
            <ConfigProvider locale={ruRU}>
                <Router>
                    <Switch>
                        <OutputComponent />
                    </Switch>
                </Router>
            </ConfigProvider>
        </Provider>
    )
}

export default App
