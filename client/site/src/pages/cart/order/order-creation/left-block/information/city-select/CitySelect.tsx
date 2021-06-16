import React, {useEffect, useRef} from "react"
import {useLoadingCities, useSelectCitiesByCountryId} from "store/city/citySelector"
import {fetchCities} from "store/city/fetchCities"
import {useDispatch} from "store/store"
import Select from "../../../../../../../components/select/Select"

interface CitySelectProps {
    country_id: number
    name?: string
    onChange?: any
    onBlur?: any
    value?: any
    className?: any
}

const CitySelect: React.FC<CitySelectProps> = ({country_id, name, onChange, onBlur, value, className}) => {
    const cities = useSelectCitiesByCountryId(country_id)
    const loading = useLoadingCities()
    const options = cities.map((city: any) => ({value: city.id, label: city.name}))
    const dispatch = useDispatch()
    const selectInputRef = useRef<any>()

    const select = options.find(option => option.value === value)

    const onChangeHandler = (e: any) => {
        if (e) onChange("city", e.value, true)
    }

    useEffect(() => {
        if (selectInputRef.current) selectInputRef.current.select.clearValue()
    }, [country_id, selectInputRef])

    useEffect(() => {
        const promise = dispatch(fetchCities())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <Select
            inputRef={selectInputRef}
            loading={loading}
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
