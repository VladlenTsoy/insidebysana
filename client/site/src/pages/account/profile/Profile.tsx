import React, {useState} from "react"
import styled from "./Profile.module.css"
import {Formik} from "formik"
import Input from "components/input/Input"
import PhoneInput from "components/phone-input/PhoneInput"
import Button from "components/button/Button"
import {useSelector} from "react-redux"
import {userSelector} from "store/user/userSlice"
import {useDispatch} from "store/store"
import {updateUser} from "store/user/updateUser"
import {unwrapResult} from "@reduxjs/toolkit"
import Alert from "components/alert/Alert"

const Profile = () => {
    const {detail} = useSelector(userSelector)
    const information = {full_name: detail?.full_name, phone: detail?.phone, email: detail?.email}
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState<boolean>(false)

    const onSubmitHandler = async (values: any, {setSubmitting}: any) => {
        try {
            const promise = await dispatch(updateUser(values))
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
        <Formik
            initialValues={information}
            validate={values => {
                const errors: any = {}
                if (!values.full_name) errors.full_name = true
                if (!values.phone) errors.phone = true
                if (!values.email) errors.email = true
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
                        {success && <Alert type="success">Вы успешно изменили данные!</Alert>}
                        {error && <Alert type="error">{error}</Alert>}
                        <Input
                            placeholder="Введите имя"
                            name="full_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.full_name}
                            className={`${styled.formItem} ${
                                errors.full_name && touched.full_name && styled.error
                            }`}
                        />
                        <PhoneInput
                            name="phone"
                            onChange={setFieldValue}
                            onBlur={handleBlur}
                            value={values.phone}
                            className={`${styled.formItem} ${errors.phone && touched.phone && styled.error}`}
                        />
                        <Input
                            placeholder="Введите почту"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className={`${styled.formItem} ${errors.email && touched.email && styled.error}`}
                        />
                        <div className={styled.actions}>
                            <Button type="default" typeHtml="submit" disabled={isSubmitting}>
                                Сохранить
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default Profile
