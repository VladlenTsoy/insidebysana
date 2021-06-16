import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {AdminState} from "../store"
import {PromoCode} from "../../../lib/types/PromoCode"
import {fetchPromoCodes} from "./fetchPromoCodes"
import {editPromoCode} from "./editPromoCode"
import {createPromoCode} from "./createPromoCode"

export const promoCodeAdapter = createEntityAdapter<PromoCode>()

export interface StateProps {
    loading: boolean
}

const initialState = promoCodeAdapter.getInitialState<StateProps>({
    loading: false
})

const promoCodeSlice = createSlice({
    name: "promo-code",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Вывод промокодов
        builder.addCase(fetchPromoCodes.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPromoCodes.fulfilled, (state, action) => {
            promoCodeAdapter.addMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchPromoCodes.rejected, state => {
            state.loading = false
        })
        // Редактирование промокода
        builder.addCase(editPromoCode.fulfilled, (state, action) => {
            promoCodeAdapter.upsertOne(state, action.payload)
        })
        // Создание промокода
        builder.addCase(createPromoCode.fulfilled, (state, action) => {
            promoCodeAdapter.addOne(state, action.payload)
        })
    }
})

export const {
    selectAll: selectAllPromoCodes
} = promoCodeAdapter.getSelectors<AdminState>(state => state.promoCode)

export default promoCodeSlice.reducer
