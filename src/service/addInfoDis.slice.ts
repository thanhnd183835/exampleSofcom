import { CarModel, InfoDis } from "./../model/ListModel";
import { CarFormData, CarModelFormData } from "../model/ListModel";
import { cloneDeep } from "lodash";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Array<InfoDis> = [];

export const AddInfoDis = createSlice({
  name: "addInfoDis",
  initialState: initialState,
  reducers: {
    addInfoDis: (state, action: PayloadAction<InfoDis>) => {
      return [...state, action.payload];
    },
  },
});
export const { addInfoDis } = AddInfoDis.actions;

export default AddInfoDis.reducer;
