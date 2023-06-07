import { CarFormData, CarModel, CarModelFormData } from "../model/ListModel";
import dayjs from "dayjs";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CarFormData = [
  // {
  //   identificationPerson: "",
  //   id: "",
  //   type: "",
  //   model: "",
  //   color: "",
  //   price: "",
  //   status: 10,
  //   manufacturer: "",
  // },
];

export const AddCar = createSlice({
  name: "addFormCar",
  initialState: initialState,
  reducers: {
    addFormCar: (state, action: PayloadAction<CarModel>) => {
      state.push(action.payload);
    },
  },
});

export const { addFormCar } = AddCar.actions;

export default AddCar.reducer;
