import React from "react"
import "./App.less"
import Layout from "./layout/Layout"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./home/Home"
import PrintProduct from "./print-product/PrintProduct"

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/print-product" component={PrintProduct} />
                </Switch>
            </Layout>
        </Router>
    )
}

export default App
