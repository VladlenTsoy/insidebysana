import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import {CommonThunkProps} from "../store";

interface ArgsProps {
    email: string
    password: string
}

interface ReturnedType {
    token: string
}

// Аторизация пользователя
export const authUser = createAsyncThunk<ReturnedType, ArgsProps, CommonThunkProps>(
    'user/auth',
    async (data, {signal}) => {
        return await apiRequest('post', `login`, {data: {...data}, signal, type: 'guest', });
    },
)