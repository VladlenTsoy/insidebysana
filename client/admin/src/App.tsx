import React from "react"
import "./App.less"
import {Provider} from "react-redux"
import {store} from "./store/store"
import UserProvider from "./lib/providers/user-provider/UserProvider"
import StoreProvider from "./lib/providers/store-provider/StoreProvider"
import {locale} from "moment"
import "moment/locale/ru"
import {ConfigProvider} from "antd"
import ruRU from "antd/es/locale-provider/ru_RU"
import Index from "./pages"

locale("ru")

function App() {
    return (
        <Provider store={store}>
            <ConfigProvider locale={ruRU}>
                <UserProvider>
                    <StoreProvider>
                        <Index />
                    </StoreProvider>
                </UserProvider>
            </ConfigProvider>
        </Provider>
    )
}

export default App
