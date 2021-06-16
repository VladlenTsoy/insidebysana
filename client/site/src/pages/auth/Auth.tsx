import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import styled from "./Auth.module.css"
import LoaderBlock from "../../components/loader-block/LoaderBlock"
import {useSelector} from "react-redux"
import {userSelector} from "../../store/user/userSlice"

const Login = React.lazy(() => import("./login/Login"))
const Registration = React.lazy(() => import("./registration/Registration"))

const Auth = () => {
    const {detail} = useSelector(userSelector)

    if(detail)
        return <Redirect to="/account"/>

    return (
        <div className={styled.auth}>
            <Switch>
                <React.Suspense fallback={<LoaderBlock />}>
                    <Route exact path="/auth/" render={() => <Redirect to="/auth/login"/>}/>
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/registration" component={Registration} />
                </React.Suspense>
            </Switch>
        </div>
    )
}

export default Auth