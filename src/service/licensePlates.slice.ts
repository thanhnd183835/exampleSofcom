import { PayloadAction, createSlice } from "@reduxjs/toolkit";

let numberArray = Array.from({ length: 100 }, (_, index) => index + 1);
const initialState: Array<number> = [...numberArray];

export const ListLicensePlates = createSlice({
  name: "listLicensePlates",
  initialState: initialState,
  reducers: {
    updateListLicensePlates: (state, action: PayloadAction<number[]>) => {
      return [...action.payload];
    },
  },
});
export const { updateListLicensePlates } = ListLicensePlates.actions;

export default ListLicensePlates.reducer;
