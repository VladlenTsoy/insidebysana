import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Wishlist} from "types/wishlist"
import {StoreState} from "../store"
import {removeFromWishlist, fetchWishlist, addToWishlist} from "./wishlistApi"
import {getCookie, setCookie} from "../../utils/cookie"
import {useSelector} from "react-redux"

export const wishlistAdapter = createEntityAdapter<Wishlist>()

export interface StateProps {
    loading: boolean
    items: Wishlist["product_color_id"][]
}

const getLocalWishlist = () => JSON.parse(getCookie("InsideBySana_Wishlist") || "[]")

const setLocalWishlist = (ids: Wishlist["product_color_id"][]) =>
    setCookie("InsideBySana_Wishlist", JSON.stringify(ids), {expires: 7})

const initialState = wishlistAdapter.getInitialState<StateProps>({
    loading: true,
    items: getLocalWishlist()
})

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchWishlist.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchWishlist.fulfilled, (state, action) => {
            wishlistAdapter.upsertMany(state, action.payload.products)
            state.items = action.payload.productColorIds
            setLocalWishlist(state.items)
            state.loading = false
        })
        builder.addCase(fetchWishlist.rejected, state => {
            state.loading = false
        })
        //
        builder.addCase(addToWishlist.pending, (state, action) => {
            if (!state.items.includes(action.meta.arg)) state.items.push(action.meta.arg)
            setLocalWishlist(state.items)
        })
        //
        builder.addCase(removeFromWishlist.pending, (state, action) => {
            wishlistAdapter.removeOne(state, action.meta.arg)
            state.items = state.items.filter(productColorId => action.meta.arg !== productColorId)
            setLocalWishlist(state.items)
        })
    }
})

// Вывод
export const {selectAll: selectAllWishlist} = wishlistAdapter.getSelectors<StoreState>(
    state => state.wishlist
)

export const wishlistSelector = (state: StoreState) => state.wishlist

//
export const useLoadingWishlist = () => useSelector((state: StoreState) => state.wishlist.loading)

// Вывод
export const useSelectAllWishlist = () => useSelector(selectAllWishlist)

export default wishlistSlice.reducer
