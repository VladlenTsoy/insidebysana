import {createAsyncThunk} from "@reduxjs/toolkit";
import {AdminThunkProps} from "../../../store";
import {apiRequest} from "../../../utils/api";
import {message} from "../../../lib/ui";
import {Banner} from "../../../lib/types/Banner";

type ReturnedType = Banner["id"]

type AgrProps = Banner["id"]

export const deleteBanner = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/banner/delete",
    async bannerId => {
        //
        const response = await apiRequest("delete", `admin/banner/${bannerId}`)
        response && message({type: "success", content: "Вы успешно удалили баннер!"})
        return bannerId
    }
)