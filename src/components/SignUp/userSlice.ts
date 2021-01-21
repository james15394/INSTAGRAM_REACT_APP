import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: {
      reducer: (
        state,
        { payload }: PayloadAction<{ user: object; id: string }>
      ) => {
        state.entities = payload;
      },
      prepare: ({ user }: { user: object }) => ({
        payload: { user, id: uuid() },
      }),
    },
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
