import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ProductColorCart} from "types/cashier/PosProductColor"
import {StoreState} from "../store"

export const posAdapter = createEntityAdapter<ProductColorCart>({
    selectId: product => `${product.product_color_id}${product.size_id}`
})

export interface StateProps {
    loading: boolean
    drawer: {
        visible: boolean
    }
    buttonSubmit: {
        loading: boolean
        disabled: boolean
    }
}

const initialState = posAdapter.getInitialState<StateProps>({
    loading: false,
    drawer: {
        visible: false
    },
    buttonSubmit: {
        loading: false,
        disabled: true
    }
})

const posSlice = createSlice({
    name: "pos",
    initialState,
    reducers: {
        // Изменения состояние окна
        changeDrawer: (state, action: PayloadAction<StateProps["drawer"]>) => {
            state.drawer = action.payload
        },
        // Изменеия состояние кнопки
        changeButtonSubmit: (state, action: PayloadAction<{loading?: boolean; disabled?: boolean}>) => {
            state.buttonSubmit = {...state.buttonSubmit, ...action.payload}
        }
    }
})

export const {changeDrawer, changeButtonSubmit} = posSlice.actions

export const {selectAll: selectAllPosProductColors} = posAdapter.getSelectors<StoreState>(state => state.pos)

export default posSlice.reducer
