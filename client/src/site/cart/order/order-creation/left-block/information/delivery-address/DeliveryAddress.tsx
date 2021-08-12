import {FormikHelpers, FormikHandlers, FormikState} from "formik"
import React, {useEffect, useRef, useState, useCallback} from "react"
import {Address} from "site/account/delivery-addresses/addressApi"
import {useUser} from "site/auth/authSlice"
import Select from "components/select/Select"
import styled from "./DeliveryAddress.module.css"
import Input from "components/input/Input"
import {Country} from "types/Country"
import {useGetCountriesQuery} from "./countryApi"
import {NamedProps} from "react-select"
import {useGetCitiesByCountryIdQuery} from "./cityApi"
import {City} from "types/city"
import MapBlock from "./MapBlock"

export type BasicOptionType = {label: any; value: number}

// Создание option для Адреса клиента
export const createOptionAddress = (address: Address) => ({
    label: (
        <>
            <b>{address.title}</b> \ {address.address}
        </>
    ),
    value: address.id
})

// Создание option для страны
export const createOptionCountry = (country: Country) => ({
    value: country.id,
    label: (
        <div className={styled.option}>
            <img className={styled.icon} src={country.url_flag} alt={country.name} />
            {country.name}
        </div>
    )
})

// Создание option для города
export const createOptionCity = (city: City) => ({value: city.id, label: city.name})

// Интерфайс даты для формы
export interface FormDataProps {
    full_name: string
    phone: string
    country: number | undefined
    city: number | undefined
    address: string
    position: [number, number] | undefined
    client_address_id?: number
}

interface AddressSelectProps {
    inputRef: any
    addresses?: Address[]
    isLoading: boolean
    onChange: any
    value?: FormDataProps["client_address_id"]
}

export const AddressSelect: React.FC<AddressSelectProps> = ({
    addresses = [],
    isLoading,
    inputRef,
    onChange,
    value
}) => {
    const [options, setOptions] = useState<BasicOptionType[]>([{label: "Новый адрес", value: 0}])

    useEffect(() => {
        if (addresses && addresses.length) {
            const _options = addresses.map(createOptionAddress)
            setOptions(() => [{label: "Новый адрес", value: 0}, ..._options])
        }
    }, [addresses])

    useEffect(() => {
        inputRef && inputRef.current.select.setValue(options.find(option => option.value === value))
    }, [options, inputRef, value])

    return (
        <Select
            name="client_address_id"
            placeholder="Сохраненные адреса"
            inputRef={inputRef}
            options={options}
            onChange={onChange}
            loading={isLoading}
        />
    )
}

interface CountrySelectProps {
    countries?: Country[]
    isLoading: boolean
    onChange?: NamedProps["onChange"]
    onBlur: NamedProps["onBlur"]
    setFieldValue: FormikHelpers<FormDataProps>["setFieldValue"]
    className: NamedProps["className"]
    value: FormDataProps["country"]
    inputRef: any
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
    countries,
    isLoading,
    onBlur,
    className,
    onChange,
    value,
    inputRef
}) => {
    const [options, setOptions] = useState<BasicOptionType[]>([])

    useEffect(() => {
        if (countries) {
            const _options = countries.map(createOptionCountry)
            setOptions(_options)
            inputRef && inputRef.current.select.setValue(_options.find(option => option.value === value))
        }
    }, [value, countries, inputRef])

    return (
        <Select
            inputRef={inputRef}
            loading={isLoading}
            options={options}
            placeholder="Выберите страну"
            isSearchable={false}
            onChange={onChange}
            onBlur={onBlur}
            name="country"
            className={className}
        />
    )
}

interface CitySelectProps {
    inputRef: any
    cities?: City[]
    isLoading: boolean
    onBlur: NamedProps["onBlur"]
    className: NamedProps["className"]
    value: FormDataProps["city"]
    onChange?: NamedProps["onChange"]
}

export const CitySelect: React.FC<CitySelectProps> = ({
    inputRef,
    cities,
    isLoading,
    className,
    onBlur,
    value,
    onChange
}) => {
    const [options, setOptions] = useState<BasicOptionType[]>([])

    useEffect(() => {
        if (cities) {
            const _options = cities.map(createOptionCity)
            setOptions(_options)
            inputRef && inputRef.current.select.setValue(_options.find(option => option.value === value))
        }
    }, [cities, value, inputRef])

    return (
        <Select
            inputRef={inputRef}
            loading={isLoading}
            options={options}
            placeholder="Выберите город"
            isSearchable={false}
            onBlur={onBlur}
            name="city"
            onChange={onChange}
            className={className}
        />
    )
}

