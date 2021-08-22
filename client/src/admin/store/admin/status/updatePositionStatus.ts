import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Status} from "../../../lib/types/Status"

type ReturnedType = Status[]

interface AgrProps {
    id: Status["id"]
    position: Status["position"]
    prevPosition: Status["position"]
}

export const updatePositionStatus = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/status/update/position",
    async (data, {signal}) => {
        const response = await apiRequest("patch", `admin/status/${data.id}/position`, {
            data: {position: data.position, prev_position: data.prevPosition},
            signal
        })
        response && message({type: "success", content: "Вы успешно изменили статус!"})
        return response
    }
)
