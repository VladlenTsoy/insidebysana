import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../utils/api";
import {AdminThunkProps} from "../../admin/store";

interface ReturnedType {
    status: "success"
}

export const logoutUser = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    'user/logout',
    async (_, {signal}) => {
        return await apiRequest('delete', `logout`, {signal, });
    },
);