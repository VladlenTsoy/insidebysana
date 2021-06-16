import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {ProductColorPrint} from "../../../lib/types/product/ProductColorPrint"
import {selectAllPrints} from "./productColorPrintSlice"

// Вывод картинок по продукту
export const useSelectPrintsByProductColorId = (productColorId: ProductColorPrint["product_color_id"]): ProductColorPrint[] =>
    useSelector((state: AdminState) =>
        selectAllPrints(state).filter(print => print.product_color_id === productColorId)
    )

// Загрузка принтов
export const useLoadingPrints = () => useSelector((state: AdminState) => state.print.loading)