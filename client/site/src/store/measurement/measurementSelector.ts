import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {getMeasurementById} from "./measurementSlice"
import {Measurement} from "../../types/measurement"

export const useSelectMeasurementById = (productId: Measurement['product_id']) => useSelector((state: StoreState) => getMeasurementById(state, productId))
