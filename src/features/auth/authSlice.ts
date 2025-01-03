import {User} from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../app/services/auth'
import { RootState } from '../../app/store'

interface InitialState {
  user: User & {token: string} | null
  isAuthenticated: boolean
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, {payload}) => {
      state.user = payload
      state.isAuthenticated = true
    })
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, {payload}) => {
      state.user = payload
      state.isAuthenticated = true
    })
    builder.addMatcher(authApi.endpoints.current.matchFulfilled, (state, {payload}) => {
      state.user = payload
      state.isAuthenticated = true
    })
  }
})

export const {logout} = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user 