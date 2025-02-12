import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface DroppedImage {
  id: string,
  label: string,
  x: number,
  y: number,
  jersey: string
}
// Define a type for the slice state
interface ImageState {
  images: DroppedImage[],
  nextID: number
}

const initialState: ImageState = {
  images: [],
  nextID: 0
}

export const imageSlice = createSlice({
  name: 'image',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addDroppedImage: (state, action: PayloadAction<DroppedImage>) => {
      state.images.push(action.payload);
      state.nextID += 1;
    },
    removeDroppedImage: (state, action: PayloadAction<DroppedImage>) => {
      state.images = state.images.filter(bob => bob.id !== action.payload.id);
    },
    updateDroppedImage: (state, action: PayloadAction<{ id: string, updates: Partial<DroppedImage> }>) => {
      const { id, updates } = action.payload;
      const index = state.images.findIndex(image => image.id === id);
      if (index !== -1) {
        state.images[index] = { ...state.images[index], ...updates };
      }
    }
  },
})

export const { addDroppedImage, removeDroppedImage, updateDroppedImage } = imageSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectImages = (state: RootState) => state.images

export const selectJerseyById = (id: string | undefined) => createSelector(
  selectImages,
  (images: ImageState) => images.images.find((image: DroppedImage) => image.id === id) ?? undefined
);

export default imageSlice.reducer