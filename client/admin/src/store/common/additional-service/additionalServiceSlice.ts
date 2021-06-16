import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {AdditionalService} from "lib/types/AdditionalService"
import {CommonState} from "../store"
import {createAdditionalService} from "../../admin/additional-service/createAdditionalService"
import {fetchAdditionalServices} from "../../admin/additional-service/fetchAdditionalServices"
import {editAdditionalService} from "store/admin/additional-service/editAdditionalService"
import {deleteAdditionalService} from "store/admin/additional-service/deleteAdditionalService"

export const additionalServiceAdapter = createEntityAdapter<AdditionalService>()

export interface StateProps {
    loading: boolean
}

const initialState = additionalServiceAdapter.getInitialState<StateProps>({
    loading: true
})

const additionalServiceSlice = createSlice({
    name: "additional-service",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Создание
        builder.addCase(createAdditionalService.fulfilled, (state, action) => {
            additionalServiceAdapter.addOne(state, action.payload)
        })
        // Редактирование
        builder.addCase(editAdditionalService.fulfilled, (state, action) => {
            additionalServiceAdapter.upsertOne(state, action.payload)
        })
        // Удаление
        builder.addCase(deleteAdditionalService.fulfilled, (state, action) => {
            additionalServiceAdapter.removeOne(state, action.payload)
        })
        // Вывод всех
        builder.addCase(fetchAdditionalServices.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchAdditionalServices.fulfilled, (state, action) => {
            additionalServiceAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchAdditionalServices.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllAdditionalServices} = additionalServiceAdapter.getSelectors<CommonState>(
    state => state.additionalService
)

export default additionalServiceSlice.reducer
