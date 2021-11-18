import React from "react"
import "./Settings.less"
import {Menu, Row, Col} from "antd"
import {Link, Route, Redirect, useLocation} from "react-router-dom"
import {LoadingBlock} from "../../../../../lib/ui"

const Banners = React.lazy(() => import("./banners/Banners"))
const Sources = React.lazy(() => import("./sources/Sources"))
const Categories = React.lazy(() => import("./categories/Categories"))
const Lookbook = React.lazy(() => import("./lookbook/Lookbook"))
const Newsletter = React.lazy(() => import("./newsletter/Newsletter"))
const Sizes = React.lazy(() => import("./sizes/Sizes"))
const Tags = React.lazy(() => import("./tags/Tags"))
const Colors = React.lazy(() => import("./colors/Colors"))
const PromoCodes = React.lazy(() => import("./promo-codes/PromoCodes"))
const PrintCategories = React.lazy(() => import("./print-categories/PrintCategories"))
const PrintImages = React.lazy(() => import("./print-images/PrintImages"))
const AdditionalServices = React.lazy(() => import("./additional-services/AdditionalServices"))
const Home = React.lazy(() => import("./home/Home"))

const Settings = () => {
    const params = useLocation()
    const secondPathname = params.pathname.replace("/settings/", "")

    return (
        <>
            <Row gutter={15}>
                <Col xxl={3} xl={5}>
                    <Menu className="settings-menu" defaultSelectedKeys={[secondPathname]}>
                        <Menu.ItemGroup title="Управление сайтом">
                            {/*<Menu.Item key="home">*/}
                            {/*    <Link to="/settings/home">Главная</Link>*/}
                            {/*</Menu.Item>*/}
                            <Menu.Item key="banners">
                                <Link to="/settings/banners">Баннеры</Link>
                            </Menu.Item>
                            {/*<Menu.Item key="about-us">*/}
                            {/*    <Link to="/settings/about-us">О нас</Link>*/}
                            {/*</Menu.Item>*/}
                            <Menu.Item key="lookbook">
                                <Link to="/settings/lookbook">LOOKBOOK</Link>
                            </Menu.Item>
                            {/*<Menu.Item key="contacts">*/}
                            {/*    <Link to="/settings/contacts">Контакты</Link>*/}
                            {/*</Menu.Item>*/}
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Основные">
                            <Menu.Item key="categories">
                                <Link to="/settings/categories">Категории</Link>
                            </Menu.Item>
                            <Menu.Item key="sources">
                                <Link to="/settings/sources">Ресурсы</Link>
                            </Menu.Item>
                            <Menu.Item key="colors">
                                <Link to="/settings/colors">Цвета</Link>
                            </Menu.Item>
                            <Menu.Item key="tags">
                                <Link to="/settings/tags">Теги</Link>
                            </Menu.Item>
                            <Menu.Item key="sizes">
                                <Link to="/settings/sizes">Размеры</Link>
                            </Menu.Item>
                            <Menu.Item key="newsletter">
                                <Link to="/settings/newsletter">Рассылка</Link>
                            </Menu.Item>
                            <Menu.Item key="promo-codes">
                                <Link to="/settings/promo-codes">Промокоды</Link>
                            </Menu.Item>
                            <Menu.Item key="additional-services">
                                <Link to="/settings/additional-services">Доп. услуги</Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                        {/*<Menu.ItemGroup title="Оплата">*/}
                        {/*    <Menu.Item key="payme">*/}
                        {/*        <Link to="/settings/payme">Payme</Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*    <Menu.Item key="click">*/}
                        {/*        <Link to="/settings/click">Click</Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*</Menu.ItemGroup>*/}
                        <Menu.ItemGroup title="Печать">
                            <Menu.Item key="print-categories">
                                <Link to="/settings/print-categories">Категории</Link>
                            </Menu.Item>
                            <Menu.Item key="print-images">
                                <Link to="/settings/print-images">Картинки</Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                        {/*<Menu.ItemGroup title="Интеграции">*/}
                        {/*    <Menu.Item key="facebook">*/}
                        {/*        <Link to="/settings/facebook">Facebook</Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*    <Menu.Item key="eskiz">*/}
                        {/*        <Link to="/settings/eskiz">Eskiz</Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*</Menu.ItemGroup>*/}
                    </Menu>
                </Col>
                <Col xxl={21} xl={19}>
                    <React.Suspense
                        fallback={<LoadingBlock title="Загрузка страницы..." maxHeight="300px" />}
                    >
                        <Route
                            exact
                            path="/settings"
                            component={() => <Redirect to="/settings/categories" />}
                        />
                        <Route path="/settings/home" component={Home} />
                        <Route path="/settings/banners" component={Banners} />
                        <Route path="/settings/categories" component={Categories} />
                        <Route path="/settings/sources" component={Sources} />
                        <Route path="/settings/lookbook" component={Lookbook} />
                        <Route path="/settings/newsletter" component={Newsletter} />
                        <Route path="/settings/sizes" component={Sizes} />
                        <Route path="/settings/tags" component={Tags} />
                        <Route path="/settings/colors" component={Colors} />
                        <Route path="/settings/promo-codes" component={PromoCodes} />
                        <Route path="/settings/print-categories" component={PrintCategories} />
                        <Route path="/settings/print-images" component={PrintImages} />
                        <Route path="/settings/additional-services" component={AdditionalServices} />
                    </React.Suspense>
                </Col>
            </Row>
        </>
    )
}

export default Settings
