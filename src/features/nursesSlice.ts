import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Nurse {
  id: number;
  name: string;
  department: string;
}

interface NursesState {
  nurses: Nurse[];
}

const initialState: NursesState = {
  nurses: [], 
};

const nursesSlice = createSlice({
  name: "nurses",
  initialState,
  reducers: {
    setNurses: (state, action: PayloadAction<Nurse[]>) => {
      state.nurses = action.payload;
    },
    updateNurse: (state, action: PayloadAction<Nurse>) => {
      const index = state.nurses.findIndex((nur) => nur.id === action.payload.id);
      if (index !== -1) {
        state.nurses[index] = action.payload;
      }
    },
    deleteNurse: (state, action: PayloadAction<number>) => {
      state.nurses = state.nurses.filter((nur) => nur.id !== action.payload);
    },
  },
});

export const { setNurses, updateNurse, deleteNurse } = nursesSlice.actions;
export default nursesSlice.reducer;
