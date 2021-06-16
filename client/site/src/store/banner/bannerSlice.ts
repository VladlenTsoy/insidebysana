import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {StoreState} from "../store"
import {fetchBanners} from "./fetchBanners"
import {Banner} from "../../types/banner"

export const bannerAdapter = createEntityAdapter<Banner>()

export interface StateProps {
    loading: boolean
}

const initialState = bannerAdapter.getInitialState<StateProps>({
    loading: true
})


const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchBanners.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchBanners.fulfilled, (state, action) => {
            bannerAdapter.addMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchBanners.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllBanners} = bannerAdapter.getSelectors<StoreState>(state => state.banner)

export default bannerSlice.reducer