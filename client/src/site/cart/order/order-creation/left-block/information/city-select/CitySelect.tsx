import React, {useEffect, useRef} from "react"
import Select from "../../../../../../../components/select/Select"
import {useGetCitiesByCountryIdQuery} from "./cityApi"

interface CitySelectProps {
    country_id: number
    name?: string
    onChange?: any
    onBlur?: any
    value?: any
    className?: any
}

const CitySelect: React.FC<CitySelectProps> = ({country_id, name, onChange, onBlur, value, className}) => {
    const {data: cities = [], isLoading} = useGetCitiesByCountryIdQuery(country_id)
    const options = cities.map((city: any) => ({value: city.id, label: city.name}))
    const selectInputRef = useRef<any>()

    const select = options.find(option => option.value === value)

    const onChangeHandler = (e: any) => {
        if (e) onChange("city", e.value, true)
    }

    useEffect(() => {
        if (selectInputRef.current) selectInputRef.current.select.clearValue()
    }, [country_id, selectInputRef])

    return (
        <Select
            inputRef={selectInputRef}
            loading={isLoading}
            options={options}
            defaultValue={select || options[0]}
            placeholder="Выберите город"
            isSearchable
            onChange={onChangeHandler}
            onBlur={onBlur}
            name={name}
            className={className}
        />
    )
}
export default CitySelect
