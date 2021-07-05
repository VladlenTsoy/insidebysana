import React from "react"
import styled from "./Form.module.css"
import {Formik} from "formik"
import Input from "components/input/Input"
import PhoneInput from "components/phone-input/PhoneInput"
import Button from "components/button/Button"
import {useSelector} from "react-redux"
import {userSelector} from "store/user/userSlice"
import {useDispatch} from "store/store"
import CountrySelect from "../../../cart/order/order-creation/left-block/information/country-select/CountrySelect"
import {createAddress} from "store/address/createAddress"
import MapBlock from "../../../cart/order/order-creation/left-block/information/map-block/MapBlock"
import CitySelect from "../../../cart/order/order-creation/left-block/information/city-select/CitySelect"

interface FormProps {
    close: any
}

const Form: React.FC<FormProps> = ({close}) => {
    const {detail} = useSelector(userSelector)
    const information = {
        title: "",
        full_name: detail?.full_name,
        phone: detail?.phone,
        country: 0,
        city: "",
        address: "",
        position: "",
        location: ""
    }
    const dispatch = useDispatch()

    const onSubmitHandler = async (values: any, {setSubmitting}: any) => {
        await dispatch(createAddress(values))
        setSubmitting(false)
        close()
    }

    return (
        <Formik
            initialValues={information}
            validate={values => {
                const errors: any = {}
                if (!values.full_name) errors.full_name = true
                if (!values.phone) errors.phone = true
                if (!values.title) errors.title = true
                if (!values.country) errors.country = true
                if (!values.city) errors.city = true
                if (!values.address) errors.address = true
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
                        <Input
                            placeholder="Введите название точки (Дом) или (Работа)"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            className={`${styled.formItem} ${errors.title && touched.title && styled.error}`}
                        />
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
                        <CountrySelect
                            name="country"
                            onChange={setFieldValue}
                            onBlur={handleBlur}
                            value={values.country}
                            className={`${styled.formItem} ${
                                errors.country && touched.country && styled.error
                            }`}
                        />
                        <CitySelect
                            country_id={values.country}
                            name="city"
                            onChange={setFieldValue}
                            onBlur={handleBlur}
                            value={values.city}
                            className={`${errors.city && touched.city && styled.error}`}
                        />
                        <Input
                            placeholder="Введите адрес"
                            name="address"
                            id="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            className={`${styled.formItem} ${
                                errors.address && touched.address && styled.error
                            }`}
                        />
                        <MapBlock
                            setFieldValue={setFieldValue}
                            country_id={values.country}
                            city_id={values.city}
                            position={values.position}
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
export default Form
