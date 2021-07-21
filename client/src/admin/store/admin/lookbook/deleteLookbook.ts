import {createAsyncThunk} from "@reduxjs/toolkit";
import {AdminThunkProps} from "../store";
import {apiRequest} from "../../../utils/api";
import {message} from "../../../lib/ui";
import {Lookbook} from "../../../lib/types/Lookbook"

type ReturnedType = Lookbook["id"]

type AgrProps = Lookbook["id"]

export const deleteLookbook = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/lookbook/delete",
    async lookbookId => {
        //
        const response = await apiRequest("delete", `admin/lookbook/${lookbookId}`)
        response && message({type: "success", content: "Вы успешно удалили lookbook!"})
        return lookbookId
    }
)