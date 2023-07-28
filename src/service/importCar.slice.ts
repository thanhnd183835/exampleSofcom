import { CarModel } from "./../model/ListModel";

import { CarFormData } from "../model/ListModel";
import { cloneDeep } from "lodash";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CarFormData = [];
export const ImportCar = createSlice({
  name: "importCar",
  initialState: initialState,
  reducers: {},
});
export const {} = ImportCar.actions;
export default ImportCar.reducer;
