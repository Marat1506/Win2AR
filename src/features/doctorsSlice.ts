import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Doctor {
  id: number;
  name: string;
  department: string;
  isHead: boolean;
}

interface DoctorsState {
  doctors: Doctor[];
}

const initialState: DoctorsState = {
  doctors: [], 
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.doctors = action.payload;
    },
    updateDoctor: (state, action: PayloadAction<Doctor>) => {
      const index = state.doctors.findIndex((doc) => doc.id === action.payload.id);
      if (index !== -1) {
        state.doctors[index] = action.payload;
      }
    },
    deleteDoctor: (state, action: PayloadAction<number>) => {
      state.doctors = state.doctors.filter((doc) => doc.id !== action.payload);
    },
  },
});

export const { setDoctors, updateDoctor, deleteDoctor } = doctorsSlice.actions;
export default doctorsSlice.reducer;
