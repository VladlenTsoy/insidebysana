import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Client} from "../../../lib/types/Client"
import { Source } from "../../../lib/types/Source";

type ReturnedType = Client

interface AgrProps {
  source_id: Source['id']
  full_name: string
  phone?: string
  email?: string
  password?: string
  instagram?: string
  facebook?: string
  telegram?: string
  date_of_birth?: string
}

export const createClient = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/client/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/client`, {data})
        response && message({type: "success", content: "Вы успешно создали клиента!"})
        return response
    }
)