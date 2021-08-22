import {Client} from "../../../lib/types/Client"
import {Source} from "../../../lib/types/Source"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"

type ReturnedType = Client

interface AgrProps {
    id: Client["id"]
    data: {
        source_id: Source["id"]
        full_name: Client["full_name"]
        phone?: Client["phone"]
        email?: Client["email"]
        password?: string
        instagram?: Client["instagram"]
        facebook?: Client["facebook"]
        telegram?: Client["telegram"]
        date_of_birth?: Client["date_of_birth"]
    }
}

export const editClient = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/client/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/client/${id}`, {data})
        response && message({type: "success", content: "Вы успешно обновили клиента!"})
        return response
    }
)
