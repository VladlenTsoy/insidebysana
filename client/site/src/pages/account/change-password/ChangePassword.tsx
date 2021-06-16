import React, {useState} from "react"
import styled from "./ChangePassword.module.css"
import {Formik} from "formik"
import Input from "components/input/Input"
import Button from "components/button/Button"
import {useDispatch} from "store/store"
import Alert from "components/alert/Alert"
import {unwrapResult} from "@reduxjs/toolkit"
import {changePassword} from "store/user/changePassword"

const ChangePassword: React.FC = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState<boolean>(false)
    const information = {currentPassword: "", password: "", confirm: ""}
    const dispatch = useDispatch()

    const onSubmitHandler = async (values: any, {setSubmitting}: any) => {
        try {
            const promise = await dispatch(changePassword(values))
            unwrapResult(promise)
            setError(null)
            setSuccess(true)
        } catch (e) {
            setError(e.message)
            setSubmitting(false)
            setSuccess(false)
        }
    }

    return (
        <>
            <Formik
                initialValues={information}
                validate={values => {
                    const errors: any = {}
                    if (!values.currentPassword) errors.currentPassword = true
                    if (!values.password) errors.password = true
                    if (!(values.confirm && values.password === values.confirm)) errors.confirm = true
                    return errors
                }}
                onSubmit={onSubmitHandler}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={styled.contact}>
                            {success && <Alert type="success">Вы успешно сменили пароль!</Alert>}
                            {error && <Alert type="error">{error}</Alert>}
                            <Input
                                type="password"
                                placeholder="Введите текущий пароль"
                                name="currentPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.currentPassword}
                                className={`${styled.formItem} ${
                                    errors.currentPassword && touched.currentPassword && styled.error
                                }`}
                            />
                            <hr />
                            <Input
                                type="password"
                                placeholder="Введите новый пароль"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={`${styled.formItem} ${
                                    errors.password && touched.password && styled.error
                                }`}
                            />
                            <Input
                                type="password"
                                placeholder="Подтвердите пароль"
                                name="confirm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirm}
                                className={`${styled.formItem} ${
                                    errors.confirm && touched.confirm && styled.error
                                }`}
                            />

                            <div className={styled.actions}>
                                <Button type="default" typeHtml="submit" disabled={isSubmitting}>
                                    Обновить
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    )
}
export default ChangePassword
