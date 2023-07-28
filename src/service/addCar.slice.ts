import { CarModel } from "./../model/ListModel";
import { CarFormData, CarModelFormData } from "../model/ListModel";
import { cloneDeep } from "lodash";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CarFormData = [];

export const AddCar = createSlice({
  name: "addFormCar",
  initialState: initialState,
  reducers: {
    addFormCar: (state, action: PayloadAction<CarModel>) => {
      return [...state, action.payload];
    },
    updateCar: (state, action: PayloadAction<CarModel>) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));

      const update: CarModel = action.payload;
      const carUpdateIndex: number = currentState.findIndex(
        (car: CarModel) => car.id === update.id
      );

      if (carUpdateIndex !== -1) {
        currentState[carUpdateIndex] = update;
      }
      return currentState;
    },
    deleteCar: (state, action: PayloadAction<string>) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));
      const idCar: string = action.payload;
      const newCar = currentState.filter((car: CarModel) => car.id !== idCar);
      return newCar;
    },
  },
});
export const { addFormCar, updateCar, deleteCar } = AddCar.actions;

export default AddCar.reducer;
