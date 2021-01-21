import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/SignUp/userSlice";
const rootReducer = {
  user: userReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
