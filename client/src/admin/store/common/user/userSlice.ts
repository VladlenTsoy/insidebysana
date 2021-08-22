import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchUser} from "./fetchUser";
import {StoreState} from "admin/store";
import {updateUser} from "./updateUser";
import {logoutUser} from "./logoutUser";
import {authUser} from "./authUser";
import {registrationUser} from "./registrationUser";
import {updateToken} from "../../../utils/api";
import {User} from "../../../lib/types/User";
import {getCookie} from "../../../utils/cookie";

interface StateProps {
    token: string | null;
    loading: boolean;
    detail: User | null;
}

const initialState: StateProps = {
    token: getCookie('crm_token_access') || null,
    detail: null,
    loading: true,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            updateToken(action.payload);
            if (action.payload === null)
                state.detail = null;
        }
    },
    extraReducers: (builder) => {
        // Вывод пользователя
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.detail = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchUser.rejected, (state) => {
            state.loading = false;
        })

        // Обвноление пользователя
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.detail = action.payload;
        })

        // Авторизация пользователя
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.token = action.payload.token;
            updateToken(action.payload.token);
        })

        // Регистрация пользователя
        builder.addCase(registrationUser.fulfilled, (state, action) => {
            state.token = action.payload.token;
            updateToken(action.payload.token);
        })

        // Выход пользователя
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            updateToken(null);
            state.token = null;
            state.detail = null;
            state.loading = false;
        })
    }
});

export const {changeToken} = userSlice.actions;

export const userSelector = (state: StoreState) => state.user;

export default userSlice.reducer;
