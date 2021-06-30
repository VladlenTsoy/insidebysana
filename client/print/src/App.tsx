import React from "react"
import "./App.less"
import Layout from "./layout/Layout"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./home/Home"
import PrintImages from "./print-images/PrintImages"
import PrintProducts from "./print-products/PrintProducts"
import PrintProduct from "./print-products/PrintProduct"

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/category/:id" component={PrintImages} />
                    <Route exact path="/image/:id" component={PrintProducts} />
                    <Route exact path="/product/:id" component={PrintProduct} />
                </Switch>
            </Layout>
        </Router>
    )
}

export default App
