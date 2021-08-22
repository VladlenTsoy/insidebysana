import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {selectAll} from "./printProductSlice"

// Загрузка
export const useLoadingPrintProducts = () => useSelector((state: StoreState) => state.printProduct.loading)

// Вывод всех
export const useSelectAllPrintProducts = () => useSelector(selectAll)

//
export const useSelectPrintProductsByImageId = (imageId: number) =>
    useSelector((state: StoreState) => {
        return Object.values(state.printProduct.entities).filter(
            product => product && product.print_image_id === imageId
        )
    })
