import React from "react"
import "./App.less"
import {Provider} from "react-redux"
import {store} from "./store"
import {locale} from "moment"
import "moment/locale/ru"
import {ConfigProvider} from "antd"
import ruRU from "antd/es/locale-provider/ru_RU"
import {BrowserRouter as Router, Switch} from "react-router-dom"
import Routers from "./Routers"

locale("ru")

function App() {
    return (
        <Provider store={store}>
            <ConfigProvider locale={ruRU}>
                <Router>
                    <Switch>
                        <Routers />
                    </Switch>
                </Router>
            </ConfigProvider>
        </Provider>
    )
}

export default App
