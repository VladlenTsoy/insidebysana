import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import socket from "admin/utils/socket"
import {Order} from "../../../lib/types/Order"

type ReturnedType = null

interface AgrProps {
    id: Order["id"]
    nextStatusId: Order["status_id"]
    prevStatusId: Order["status_id"]
    position: Order["position"]
    prevPosition: Order["position"]
}

export const updateStatusOrder = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/order/update/status",
    async ({id, prevPosition, position, nextStatusId, prevStatusId}) => {
        await socket.emit(
            "order_update_status_and_position",
            nextStatusId !== prevStatusId
                ? {
                      order_id: id,
                      status_id: nextStatusId,
                      position,
                      prev_position: prevPosition,
                      prev_status_id: prevStatusId
                  }
                : {order_id: id, position, prev_position: prevPosition}
        )
        //
        return null
    }
)
