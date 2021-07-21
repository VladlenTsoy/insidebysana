import React from "react"
import styled from "./Information.module.css"
import {Link} from "react-router-dom"
import {Formik} from "formik"
import Input from "components/input/Input"
import PhoneInput from "components/phone-input/PhoneInput"
import Button from "components/button/Button"
import {useUser} from "site/auth/authSlice"
import DeliveryAddress from "./delivery-address/DeliveryAddress"
import {useGetAddressesQuery} from "site/account/delivery-addresses/addressApi"
import LoaderBlock from "print/components/loader-block/LoaderBlock"

interface InformationProps {
    information: any
    onChangeInformation: any
}

const Information: React.FC<InformationProps> = ({information, onChangeInformation}) => {
    const {detail} = useUser()
    const {data: addresses, isLoading: isLoadingAddresses} = useGetAddressesQuery(undefined, {
        skip: !detail
    })

    const onSubmitHandler = (values: any, {setSubmitting}: any) => {
        onChangeInformation(values)
        setSubmitting(false)
    }

    const findInitialValues = () => {
        if (addresses && addresses[0]) {
            const address = addresses[0]
            return {
                full_name: address.full_name,
                phone: address.phone,
                client_address_id: address.id,
                country: address.country,
                city: address.city,
                address: address.address,
                position: address.position
            }
        }
        return information
    }

    if (isLoadingAddresses) return <LoaderBlock />

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
                initialValues={findInitialValues()}
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
                            addresses={addresses}
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