interface DeliveryAddressProps {
    addresses?: Address[]
    setFieldValue: FormikHelpers<FormDataProps>["setFieldValue"]
    values: FormikState<FormDataProps>["values"]
    errors: FormikState<FormDataProps>["errors"]
    touched: FormikState<FormDataProps>["touched"]
    handleBlur: FormikHandlers["handleBlur"]
    handleChange: FormikHandlers["handleChange"]
}

export const DeliveryAddress: React.FC<DeliveryAddressProps> = ({
    setFieldValue,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    addresses
}) => {
    const {detail} = useUser()
    const [autoGeolocation] = useState(!(values.address || values.client_address_id))
    const {data: countries, isLoading: isLoadingCountries} = useGetCountriesQuery()
    const {data: cities, isLoading: isLoadingCities} = useGetCitiesByCountryIdQuery(values.country || 0, {
        skip: !values.country
    })

    const [mapCountry, setMapCountry] = useState<string>()
    const [mapCity, setMapCity] = useState<string>()

    const addressesRef = useRef<any>()
    const countriesRef = useRef<any>()
    const citiesRef = useRef<any>()

    // Выбор адреса клиента
    const addressOnChangeHandler = useCallback(
        (e: any) => {
            if (!e) return
            const addressId = e.value

            if (addresses) {
                const address = addresses.find(address => address.id === addressId)
                if (address) {
                    setFieldValue("position", address.position)
                    setFieldValue("full_name", address.full_name)
                    setFieldValue("country", address.country)
                    setFieldValue("city", address.city)
                    setFieldValue("phone", address.phone)
                    setFieldValue("address", address.address)
                } else {
                    setFieldValue("country", 1)
                    setFieldValue("city", undefined)
                    setFieldValue("address", "")
                    setFieldValue("phone", detail?.phone || "")
                    setFieldValue("full_name", detail?.full_name || "")
                    setFieldValue("position", undefined)
                    setFieldValue("client_address_id", 0)
                }
            }
        },
        [addresses, setFieldValue, detail]
    )

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

    const onChangeCountryHandler = useCallback(
        (e: any) => {
            if (e) {
                setFieldValue("country", e.value, true)
                if (countries) {
                    const country = countries.find(country => country.id === e.value)
                    !!(country && values.client_address_id === 0) &&
                        setFieldValue("position", country.position, true)
                }
            }
        },
        [setFieldValue, countries, values]
    )

    const onChangeCityHandler = useCallback(
        (e: any) => {
            e && setFieldValue("city", e.value)
        },
        [setFieldValue]
    )

    return (
        <>
            <div className={styled.address}>
                {detail && (
                    <AddressSelect
                        inputRef={addressesRef}
                        isLoading={false}
                        addresses={addresses}
                        onChange={addressOnChangeHandler}
                        value={values.client_address_id}
                    />
                )}
            </div>
            <div className={styled.delivery}>
                <div className={styled.formItem}>
                    <CountrySelect
                        inputRef={countriesRef}
                        countries={countries}
                        onChange={onChangeCountryHandler}
                        isLoading={isLoadingCountries}
                        setFieldValue={setFieldValue}
                        onBlur={handleBlur}
                        value={values.country}
                        className={`${errors.country && touched.country && styled.error}`}
                    />
                </div>
                <div className={styled.formItem}>
                    <CitySelect
                        inputRef={citiesRef}
                        cities={cities}
                        isLoading={isLoadingCities}
                        onBlur={handleBlur}
                        onChange={onChangeCityHandler}
                        value={values.city}
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
            </div>
            <MapBlock
                autoGeolocation={autoGeolocation}
                setMapCountry={setMapCountry}
                setMapCity={setMapCity}
                setFieldValue={setFieldValue}
                selectCenter={[41.311158, 69.279737]}
                position={values.position}
            />
        </>
    )
}
export default React.memo<DeliveryAddressProps>(DeliveryAddress)
