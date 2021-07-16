import React, {useEffect, useState, useRef} from "react"
import styled from "./Country.module.css"
import Select from "../../../../../../../components/select/Select"
import {useGetCountriesQuery} from "./countryApi"
import {Country} from "types/Country"
import {City} from "types/city"

interface CountrySelectProps {
    name?: string
    onChange?: any
    onBlur?: any
    value?: any
    className?: any
    mapCountry?: string
    setCenter?: (center: Country["position"] | undefined) => void
    setCenterCity?: (center: City["position"] | undefined) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    name,
    onChange,
    onBlur,
    value,
    className,
    mapCountry,
    setCenter,
    setCenterCity
}) => {
    const selectInputRef = useRef<any>()
    const {data: countries, isFetching, isLoading} = useGetCountriesQuery()
    const [options, setOptions] = useState<{value: number; label: any}[]>([])

    const onChangeHandler = (e: any) => {
        if (e) {
            onChange("country", e.value, true)
            if (setCenter && countries) {
                const country = countries.find(country => country.id === e.value)
                if (country) {
                    setCenter(country.position)
                    setCenterCity && setCenterCity(undefined)
                }
            }
        }
    }

    useEffect(() => {
        if (mapCountry && countries) {
            const country = countries.find(country => country.name === mapCountry)
            country &&
                selectInputRef.current.select.setValue(options.find(option => option.value === country.id))
        }
    }, [mapCountry, countries, setCenter, options])

    useEffect(() => {
        if (countries) {
            const _options = countries.map(country => ({
                value: country.id,
                label: (
                    <div className={styled.option}>
                        <img className={styled.icon} src={country.url_flag} alt={country.name} />
                        {country.name}
                    </div>
                )
            }))

            setOptions(_options)
            selectInputRef.current.select.setValue(_options.find(option => option.value === value))
        }
    }, [value, countries, selectInputRef])

    return (
        <Select
            inputRef={selectInputRef}
            loading={isFetching || isLoading}
            options={options}
            placeholder="Выберите страну"
            isSearchable={false}
            onChange={onChangeHandler}
            onBlur={onBlur}
            name={name}
            className={className}
        />
    )
}

export default React.memo<CountrySelectProps>(CountrySelect)
