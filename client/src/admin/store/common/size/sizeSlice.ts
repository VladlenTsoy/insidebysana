import {createSlice, createEntityAdapter} from "@reduxjs/toolkit"
import {createSize} from "admin/store/admin/size/createSize"
import {displaySize} from "admin/store/admin/size/displaySize"
import {deleteSize} from "admin/store/admin/size/deleteSize"
import {editSize} from "admin/store/admin/size/editSize"
import {hideSize} from "admin/store/admin/size/hideSize"
import {Size} from "../../../lib/types/Size"
import {CommonState} from "../store"
import {fetchSizes} from "./fetchSizes"

export const sizeAdapter = createEntityAdapter<Size>()

export interface StateProps {
    loading: boolean
}

const initialState = sizeAdapter.getInitialState<StateProps>({
    loading: true
})

const sizeSlice = createSlice({
    name: "size",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Вывод всех цветов
        builder.addCase(fetchSizes.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchSizes.fulfilled, (state, action) => {
            sizeAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchSizes.rejected, state => {
            state.loading = false
        })

        //
        builder.addCase(createSize.fulfilled, (state, action) => {
            sizeAdapter.addOne(state, action.payload)
        })
        //
        builder.addCase(editSize.fulfilled, (state, action) => {
            sizeAdapter.setOne(state, action.payload)
        })

        // Удаление
        builder.addCase(deleteSize.fulfilled, (state, action) => {
            sizeAdapter.removeOne(state, action.payload)
        })
        // Скрыть
        builder.addCase(hideSize.fulfilled, (state, action) => {
            sizeAdapter.updateOne(state, {id: action.payload, changes: {hide_id: 1}})
        })
        // Вернуть
        builder.addCase(displaySize.fulfilled, (state, action) => {
            sizeAdapter.updateOne(state, {id: action.payload, changes: {hide_id: null}})
        })
    }
})

export const {selectById: getSizeById, selectAll: selectAllSizes} = sizeAdapter.getSelectors<CommonState>(
    state => state.size
)

export default sizeSlice.reducer
