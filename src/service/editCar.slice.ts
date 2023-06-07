import { CarModelFormData, CarFormData, CarModel } from "../model/ListModel";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CarFormData = [
  {
    identificationPerson: "",
    id: "",
    type: "",
    model: "",
    color: "",
    price: "",
    status: 10,
    manufacturer: "",
  },
];

export const UpdateCar = createSlice({
  name: "updateFromCar",
  initialState: initialState,
  reducers: {
    updateFormCar: (state, action: PayloadAction<CarModel>) => {
      state.push(action.payload);
    },
  },
});

export const { updateFormCar } = UpdateCar.actions;

export default UpdateCar.reducer;
