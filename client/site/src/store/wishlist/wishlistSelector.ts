import {useSelector} from "react-redux"
import {selectAllWishlist} from "./wishlistSlice"
import {StoreState} from "../store"

export const useLoadingWishlist = () => useSelector((state: StoreState) => state.wishlist.loading)

export const useSelectAllWishlist = () => useSelector(selectAllWishlist)
