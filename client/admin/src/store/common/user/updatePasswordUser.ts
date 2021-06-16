import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../utils/api";
import {message} from "lib/ui";

interface ParamsProps {
    userId: string;
    data: object
}

export const updatePasswordUser: any = createAsyncThunk<any, ParamsProps, any>(
    'user/password/update',
    async ({userId, data}) => {
        //
        const response = await apiRequest('post', `/${userId}/password`, {data});
        response && message({type: 'success', content: 'Вы успешно сменили пароль!'});
        return response;
    }
)