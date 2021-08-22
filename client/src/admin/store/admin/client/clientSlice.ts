import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Client} from "../../../lib/types/Client"
import {StoreState} from "../../../store"
import {fetchClients} from "./fetchClients"
import {createClient} from "./createClient"
import {editClient} from "./editClient"
import {fetchClientById} from "./fetchClientById"

export const clientAdapter = createEntityAdapter<Client>()

export interface StateProps {
    loading: boolean
}

const initialState = clientAdapter.getInitialState<StateProps>({
    loading: true
})

const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Вывод клиентов
        builder.addCase(fetchClients.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchClients.fulfilled, (state, action) => {
            clientAdapter.setAll(state, action.payload.results)
            state.loading = false
        })
        builder.addCase(fetchClients.rejected, state => {
            state.loading = false
        })
        // Создать клиента
        builder.addCase(createClient.pending, state => {
            state.loading = true
        })
        builder.addCase(createClient.fulfilled, (state, action) => {
            clientAdapter.addOne(state, action.payload)
            state.loading = false
        })
        builder.addCase(createClient.rejected, state => {
            state.loading = false
        })
        // Создать клиента
        builder.addCase(editClient.pending, state => {
            state.loading = true
        })
        builder.addCase(editClient.fulfilled, (state, action) => {
            clientAdapter.upsertOne(state, action.payload)
            state.loading = false
        })
        builder.addCase(editClient.rejected, state => {
            state.loading = false
        })
        // Вывод клиента
        builder.addCase(fetchClientById.fulfilled, (state, action) => {
            clientAdapter.addOne(state, action.payload)
        })
    }
})

export const {selectAll: selectAllClients, selectById: getClientById} = clientAdapter.getSelectors<
    StoreState
>(state => state.client)

export default clientSlice.reducer
