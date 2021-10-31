import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Layout from "admin/layouts/Layout"
import {LoadingBlock} from "admin/lib/ui"
import EventsProvider from "admin/lib/providers/events-provider/EventsProvider"

const Home = React.lazy(() => import("./pages/home/Home"))
const Orders = React.lazy(() => import("./pages/orders/Orders"))
const OrdersArchive = React.lazy(
    () => import("admin/features/order/order-archive/OrderArchive")
)
const OrderEditor = React.lazy(
    () => import("admin/features/order/order-editor/OrderEditor")
)
const Products = React.lazy(() => import("./pages/products/Products"))
const Clients = React.lazy(() => import("./pages/clients/Clients"))
const Settings = React.lazy(() => import("./pages/settings/Settings"))
const Staff = React.lazy(() => import("./pages/staff/Staff"))
const CreateProduct = React.lazy(
    () => import("admin/features/product/product-editor/ProductEditor")
)

const Index: React.FC = () => {
    return (
        <EventsProvider>
            <Router>
                <Layout>
                    <React.Suspense
                        fallback={<LoadingBlock title="Загрузка страницы..." />}
                    >
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/orders" component={Orders} />
                            <Route exact path="/orders/:id" component={Orders} />
                            <Route
                                path="/orders/archive"
                                component={OrdersArchive}
                            />
                            <Route
                                path="/orders/create"
                                component={OrderEditor}
                            />
                            <Route
                                exact
                                path="/products/create"
                                component={CreateProduct}
                            />
                            <Route
                                exact
                                path="/products/edit/:id"
                                component={CreateProduct}
                            />
                            <Route
                                exact
                                path="/products/edit/:id/:color"
                                component={CreateProduct}
                            />
                            <Route
                                path="/products/:status"
                                component={Products}
                            />
                            <Route path="/clients" component={Clients} />
                            <Route path="/settings" component={Settings} />
                            <Route path="/staff" component={Staff} />
                        </Switch>
                    </React.Suspense>
                </Layout>
            </Router>
        </EventsProvider>
    )
}

export default Index
