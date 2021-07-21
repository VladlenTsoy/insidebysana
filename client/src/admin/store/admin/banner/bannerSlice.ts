import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Banner} from "../../../lib/types/Banner"
import {AdminState} from "../store"
import {fetchBanners} from "./fetchBanners"
import {createBanner} from "./createBanner"
import {editBanner} from "./editBanner";
import {deleteBanner} from "./deleteBanner";

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
        // Создание баннера
        builder.addCase(createBanner.fulfilled, (state, action) => {
            bannerAdapter.addOne(state, action.payload)
        })
        // Редактирование баннера
        builder.addCase(editBanner.fulfilled, (state, action) => {
            bannerAdapter.upsertOne(state, action.payload)
        })
        // Удаление баннера
        builder.addCase(deleteBanner.fulfilled, (state, action) => {
            bannerAdapter.removeOne(state, action.payload)
        })
        // Вывод всех баннеров
        builder.addCase(fetchBanners.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchBanners.fulfilled, (state, action) => {
            bannerAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchBanners.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllBanners} = bannerAdapter.getSelectors<AdminState>(state => state.banner)

export default bannerSlice.reducer