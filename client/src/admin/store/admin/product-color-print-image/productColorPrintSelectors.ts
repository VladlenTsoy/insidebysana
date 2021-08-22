import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {ProductColorPrint} from "../../../lib/types/product/ProductColorPrint"
import {selectAllPrints} from "./productColorPrintSlice"

// Вывод картинок по продукту
export const useSelectPrintsByProductColorId = (productColorId: ProductColorPrint["product_color_id"]): ProductColorPrint[] =>
    useSelector((state: StoreState) =>
        selectAllPrints(state).filter(print => print.product_color_id === productColorId)
    )

// Загрузка принтов
export const useLoadingPrints = () => useSelector((state: StoreState) => state.print.loading)