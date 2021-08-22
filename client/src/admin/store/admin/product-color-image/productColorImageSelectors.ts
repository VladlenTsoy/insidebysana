import {useSelector} from "react-redux"
import {StoreState} from "../../../store"
import {selectAllImages} from "./productColorImageSlice"
import {ProductColorImage} from "../../../lib/types/ProductColorImage"

// Вывод картинок по продукту
export const useSelectImagesByProductColorId = (
    productColorId: ProductColorImage["product_color_id"]
): ProductColorImage[] =>
    useSelector((state: StoreState) =>
        selectAllImages(state).filter(image => image.product_color_id === productColorId)
    )

// Загрузка картинок
export const useLoadingProductColorImages = () => useSelector((state: StoreState) => state.productColorImage.loading)