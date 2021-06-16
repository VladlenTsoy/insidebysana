import React, {useState} from "react"
import styled from "./Login.module.css"
import Button from "../../../components/button/Button"
import Input from "../../../components/input/Input"
import {Link} from "react-router-dom"
import {useDispatch} from "../../../store/store"
import {authUser} from "../../../store/user/authUser"
import {unwrapResult} from "@reduxjs/toolkit"

const Login = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onSubmitHandler = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const data = new FormData(e.currentTarget)
        const object: any = {}
        data.forEach((value, key) => {
            object[key] = value
        })

        try {
            const promise = await dispatch(authUser(object))
            unwrapResult(promise)
            setError(null)
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }
    }

    return (
        <div className={styled.login}>
            <h1>Вход</h1>
            <form onSubmit={onSubmitHandler}>
                {error && <div className={styled.errorMessage}>{error}</div>}
                <div className={styled.formController}>
                    <Input placeholder="Почта" required type="email" name="email" id="email" />
                </div>
                <div className={styled.formController}>
                    <Input placeholder="Пароль" required type="password" name="password" id="password" />
                </div>
                {/*<div className={styled.subActions}>*/}
                {/*    <Link to="/auth/forgot-password">Забыли пароль?</Link>*/}
                {/*</div>*/}
                <Button block className={styled.action} typeHtml="submit" loading={loading}>
                    Войти
                </Button>
            </form>
            <div className={styled.registration}>
                <Link to="/auth/registration">
                    <Button type="secondary" block>
                        Регистрация
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Login
