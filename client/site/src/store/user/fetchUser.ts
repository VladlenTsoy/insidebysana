import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {getCookie, removeCookie} from "../../utils/cookie"
import {ThunkProps} from "../store"
import {User} from "../../types/user"

type ReturnedType = User

export const fetchUser = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "user/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `/`, {signal})
            .catch((e) => {
                if (e.message === "error_token")
                    removeCookie("site_token_access")
            }) as User
    },
    {
        condition(_) {
            if (!getCookie("site_token_access"))
                return false
        },
        dispatchConditionRejection: true
    }
)