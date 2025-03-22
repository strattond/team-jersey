import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

// Define a type for the slice state
interface GlobalOptionsState {
  multiplier: number
}

const initialState: GlobalOptionsState = {
  multiplier: 100
}

export const globalOptionsSlice = createSlice({
  name: 'Options',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMultiplier: (state, action: PayloadAction<{ value: number }>) => {
      state.multiplier = action.payload.value;
    }
  },
})

export const { setMultiplier } = globalOptionsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectOptions = (state: RootState) => state.options

export default globalOptionsSlice.reducer