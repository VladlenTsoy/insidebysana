import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllCities, selectById} from "./citySlice"

// Загрузка
export const useLoadingCities = () => useSelector((state: StoreState) => state.city.loading)

// Вывод всех
export const useSelectAllCities = () => useSelector(selectAllCities)

//
export const useSelectCitiesByCountryId = (countryId: number) =>
    useSelector((state: StoreState) =>
        Object.values(state.city.entities).filter(city => countryId === city?.country_id)
    )

//
export const useSelectCityById = (cityId: number) =>
    useSelector((state: StoreState) => selectById(state, cityId))
