import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface DroppedJersey {
  id: string,
  label: string,
  x: number,
  y: number,
  jersey: string
}
// Define a type for the slice state
interface JerseyState {
  jerseys: DroppedJersey[],
  nextID: number,
  editing: boolean
}

const initialState: JerseyState = {
  jerseys: [],
  nextID: 0,
  editing: false
}

export const jerseySlice = createSlice({
  name: 'Jersey',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addDroppedJersey: (state, action: PayloadAction<DroppedJersey>) => {
      state.jerseys.push(action.payload);
      state.nextID += 1;
    },
    removeDroppedJersey: (state, action: PayloadAction<DroppedJersey>) => {
      state.jerseys = state.jerseys.filter(jersey => jersey.id !== action.payload.id);
    },
    updateDroppedJersey: (state, action: PayloadAction<{ id: string, updates: Partial<DroppedJersey> }>) => {
      const { id, updates } = action.payload;
      const index = state.jerseys.findIndex(jersey => jersey.id === id);
      if (index !== -1) {
        state.jerseys[index] = { ...state.jerseys[index], ...updates };
      }
    },
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.editing = action.payload
    }
  },
})

export const { addDroppedJersey, removeDroppedJersey, updateDroppedJersey, setEditing } = jerseySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectJerseys = (state: RootState) => state.jerseys

export const selectJerseyById = (id: string | undefined) => createSelector(
  selectJerseys,
  (Jerseys: JerseyState) => Jerseys.jerseys.find((Jersey: DroppedJersey) => Jersey.id === id) ?? undefined
);

export default jerseySlice.reducer