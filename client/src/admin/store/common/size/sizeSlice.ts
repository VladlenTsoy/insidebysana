import {createSlice, createEntityAdapter} from "@reduxjs/toolkit"
import {createSize} from "admin/store/admin/size/createSize"
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
    }
})

export const {selectById: getSizeById, selectAll: selectAllSizes} = sizeAdapter.getSelectors<CommonState>(
    state => state.size
)

export default sizeSlice.reducer
