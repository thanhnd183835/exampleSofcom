import { CarModelFormData } from "../model/ListModel";
import dayjs from "dayjs";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  updateFormData: <CarModelFormData>{
    identificationPerson: "",
    id: "",
    type: "",
    model: "",
    color: "",
    price: "",
    status: null,
    manufacturer: "",
  },
};
export const UpdateCar = createSlice({
  name: "updateFromCar",
  initialState,
  reducers: {
    updateFormCar: (
      state = initialState,
      action: PayloadAction<CarModelFormData>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateFormCar } = UpdateCar.actions;

export default UpdateCar.reducer;
