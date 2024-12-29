import { Employee } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { emplyeesApi } from "../../app/services/employees";
import { RootState } from "../../app/store";

interface InitailState {
  employees: Employee[] | null
}

const initialState: InitailState = {
  employees: null
}

const slice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    logout: () => initialState,
    setEmployees: (state, action) => {
      state.employees = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(emplyeesApi.endpoints.getAllEmployees.matchFulfilled, (state, action) => {
        state.employees = action.payload
      })
  }
})

export default slice.reducer

export const selectEmployees = (state: RootState) => state.employees