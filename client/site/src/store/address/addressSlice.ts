import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Address} from "../../types/address"
import {StoreState} from "../store"
import {createAddress} from "./createAddress"
import {deleteAddress} from "./deleteAddress"
import {fetchAddress} from "./fetchAddress"

export const addressAdapter = createEntityAdapter<Address>()

export interface StateProps {
    loading: boolean
}

const initialState = addressAdapter.getInitialState<StateProps>({
    loading: false
})

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAddress.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            addressAdapter.addMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchAddress.rejected, state => {
            state.loading = false
        })
        //
        builder.addCase(createAddress.pending, state => {
            state.loading = true
        })
        builder.addCase(createAddress.fulfilled, (state, action) => {
            addressAdapter.addOne(state, action.payload)
            state.loading = false
        })
        //
        builder.addCase(deleteAddress.pending, state => {
            state.loading = true
        })
        builder.addCase(deleteAddress.fulfilled, (state, action) => {
            addressAdapter.removeOne(state, action.payload)
            state.loading = false
        })
    }
})

export const {selectAll: selectAllAddresses} = addressAdapter.getSelectors<StoreState>(state => state.address)

export default addressSlice.reducer
