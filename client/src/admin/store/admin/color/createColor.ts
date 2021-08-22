import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "admin/utils/api";
import {message} from "admin/lib/ui";
import { Color } from "../../../lib/types/Color";
import { AdminThunkProps } from "../../../store";

type ReturnedType = Color

interface AgrProps {
  title: Color['title']
  hex: Color['hex']
}

export const createColor = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
  'admin/color/create',
  async (data) => {
    //
    const response = await apiRequest('post', `admin/color`, {data});
    response && message({type: 'success', content: 'Вы успешно создали цвет!'});
    return response;
  }
)