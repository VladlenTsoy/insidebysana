import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllCountries, selectById} from "./countrySlice"

// Загрузка
export const useLoadingCountries = () => useSelector((state: StoreState) => state.country.loading)

// Вывод всех
export const useSelectAllCountries = () => useSelector(selectAllCountries)

//
export const useSelectCountryById = (countryId: number) =>
    useSelector((state: StoreState) => selectById(state, countryId))
