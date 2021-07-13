import React, {useCallback, useEffect, useState} from "react"
import styled from "./Newsletter.module.css"
import Button from "components/button/Button"
import {Link} from "react-router-dom"
import Checkbox from "components/checkbox/Checkbox"
import Alert from "components/alert/Alert"
import {useSubscribeNewsletterMutation} from "./newsletterApi"

const Newsletter: React.FC = () => {
    const [disabled, setDisabled] = useState(true)
    const [checked, setChecked] = useState(false)
    const [email, setEmail] = useState("")
    const [subscribeNewsletter, {isSuccess, isLoading}] = useSubscribeNewsletterMutation()

    // Проверка на валидацию
    const validateEmail = useCallback((email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }, [])

    // Изменить согласие
    const onChangeCheckboxHandler = (e: any) => setChecked(e.target.checked)

    // Ввод почты
    const onChangeInputHandler = (e: any) => setEmail(e.currentTarget.value)

    // Отправка подписки
    const onClickHandler = async () => {
        await subscribeNewsletter(email)
        setChecked(false)
        setEmail("")
    }

    useEffect(() => {
        const validEmail = validateEmail(email)
        setDisabled(!(checked && validEmail))
    }, [validateEmail, email, checked])

    return (
        <div className={styled.newsletter}>
            {isSuccess && <Alert type="success">Вы успешно подписаны на нашу рассылку новостей!</Alert>}
            <p className={styled.newsletterSubTitle}>Подпишитесь на новости и специальные предложения.</p>
            <div className={styled.newsletterInput}>
                <input
                    type="email"
                    onChange={onChangeInputHandler}
                    value={email}
                    placeholder="Введите E-mail"
                />
                <Button disabled={disabled} loading={isLoading} onClick={onClickHandler}>
                    Подписаться
                </Button>
            </div>
            <label htmlFor="checkbox-accept" className={styled.accept}>
                <Checkbox
                    id="checkbox-accept"
                    name="accept"
                    className={styled.checkbox}
                    checked={checked}
                    onChange={onChangeCheckboxHandler}
                />
                <span>Согласен (согласна) с</span>
                <Link to="/privacy-policy">Политикой конфиденциальности</Link>.
            </label>
        </div>
    )
}

export default Newsletter
