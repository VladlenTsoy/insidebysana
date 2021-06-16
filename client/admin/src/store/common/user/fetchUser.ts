import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import {User} from "../../../lib/types/User";
import {CommonThunkProps} from "../store";
import {getCookie, removeCookie} from "../../../utils/cookie";

type ReturnedType = User

export const fetchUser = createAsyncThunk<ReturnedType, undefined, CommonThunkProps>(
    'user/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', `/`, {signal, })
            .catch((e) => {
                if (e.message === 'error_token')
                    removeCookie('crm_token_access');
            }) as User;
    },
    {
        condition(_) {
            if (!getCookie('crm_token_access'))
                return false;
        },
        dispatchConditionRejection: true
    }
);