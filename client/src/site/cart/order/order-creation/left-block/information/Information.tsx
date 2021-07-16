import React, {useState} from "react"
import styled from "./Information.module.css"
import {Link} from "react-router-dom"
import {Formik} from "formik"
import Input from "components/input/Input"
import PhoneInput from "components/phone-input/PhoneInput"
import CountrySelect from "./country-select/CountrySelect"
import Button from "components/button/Button"
import AddressSelect from "./address-select/AddressSelect"
import CitySelect from "./city-select/CitySelect"
import MapBlock from "./map-block/MapBlock"
import {useUser} from "site/auth/authSlice"

interface InformationProps {
    information: any
    onChangeInformation: any
}

const Information: React.FC<InformationProps> = ({information, onChangeInformation}) => {
    const {detail} = useUser()
    const [centerCountry, setCenterCountry] = useState<[number, number] | undefined>()
    const [centerCity, setCenterCity] = useState<[number, number] | undefined>()
    const [mapCountry, setMapCountry] = useState<string | undefined>()
    const [mapCity, setMapCity] = useState<string | undefined>()

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
                    if (!values.full_name) {
                        errors.full_name = "Введите имя!"
                    }
                    if (!values.phone) {
                        errors.phone = "Введите телефон!"
                    }
                    if (!values.country) {
                        errors.country = "Выберите страну!"
                    }
                    if (!values.city) {
                        errors.city = "Введите город!"
                    }
                    if (!values.address) {
                        errors.address = "Введите адрес!"
                    }
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
                        {detail && (
                            <div className={styled.address}>
                                <AddressSelect setFieldValue={setFieldValue} />
                            </div>
                        )}
                        <div className={styled.delivery}>
                            <div className={styled.formItem}>
                                <CountrySelect
                                    name="country"
                                    onChange={setFieldValue}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    setCenter={setCenterCountry}
                                    setCenterCity={setCenterCity}
                                    mapCountry={mapCountry}
                                    className={`${errors.country && touched.country && styled.error}`}
                                />
                            </div>
                            <div className={styled.formItem}>
                                <CitySelect
                                    country_id={values.country}
                                    name="city"
                                    onChange={setFieldValue}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    setCenter={setCenterCity}
                                    mapCity={mapCity}
                                    className={`${errors.city && touched.city && styled.error}`}
                                />
                            </div>
                            <div className={`${styled.formItem} ${styled.address}`}>
                                <Input
                                    id="address"
                                    placeholder="Введите адрес"
                                    name="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    className={`${errors.address && touched.address && styled.error}`}
                                />
                            </div>
                            <div className={styled.hidden}>
                                <input name="location" value={values.location} />
                            </div>
                        </div>
                        <MapBlock
                            setMapCountry={setMapCountry}
                            setMapCity={setMapCity}
                            setFieldValue={setFieldValue}
                            selectCenter={centerCity || centerCountry}
                            position={values.position}
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
