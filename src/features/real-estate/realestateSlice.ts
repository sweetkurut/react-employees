import { createSlice } from "@reduxjs/toolkit";
import { emplyeesApi } from "../../app/services/employees";
import { RootState } from "../../app/store";
import { RealEstate } from "@prisma/client";
import { realEstateApi } from "../../app/services/real-estate";

interface InitailState {
  realEstate: RealEstate[] | null
}

const initialState: InitailState = {
  realEstate: null
}

const slice = createSlice({
  name: 'realEstate',
  initialState,
  reducers: {
    logout: () => initialState,
    setRealEstate: (state, action) => {
      state.realEstate = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(realEstateApi.endpoints.getAllRealEstates.matchFulfilled, (state, action) => {
        state.realEstate = action.payload
      })
  }
})

export default slice.reducer

export const selectEmployees = (state: RootState) => state.realEstate