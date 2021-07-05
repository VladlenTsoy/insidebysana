import React from "react"
import "./App.less"
import Layout from "./layout/Layout"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./home/Home"
import Cart from "./cart/Cart"
import PrintImages from "./print-images/PrintImages"
import PrintProducts from "./print-products/PrintProducts"
import PrintProduct from "./print-products/PrintProduct"

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/category/:id" component={PrintImages} />
                    <Route path="/image/:id" component={PrintProducts} />
                    <Route path="/product/:id" component={PrintProduct} />
                </Switch>
            </Layout>
        </Router>
    )
}

export default App
