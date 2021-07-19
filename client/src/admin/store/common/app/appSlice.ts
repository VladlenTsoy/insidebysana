import {createSlice, PayloadAction} from "@reduxjs/toolkit"
// import {CommonState} from "../store"

interface StateProps {
    title: string
}

const initialState: StateProps = {
    // Название страницы
    title: "Главная"
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeTitle(state, action: PayloadAction<StateProps["title"]>) {
            document.title = `InsideBySana CRM - ${action.payload}`
            state.title = action.payload
        }
    }
})

export const {changeTitle} = appSlice.actions

// export const appSelector = (state: CommonState) => state.app

export default appSlice.reducer
