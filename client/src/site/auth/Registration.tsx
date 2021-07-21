import React, {useState} from "react"
import styled from "./Registration.module.css"
import Input from "components/input/Input"
import {Link} from "react-router-dom"
import Button from "components/button/Button"
import {useDispatch} from "../store"
import {unwrapResult} from "@reduxjs/toolkit"
import LeftOutlined from "@ant-design/icons/LeftOutlined"
import {registrationUser} from "./authApi"
import Checkbox from "components/checkbox/Checkbox"

const Registration = () => {
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
            const promise = await dispatch(registrationUser(object))
            unwrapResult(promise)
            setError(null)
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }

    }


    return (
        <div className={styled.registration}>
            <h1>Регистрация</h1>
            <form onSubmit={onSubmitHandler}>
                {error && <div className={styled.errorMessage}>
                    {error}
                </div>}
                <div>
                    <label htmlFor="full_name">
                        <Input placeholder="Имя" required type="text" name="full_name" id="full_name" />
                    </label>
                </div>
                <div>
                    <label htmlFor="email">
                        <Input placeholder="Почта" required type="email" name="email" id="email" />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">
                        <Input placeholder="Пароль" required type="password" name="password" id="password" />
                    </label>
                </div>
                <div>
                    <label htmlFor="reg-checkbox-accept" className={styled.accept}>
                        <Checkbox id="reg-checkbox-accept" name="accept" className={styled.checkbox} required/>
                        <span>Согласен (согласна) с</span>
                        <Link to="/privacy-policy">Политикой конфиденциальности</Link>.
                    </label>
                </div>
                <Button typeHtml="submit" block className={styled.action} loading={loading}>Зарегистрироваться</Button>
            </form>
            <div>
                <Link to="/auth/login">
                    <Button type="secondary" filled block icon={<LeftOutlined />}>
                        Назад
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Registration