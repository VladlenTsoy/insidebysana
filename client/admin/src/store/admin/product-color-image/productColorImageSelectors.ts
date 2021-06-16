import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAllImages} from "./productColorImageSlice"
import {ProductColorImage} from "../../../lib/types/ProductColorImage"

// Вывод картинок по продукту
export const useSelectImagesByProductColorId = (
    productColorId: ProductColorImage["product_color_id"]
): ProductColorImage[] =>
    useSelector((state: AdminState) =>
        selectAllImages(state).filter(image => image.product_color_id === productColorId)
    )

// Загрузка картинок
export const useLoadingProductColorImages = () => useSelector((state: AdminState) => state.productColorImage.loading)