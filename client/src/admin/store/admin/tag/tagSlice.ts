import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {fetchTags} from "./fetchTags"
import {StoreState} from "../../../store"
import {Tag} from "../../../lib/types/Tag"
import {editTag} from "./editTag"
import {deleteTag} from "./deleteTag"

export const tagAdapter = createEntityAdapter<Tag>()

export interface StateProps {
    loading: boolean
}

const initialState = tagAdapter.getInitialState<StateProps>({
    loading: false
})

const tagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Вывод всех цветов
        builder.addCase(fetchTags.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            tagAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchTags.rejected, state => {
            state.loading = false
        })
        // Редактирование тега
        builder.addCase(editTag.fulfilled, (state, action) => {
            tagAdapter.upsertOne(state, action.payload)
        })
        // Удаление тега
        builder.addCase(deleteTag.fulfilled, (state, action) => {
            tagAdapter.removeOne(state, action.payload)
        })
    }
})

export const {selectAll: selectAllTags} = tagAdapter.getSelectors<StoreState>(
    state => state.tag
)

export default tagSlice.reducer