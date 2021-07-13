import React from "react"
import "./App.css"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {Provider} from "react-redux"
import {store} from "./store"
import LoaderBlock from "components/loader-block/LoaderBlock"
import Layout from "./layout/Layout"

const Home = React.lazy(() => import("./home/Home"))
const Products = React.lazy(() => import("./products/Products"))
const Product = React.lazy(() => import("./products/product/Product"))
const Wishlist = React.lazy(() => import("./wishlist/Wishlist"))
const Cart = React.lazy(() => import("./cart/Cart"))
const Account = React.lazy(() => import("./account/Account"))
const PublicOffer = React.lazy(() => import("./pages/PublicOffer"))
const ReturnPolicy = React.lazy(() => import("./pages/ReturnPolicy"))
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"))
const Payment = React.lazy(() => import("./pages/Payment"))
const Delivery = React.lazy(() => import("./pages/Delivery"))
const Cookies = React.lazy(() => import("./pages/Cookies"))
const Lookbook = React.lazy(() => import("./lookbook/Lookbook"))
const AboutUs = React.lazy(() => import("./pages/AboutUs"))
const Contacts = React.lazy(() => import("./pages/Contacts"))
const Auth = React.lazy(() => import("./auth/Auth"))
const Search = React.lazy(() => import("./products/SearchProducts"))
const Order = React.lazy(() => import("./orders/Order"))

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Switch>
                        <React.Suspense fallback={<LoaderBlock />}>
                            <Route exact path="/" component={Home} />
                            <Route path="/about-us" component={AboutUs} />
                            <Route path="/products/:id" component={Products} />
                            <Route path="/product/:id" component={Product} />
                            <Route path="/lookbook" component={Lookbook} />
                            <Route path="/contacts" component={Contacts} />
                            <Route path="/wishlist" component={Wishlist} />
                            <Route path="/cart" component={Cart} />
                            <Route path="/account" component={Account} />
                            <Route path="/public-offer" component={PublicOffer} />
                            <Route path="/return-policy" component={ReturnPolicy} />
                            <Route path="/privacy-policy" component={PrivacyPolicy} />
                            <Route path="/payment" component={Payment} />
                            <Route path="/delivery" component={Delivery} />
                            <Route path="/cookies" component={Cookies} />
                            <Route path="/auth" component={Auth} />
                            <Route path="/search" component={Search} />
                            <Route path="/order/:id" component={Order} />
                        </React.Suspense>
                    </Switch>
                </Layout>
            </Router>
        </Provider>
    )
}

export default App
