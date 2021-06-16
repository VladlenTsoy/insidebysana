import React, {useCallback, useEffect, useState} from "react"
import styled from "./Newsletter.module.css"
import Button from "../../../components/button/Button"
import {Link} from "react-router-dom"
import Checkbox from "../../../components/checkbox/Checkbox"
import {useDispatch} from "../../../store/store"
import {subscribeNewsletter} from "../../../store/newsletter/subscribeNewsletter"
import {useSelector} from "react-redux"
import {newsletterSelector} from "../../../store/newsletter/newsletterSlice"
import Alert from "../../../components/alert/Alert"

const Newsletter = () => {
    const [disabled, setDisabled] = useState(true)
    const [checked, setChecked] = useState(false)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const {subscribed} = useSelector(newsletterSelector)
    const dispatch = useDispatch()

    const validateEmail = useCallback((email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }, [])

    const onChangeCheckboxHandler = (e: any) => {
        setChecked(e.target.checked)
    }

    const onChangeInputHandler = (e: any) => {
        setEmail(e.currentTarget.value)
    }

    const onClickHandler = async () => {
        setLoading(true)
        await dispatch(subscribeNewsletter(email))
        setLoading(false)
        setChecked(false)
        setEmail("")
    }

    useEffect(() => {
        const validEmail = validateEmail(email)
        setDisabled(!(checked && validEmail))
    }, [validateEmail, email, checked])

    return (
        <div className={styled.newsletter}>
            {subscribed && <Alert type="success">Вы успешно подписаны на нашу рассылку новостей!</Alert>}
            <p className={styled.newsletterSubTitle}>Подпишитесь на новости и специальные предложения.</p>
            <div className={styled.newsletterInput}>
                <input type="email" onChange={onChangeInputHandler} value={email} placeholder="Введите E-mail" />
                <Button disabled={disabled} loading={loading} onClick={onClickHandler}>Подписаться</Button>
            </div>
            <label htmlFor="checkbox-accept" className={styled.accept}>
                <Checkbox id="checkbox-accept" name="accept" className={styled.checkbox} checked={checked}
                          onChange={onChangeCheckboxHandler} />
                <span>Согласен (согласна) с</span>
                <Link to="/privacy-policy">Политикой конфиденциальности</Link>.
            </label>
        </div>
    )
}

export default Newsletter