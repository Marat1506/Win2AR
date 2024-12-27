import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from "../features/doctorsSlice"
import nursesReducer from "../features/nursesSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    nurses: nursesReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store