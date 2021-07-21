import React, {useRef, useState, useEffect} from "react"
import styled from "./Form.module.css"
import {Formik, FormikHandlers, FormikHelpers, FormikState} from "formik"
import Input from "components/input/Input"
import PhoneInput from "components/phone-input/PhoneInput"
import Button from "components/button/Button"
import MapBlock from "../../cart/order/order-creation/left-block/information/delivery-address/MapBlock"
import {useUser} from "site/auth/authSlice"
import {useCreateAddressMutation} from "./addressApi"
import {useGetCountriesQuery} from "site/cart/order/order-creation/left-block/information/delivery-address/countryApi"
import {useGetCitiesByCountryIdQuery} from "site/cart/order/order-creation/left-block/information/delivery-address/cityApi"
import {
    createOptionCity,
    createOptionCountry,
    CountrySelect,
    CitySelect
} from "site/cart/order/order-creation/left-block/information/delivery-address/DeliveryAddress"
import {useCallback} from "react"

// Интерфайс даты для формы
export interface FormDataProps {
    title: string
    full_name: string
    phone: string
    country: number | undefined
    city: number | undefined
    address: string
    position: [number, number] | undefined
}

interface DeliveryAddressProps {
    setFieldValue: FormikHelpers<FormDataProps>["setFieldValue"]
    values: FormikState<FormDataProps>["values"]
    errors: FormikState<FormDataProps>["errors"]
    touched: FormikState<FormDataProps>["touched"]
    handleBlur: FormikHandlers["handleBlur"]
    handleChange: FormikHandlers["handleChange"]
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({
    setFieldValue,
    values,
    errors,
    touched,
    handleBlur,
    handleChange
}) => {
    const [mapCountry, setMapCountry] = useState<string>()
    const [mapCity, setMapCity] = useState<string>()

    const {data: countries, isLoading: isLoadingCountries} = useGetCountriesQuery()
    const {data: cities, isLoading: isLoadingCities} = useGetCitiesByCountryIdQuery(values.country || 0, {
        skip: !values.country
    })

    const countriesRef = useRef<any>()
    const citiesRef = useRef<any>()

    // Вывод первого города
    useEffect(() => {
        if (values.country && cities && cities.length && citiesRef.current)
            citiesRef.current.select.setValue(createOptionCity(cities[0]))
    }, [values.country, cities])

    // Выбор страны с карты
    useEffect(() => {
        if (countries && countriesRef && mapCountry) {
            const country = countries.find(country => country.name === mapCountry)
            country && countriesRef.current.select.setValue(createOptionCountry(country))
        }
    }, [mapCountry, countriesRef, countries])

    // Выбор города с карты
    useEffect(() => {
        if (mapCity && cities && citiesRef) {
            const city = cities.find(city => city.name === mapCity)
            city && citiesRef.current.select.setValue(createOptionCity(city))
        }
    }, [mapCity, cities, citiesRef])

    const onChangeCityHandler = useCallback(
        (e: any) => {
            e && setFieldValue("city", e.value, false)
        },
        [setFieldValue]
    )

    return (
        <>
            <CountrySelect
                inputRef={countriesRef}
                countries={countries}
                isLoading={isLoadingCountries}
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
                value={values.country}
                className={`${errors.country && touched.country && styled.error}`}
            />
            <CitySelect
                inputRef={citiesRef}
                cities={cities}
                isLoading={isLoadingCities}
                onBlur={handleBlur}
                onChange={onChangeCityHandler}
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
                className={`${styled.formItem} ${errors.address && touched.address && styled.error}`}
            />
            <MapBlock
                setMapCountry={setMapCountry}
                setMapCity={setMapCity}
                setFieldValue={setFieldValue}
                selectCenter={[41.311158, 69.279737]}
                position={values.position}
            />
        </>
    )
}

interface FormProps {
    close: any
}

const Form: React.FC<FormProps> = ({close}) => {
    const {detail} = useUser()
    const [createAddress, {isLoading}] = useCreateAddressMutation()
    const information: FormDataProps = {
        title: "",
        full_name: detail?.full_name || "",
        phone: detail?.phone || "",
        country: 1,
        city: undefined,
        address: "",
        position: undefined
    }

    const onSubmitHandler = async (values: any, {setSubmitting}: any) => {
        await createAddress(values)
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
                                <Button
                                    type="default"
                                    typeHtml="submit"
                                    disabled={isSubmitting}
                                    loading={isLoading}
                                >
                                    Сохранить
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}
export default React.memo<FormProps>(Form)
