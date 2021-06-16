import React from "react"
import "./App.css"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {Provider} from "react-redux"
import {store} from "./store/store"
import LoaderBlock from "./components/loader-block/LoaderBlock"
import Layout from "layouts/Layout"

const Home = React.lazy(() => import("./pages/home/Home"))
const Products = React.lazy(() => import("./pages/products/Products"))
const Product = React.lazy(() => import("./pages/product/Product"))
const Wishlist = React.lazy(() => import("./pages/wishlist/Wishlist"))
const Cart = React.lazy(() => import("./pages/cart/Cart"))
const Account = React.lazy(() => import("./pages/account/Account"))
const PublicOffer = React.lazy(() => import("./pages/dynamic-pages/public-offer/PublicOffer"))
const ReturnPolicy = React.lazy(() => import("./pages/dynamic-pages/return-policy/ReturnPolicy"))
const PrivacyPolicy = React.lazy(() => import("./pages/dynamic-pages/privacy-policy/PrivacyPolicy"))
const Payment = React.lazy(() => import("./pages/dynamic-pages/payment/Payment"))
const Delivery = React.lazy(() => import("./pages/dynamic-pages/delivery/Delivery"))
const Cookies = React.lazy(() => import("./pages/dynamic-pages/cookies/Cookies"))
const Lookbook = React.lazy(() => import("./pages/dynamic-pages/lookbook/Lookbook"))
const AboutUs = React.lazy(() => import("./pages/about-us/AboutUs"))
const Contacts = React.lazy(() => import("./pages/contacts/Contacts"))
const Auth = React.lazy(() => import("./pages/auth/Auth"))
const Search = React.lazy(() => import("./pages/search/Search"))
const Order = React.lazy(() => import("./pages/order/Order"))

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
