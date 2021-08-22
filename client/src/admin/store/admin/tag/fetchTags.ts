import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminThunkProps } from "../../../store";
import { apiRequest } from "../../../utils/api";
import { Tag } from "../../../lib/types/Tag";

type ReturnedType = Tag[]

export const fetchTags = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
  "admin/tags/fetch",
  async (_, {signal}) => {
    return await apiRequest("get", `admin/tags`, {signal})
  },
  {
    condition(_, {getState}) {
      const {tag} = getState()
      return !tag.ids.length
    }
  }
)
