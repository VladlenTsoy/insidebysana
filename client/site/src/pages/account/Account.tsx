import React from "react"
import {useSelector} from "react-redux"
import {userSelector} from "../../store/user/userSlice"
import {Link, Redirect, Route, Switch} from "react-router-dom"
import LoaderBlock from "../../components/loader-block/LoaderBlock"
import Button from "../../components/button/Button"
import {logoutUser} from "../../store/user/logoutUser"
import {useDispatch} from "../../store/store"
import HistoryOutlined from "@ant-design/icons/HistoryOutlined"
import CarOutlined from "@ant-design/icons/CarOutlined"
import IdcardOutlined from "@ant-design/icons/IdcardOutlined"
import KeyOutlined from "@ant-design/icons/KeyOutlined"
import styled from "./Account.module.css"

const Profile = React.lazy(() => import("./profile/Profile"))
const OrderHistory = React.lazy(() => import("./order-history/OrderHistory"))
const DeliveryAddresses = React.lazy(() => import("./delivery-addresses/DeliveryAddresses"))
const ChangePassword = React.lazy(() => import("./change-password/ChangePassword"))

const Account = () => {
    const dispatch = useDispatch()
    const {detail} = useSelector(userSelector)

    const logout = () => {
        dispatch(logoutUser())
    }

    if (!detail) return <Redirect to="/auth/login" />

    return (
        <div className="container">
            <div className={styled.header}>
                <div className={styled.welcome}>
                    <h1>Добро пожаловать! {detail?.full_name}</h1>
                </div>
                <div className={styled.logout}>
                    <Button onClick={logout}>Выйти</Button>
                </div>
            </div>

            <div className={styled.content}>
                <div className={styled.sidebar}>
                    <Link to="/account/order-history">
                        <HistoryOutlined /> История заказов
                    </Link>
                    <Link to="/account/delivery-addresses">
                        <CarOutlined /> Адреса доставки
                    </Link>
                    <Link to="/account/profile">
                        <IdcardOutlined /> Контактные данные
                    </Link>
                    <Link to="/account/change-password">
                        <KeyOutlined /> Сменить пароль
                    </Link>
                </div>
                <div className={styled.container}>
                    <Switch>
                        <React.Suspense fallback={<LoaderBlock />}>
                            <Route
                                exact
                                path="/account/"
                                render={() => <Redirect to="/account/order-history" />}
                            />
                            <Route path="/account/order-history" component={OrderHistory} />
                            <Route path="/account/delivery-addresses" component={DeliveryAddresses} />
                            <Route path="/account/profile" component={Profile} />
                            <Route path="/account/change-password" component={ChangePassword} />
                        </React.Suspense>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Account
