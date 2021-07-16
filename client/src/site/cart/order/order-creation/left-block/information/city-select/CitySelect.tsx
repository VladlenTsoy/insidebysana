import React, {useEffect, useRef} from "react"
import {useState} from "react"
import {City} from "types/city"
import Select from "../../../../../../../components/select/Select"
import {useGetCitiesByCountryIdQuery} from "./cityApi"

interface CitySelectProps {
    country_id: number
    name?: string
    onChange?: any
    onBlur?: any
    value?: any
    className?: any
    mapCity?: any
    setCenter?: (center: City["position"] | undefined) => void
}

const CitySelect: React.FC<CitySelectProps> = ({
    country_id,
    name,
    onChange,
    onBlur,
    value,
    className,
    setCenter,
    mapCity
}) => {
    const {data: cities, isLoading} = useGetCitiesByCountryIdQuery(country_id, {skip: country_id === 0})
    const selectInputRef = useRef<any>()
    const [options, setOptions] = useState<{label: string; value: number}[]>([])

    const onChangeHandler = (e: any) => {
        if (e) onChange("city", e.value, true)
        if (setCenter && e && cities) {
            const city = cities.find(city => city.id === e.value)
            city && setCenter(city?.position)
        }
    }

    useEffect(() => {
        if (selectInputRef.current && cities) {
            // selectInputRef.current.select.clearValue()
            const city = cities.find(city => city.country_id === country_id)
            city && selectInputRef.current.select.setValue({value: city.id, label: city.name})
        }
    }, [country_id, selectInputRef, cities])

    useEffect(() => {
        if (mapCity && cities) {
            const city = cities.find(city => city.name === mapCity)
            city && selectInputRef.current.select.setValue({value: city.id, label: city.name})
        }
    }, [mapCity, cities])

    useEffect(() => {
        if (cities) {
            const _options = cities.map(city => ({value: city.id, label: city.name}))
            setOptions(_options)
            selectInputRef.current.select.setValue(_options.find(option => option.value === value))
        }
    }, [cities, selectInputRef, value])

    return (
        <Select
            inputRef={selectInputRef}
            loading={isLoading}
            options={options}
            placeholder="Выберите город"
            isSearchable
            onChange={onChangeHandler}
            onBlur={onBlur}
            name={name}
            className={className}
        />
    )
}
export default React.memo<CitySelectProps>(CitySelect)
