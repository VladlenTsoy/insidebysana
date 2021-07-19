import React from "react"
import SidebarItems from "./layout/sidebar-items/SidebarItems"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {Navigations} from "./layout/navigation-items/NavigationItems"
import AccountItems from "./layout/account-items/AccountItems"
import Layout from "admin/lib/layouts/facebook/Layout"
import {LoadingBlock} from "admin/lib/ui"
import CategoriesProvider from "../../../lib/providers/categories-provider/CategoriesProvider"
import ColorsProvider from "../../../lib/providers/colors-provider/ColorsProvider"
import SizesProvider from "../../../lib/providers/sizes-provider/SizesProvider"
import StatusesProvider from "../../../lib/providers/statuses-provider/StatusesProvider"
import EventsProvider from "admin/lib/providers/events-provider/EventsProvider"

const Home = React.lazy(() => import("./pages/home/Home"))
const Orders = React.lazy(() => import("./pages/orders/Orders"))
const Products = React.lazy(() => import("./pages/products/Products"))
const Clients = React.lazy(() => import("./pages/clients/Clients"))
const Settings = React.lazy(() => import("./pages/settings/Settings"))
const Staff = React.lazy(() => import("./pages/staff/Staff"))

const Index: React.FC = () => {
    return (
        <CategoriesProvider>
            <ColorsProvider>
                <SizesProvider>
                    <StatusesProvider>
                        <EventsProvider>
                            <Router>
                                <Layout
                                    sidebars={SidebarItems}
                                    navigations={Navigations}
                                    accountMenu={AccountItems}
                                >
                                    <React.Suspense fallback={<LoadingBlock title="Загрузка страницы..." />}>
                                        <Switch>
                                            <Route exact path="/" component={Home} />
                                            <Route path="/orders" component={Orders} />
                                            <Route path="/products" component={Products} />
                                            <Route path="/clients" component={Clients} />
                                            <Route path="/settings" component={Settings} />
                                            <Route path="/staff" component={Staff} />
                                        </Switch>
                                    </React.Suspense>
                                </Layout>
                            </Router>
                        </EventsProvider>
                    </StatusesProvider>
                </SizesProvider>
            </ColorsProvider>
        </CategoriesProvider>
    )
}

export default Index
