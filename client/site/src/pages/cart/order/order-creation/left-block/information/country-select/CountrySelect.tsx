import React, {useEffect} from "react"
import styled from "./Country.module.css"
import Select from "../../../../../../../components/select/Select"
import {useLoadingCountries, useSelectAllCountries} from "store/country/countrySelector"
import {useDispatch} from "store/store"
import {fetchCountries} from "store/country/fetchCountries"

interface CountrySelectProps {
    name?: string
    onChange?: any
    onBlur?: any
    value?: any
    className?: any
}

const CountrySelect: React.FC<CountrySelectProps> = ({name, onChange, onBlur, value, className}) => {
    const countries = useSelectAllCountries()
    const loading = useLoadingCountries()
    const options = countries.map((country: any) => ({
        value: country.id,
        label: (
            <div className={styled.option}>
                <img className={styled.icon} src={country.url_flag} alt={country.name} />
                {country.name}
            </div>
        )
    }))
    const select = options.find(option => option.value === value)
    const dispatch = useDispatch()

    const onChangeHandler = (e: any) => {
        onChange("country", e.value, true)
    }

    useEffect(() => {
        const promise = dispatch(fetchCountries())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <Select
            loading={loading}
            options={options}
            defaultValue={select || options[0]}
            placeholder="Выберите страну"
            isSearchable={false}
            onChange={onChangeHandler}
            onBlur={onBlur}
            name={name}
            className={className}
        />
    )
}

export default CountrySelect
