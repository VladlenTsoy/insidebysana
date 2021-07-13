import React from "react"
import styled from "./Country.module.css"
import Select from "../../../../../../../components/select/Select"
import {useGetCountriesQuery} from "./countryApi"

interface CountrySelectProps {
    name?: string
    onChange?: any
    onBlur?: any
    value?: any
    className?: any
}

const CountrySelect: React.FC<CountrySelectProps> = ({name, onChange, onBlur, value, className}) => {
    const {data: countries = [], isLoading} = useGetCountriesQuery()
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

    const onChangeHandler = (e: any) => {
        onChange("country", e.value, true)
    }

    return (
        <Select
            loading={isLoading}
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
