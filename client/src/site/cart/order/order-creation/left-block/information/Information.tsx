import React from "react"
import styled from "./Information.module.css"
import {Link} from "react-router-dom"
import {Formik} from "formik"
import Input from "components/input/Input"
import PhoneInput from "components/phone-input/PhoneInput"
import Button from "components/button/Button"
import {useUser} from "site/auth/authSlice"
import DeliveryAddress from "./delivery-address/DeliveryAddress"

interface InformationProps {
    information: any
    onChangeInformation: any
}

const Information: React.FC<InformationProps> = ({information, onChangeInformation}) => {
    const {detail} = useUser()

    const onSubmitHandler = (values: any, {setSubmitting}: any) => {
        onChangeInformation(values)
        setSubmitting(false)
    }

    return (
        <div className={styled.information}>
            <div className={styled.contactTitle}>
                <h2>Информация</h2>
                {!detail && (
                    <div className={styled.sub}>
                        Уже есть аккаунт? <Link to="/account">Авторизоваться</Link>
                    </div>
                )}
            </div>
            <Formik
                initialValues={information}
                validate={values => {
                    const errors: any = {}
                    if (!values.full_name) errors.full_name = "Введите имя!"
                    if (!values.phone) errors.phone = "Введите телефон!"
                    if (!values.country) errors.country = "Выберите страну!"
                    if (!values.city) errors.city = "Введите город!"
                    if (!values.address) errors.address = "Введите адрес!"
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
                            <div className={styled.formItem}>
                                <Input
                                    placeholder="Введите имя"
                                    name="full_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.full_name}
                                    className={`${errors.full_name && touched.full_name && styled.error}`}
                                />
                            </div>
                            <div className={styled.formItem}>
                                <PhoneInput
                                    name="phone"
                                    onChange={setFieldValue}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                    className={`${errors.phone && touched.phone && styled.error}`}
                                />
                            </div>
                        </div>
                        <h2 className={styled.deliveryTitle}>Доставка</h2>
                        <DeliveryAddress
                            setFieldValue={setFieldValue}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                        />
                        <div className={styled.actions}>
                            <div className={styled.actionsContent}>
                                {!!Object.values(errors).length && (
                                    <span className={styled.errorMessage}>Заполните все поля!</span>
                                )}
                                <Button type="default" typeHtml="submit" disabled={isSubmitting}>
                                    Продолжить покупку
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Information
