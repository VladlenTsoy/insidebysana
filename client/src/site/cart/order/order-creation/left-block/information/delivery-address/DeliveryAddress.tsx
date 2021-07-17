import {FormikHelpers, FormikHandlers, FormikState} from "formik"
import React, {useEffect, useRef, useState, useCallback} from "react"
import {Address, useGetAddressesQuery} from "site/account/delivery-addresses/addressApi"
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
}

interface AddressSelectProps {
    inputRef: any
    addresses?: Address[]
    isLoading: boolean
    onChange: any
}

export const AddressSelect: React.FC<AddressSelectProps> = ({
    addresses = [],
    isLoading,
    inputRef,
    onChange
}) => {
    const [options, setOptions] = useState<BasicOptionType[]>([{label: "Новый адрес", value: 0}])

    useEffect(() => {
        if (addresses && addresses.length) {
            const _options = addresses.map(createOptionAddress)
            setOptions(prevState => [...prevState, ..._options])
        }
    }, [addresses])

    return (
        <Select
            inputRef={inputRef}
            options={options}
            defaultValue={options[0]}
            onChange={onChange}
            loading={isLoading}
        />
    )
}

interface CountrySelectProps {
    countries?: Country[]
    isLoading: boolean
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
    setFieldValue,
    value,
    inputRef
}) => {
    const [options, setOptions] = useState<BasicOptionType[]>([])

    const onChangeHandler = (e: any) => {
        if (e) {
            setFieldValue("country", e.value, true)
            if (countries) {
                const country = countries.find(country => country.id === e.value)
                country && setFieldValue("position", country.position, true)
            }
        }
    }

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
            onChange={onChangeHandler}
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
    onChange?: any
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
    handleChange
}) => {
    const {detail} = useUser()
    const {data: addresses, isLoading: isLoadingAddresses} = useGetAddressesQuery(undefined, {skip: !detail})
    const {data: countries, isLoading: isLoadingCountries} = useGetCountriesQuery()
    const {data: cities, isLoading: isLoadingCities} = useGetCitiesByCountryIdQuery(values.country || 0, {
        skip: !values.country
    })

    const [currentAddress, setCurrentAddress] = useState<Address>()
    const [mapCountry, setMapCountry] = useState<string>()
    const [mapCity, setMapCity] = useState<string>()

    const addressesRef = useRef<any>()
    const countriesRef = useRef<any>()
    const citiesRef = useRef<any>()

    // Выбор адреса клиента
    const addressOnChangeHandler = useCallback(
        (e: any) => {
            const addressId = e.value
            if (addresses) {
                const address = addresses.find(address => address.id === addressId)
                setCurrentAddress(address)

                if (address) {
                    setFieldValue("country", address.country, true)
                    setFieldValue("city", address.city, true)
                    setFieldValue("address", address.address, true)
                    setFieldValue("phone", address.phone, true)
                    setFieldValue("full_name", address.full_name, true)
                    setFieldValue("position", address.position, true)
                } else {
                    setCurrentAddress(undefined)
                    //     setFieldValue("country", 1, true)
                    //     setFieldValue("city", undefined, true)
                    //     setFieldValue("address", "", true)
                    //     setFieldValue("phone", detail?.phone || "", true)
                    //     setFieldValue("full_name", detail?.full_name || "", true)
                    //     setFieldValue("position", undefined, true)
                }
            }
        },
        [addresses, setFieldValue]
    )

    // Вывод первого города
    useEffect(() => {
        if (values.country && cities && cities.length && citiesRef.current)
            citiesRef.current.select.setValue(createOptionCity(cities[0]))
    }, [values.country, cities])

    // Выбрать первый адрес клиента
    useEffect(() => {
        if (addresses && addresses.length) {
            const address = addresses[0]
            setCurrentAddress(address)
            addressesRef.current.select.selectOption(createOptionAddress(address))
        }
    }, [addresses])

    // Если изменять текущий адрес (Новый адрес)
    useEffect(() => {
        if (currentAddress) {
            if (
                currentAddress.country !== values.country ||
                currentAddress.country !== values.city ||
                currentAddress.position !== values.position ||
                currentAddress.address !== values.address
            )
                if (addressesRef.current)
                    addressesRef.current.select.selectOption({label: "Новый адрес", value: 0})
        }
    }, [values, addressesRef, currentAddress])

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

    return (
        <>
            <div className={styled.address}>
                {detail && (
                    <AddressSelect
                        inputRef={addressesRef}
                        isLoading={isLoadingAddresses}
                        addresses={addresses}
                        onChange={addressOnChangeHandler}
                    />
                )}
            </div>
            <div className={styled.delivery}>
                <div className={styled.formItem}>
                    <CountrySelect
                        inputRef={countriesRef}
                        countries={countries}
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
                autoGeolocation={!(currentAddress || values.address)}
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
