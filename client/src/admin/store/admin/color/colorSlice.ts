import {createSlice, createEntityAdapter} from "@reduxjs/toolkit"
import {Color} from "admin/lib/types/Color"
import {createColor} from "./createColor"
import {AdminState} from "../store"
import {fetchColors} from "./fetchColors"
import {editColor} from "./editColor"
import {deleteColor} from "./deleteColor"
import {hideColor} from "./hideColor"
import {displayColor} from "./displayColor"

export const colorAdapter = createEntityAdapter<Color>()

export interface StateProps {
    loading: boolean
}

const initialState = colorAdapter.getInitialState<StateProps>({
    loading: true
})

const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Создание цвета
        builder.addCase(createColor.fulfilled, (state, action) => {
            colorAdapter.addOne(state, action.payload)
        })

        // Редактирование цвета
        builder.addCase(editColor.fulfilled, (state, action) => {
            colorAdapter.upsertOne(state, action.payload)
        })

        // Удаление цвета
        builder.addCase(deleteColor.fulfilled, (state, action) => {
            colorAdapter.removeOne(state, action.payload)
        })
        // Скрыть цвет
        builder.addCase(hideColor.fulfilled, (state, action) => {
            colorAdapter.updateOne(state, {id: action.payload, changes: {hide_id: 1}})
        })
        // Вернуть цвет
        builder.addCase(displayColor.fulfilled, (state, action) => {
            colorAdapter.updateOne(state, {id: action.payload, changes: {hide_id: null}})
        })

        // Вывод всех цветов
        builder.addCase(fetchColors.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchColors.fulfilled, (state, action) => {
            colorAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchColors.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectById: getColorById, selectAll: selectAllColors} = colorAdapter.getSelectors<AdminState>(
    state => state.color
)

export default colorSlice.reducer
