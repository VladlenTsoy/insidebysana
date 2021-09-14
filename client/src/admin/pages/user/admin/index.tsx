import React from "react"
import SidebarItems from "./layout/sidebar-items/SidebarItems"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {Navigations, ManagerNavigations} from "./layout/navigation-items/NavigationItems"
import AccountItems from "./layout/account-items/AccountItems"
import Layout from "admin/layouts/Layout"
import {LoadingBlock} from "admin/lib/ui"
import SizesProvider from "../../../lib/providers/sizes-provider/SizesProvider"
import EventsProvider from "admin/lib/providers/events-provider/EventsProvider"
import {useUser} from "admin/hooks/use-user"
import CreateProduct from "admin/features/product/product-editor/ProductEditor"

const Home = React.lazy(() => import("./pages/home/Home"))
const Orders = React.lazy(() => import("./pages/orders/Orders"))
const Products = React.lazy(() => import("./pages/products/Products"))
const Clients = React.lazy(() => import("./pages/clients/Clients"))
const Settings = React.lazy(() => import("./pages/settings/Settings"))
const Staff = React.lazy(() => import("./pages/staff/Staff"))

const Index: React.FC = () => {
    const {user} = useUser()
    return (
        <SizesProvider>
            <EventsProvider>
                <Router>
                    <Layout
                        sidebars={SidebarItems}
                        navigations={user.access === "admin" ? Navigations : ManagerNavigations}
                        accountMenu={AccountItems}
                    >
                        <React.Suspense fallback={<LoadingBlock title="Загрузка страницы..." />}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/orders" component={Orders} />
                                <Route exact path="/products/create" component={CreateProduct} />
                                <Route path="/products/:status" component={Products} />
                                <Route path="/clients" component={Clients} />
                                <Route path="/settings" component={Settings} />
                                <Route path="/staff" component={Staff} />
                            </Switch>
                        </React.Suspense>
                    </Layout>
                </Router>
            </EventsProvider>
        </SizesProvider>
    )
}

export default Index
