import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import styled from "./Auth.module.css"
import LoaderBlock from "../../components/loader-block/LoaderBlock"
import {useUser} from "./authSlice"

const Login = React.lazy(() => import("./Login"))
const Registration = React.lazy(() => import("./Registration"))

const Auth = () => {
    const {detail, loading} = useUser()

    if (loading) return <LoaderBlock />
    if (detail) return <Redirect to="/account" />

    return (
        <div className={styled.auth}>
            <Switch>
                <React.Suspense fallback={<LoaderBlock />}>
                    <Route exact path="/auth/" render={() => <Redirect to="/auth/login" />} />
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/registration" component={Registration} />
                </React.Suspense>
            </Switch>
        </div>
    )
}

export default Auth
