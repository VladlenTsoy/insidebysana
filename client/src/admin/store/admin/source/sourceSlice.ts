import {createSlice, createEntityAdapter} from "@reduxjs/toolkit"
import {Source} from "admin/lib/types/Source"
import {createSource} from "./createSource"
import {StoreState} from "../../../store"
import {fetchSources} from "./fetchSources"
import {editSource} from "./editSource";

export const sourceAdapter = createEntityAdapter<Source>()

export interface StateProps {
  loading: boolean
}

const initialState = sourceAdapter.getInitialState<StateProps>({
  loading: true
})

const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Создание ресурса
    builder.addCase(createSource.pending, state => {
      state.loading = true
    })
    builder.addCase(createSource.fulfilled, (state, action) => {
      sourceAdapter.addOne(state, action.payload)
      state.loading = false
    })
    builder.addCase(createSource.rejected, state => {
      state.loading = false
    })
    // Редактирование ресурса
    builder.addCase(editSource.pending, state => {
      state.loading = true
    })
    builder.addCase(editSource.fulfilled, (state, action) => {
      sourceAdapter.upsertOne(state, action.payload)
      state.loading = false
    })
    builder.addCase(editSource.rejected, state => {
      state.loading = false
    })
    // Вывод всех ресурсов
    builder.addCase(fetchSources.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchSources.fulfilled, (state, action) => {
      sourceAdapter.upsertMany(state, action.payload)
      state.loading = false
    })
    builder.addCase(fetchSources.rejected, state => {
      state.loading = false
    })
  }
})

export const {selectById: getSourceById, selectAll: selectAllSources} = sourceAdapter.getSelectors<StoreState>(state => state.source)

export default sourceSlice.reducer
