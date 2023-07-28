import {
  CarModel,
  Distributor,
  DistributorFormData,
} from "./../model/ListModel";
import { cloneDeep } from "lodash";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: DistributorFormData = [];

export const AddDistributor = createSlice({
  name: "addDistributor",
  initialState: initialState,
  reducers: {
    addDistributor: (state, action: PayloadAction<Distributor>) => {
      return [...state, action.payload];
    },
    addCarToDistributor: (
      state,
      action: PayloadAction<{ idTableDistributor: string; data: CarModel }>
    ) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));

      const distributorIndex: number = currentState.findIndex(
        (distributor: Distributor) =>
          distributor.idDistributor === action.payload.idTableDistributor
      );

      if (distributorIndex !== -1) {
        currentState[distributorIndex].tableCar = [
          ...currentState[distributorIndex].tableCar,
          action.payload.data,
        ];
      }
      return currentState;
    },
    editDistributor: (
      state,
      action: PayloadAction<{ idDistributor: string; dataCar: CarModel }>
    ) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));
      const editCar = action.payload;

      // tim chi muc cua thang distributor
      const carEditIndex: number = currentState.findIndex(
        (car: { idDistributor: string; dataCar: CarModel }) =>
          car.idDistributor === editCar.idDistributor
      );

      if (
        carEditIndex !== -1 &&
        currentState[carEditIndex] &&
        currentState[carEditIndex].tableCar !== undefined
      ) {
        // tim vi tri car trong dataCar
        const foundCarIndex = currentState[carEditIndex].tableCar.findIndex(
          (car: CarModel) => car.id === editCar.dataCar.id
        );
        if (foundCarIndex !== -1) {
          currentState[carEditIndex].tableCar[foundCarIndex] = editCar.dataCar;
        }
      }
      return currentState;
    },
  },
});

export const { addDistributor, addCarToDistributor, editDistributor } =
  AddDistributor.actions;

export default AddDistributor.reducer;
