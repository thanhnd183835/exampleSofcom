import { CarModel, Cart, CartFormData } from "./../model/ListModel";
import { CarFormData, CarModelFormData } from "../model/ListModel";
import { cloneDeep } from "lodash";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CartFormData = [];
export const AddCart = createSlice({
  name: "addPerson",
  initialState: initialState,
  reducers: {
    addCarToCart: (
      state,
      action: PayloadAction<{
        idPerson: string;
        carOfPerson: Array<CarModel> | CarModel;
      }>
    ) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));
      const { idPerson, carOfPerson } = action.payload;
      const existingCartItem = currentState.find(
        (item: { idPerson: string; carOfPerson: Array<CarModel> | CarModel }) =>
          item.idPerson === action.payload.idPerson
      );

      if (!existingCartItem) {
        currentState.push({
          idPerson,
          carOfPerson: Array.isArray(carOfPerson) ? carOfPerson : [carOfPerson],
        });
      } else {
        if (Array.isArray(existingCartItem.carOfPerson)) {
          existingCartItem.carOfPerson = [
            ...existingCartItem.carOfPerson,
            ...[carOfPerson],
          ];
        } else {
          existingCartItem.carOfPerson = [
            existingCartItem.carOfPerson,
            ...[carOfPerson],
          ];
        }
      }
      return currentState;
    },
    deleteInCart: (
      state,
      action: PayloadAction<{
        idPerson: string;
        idCar: string;
        indexCar: number;
      }>
    ) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));

      const body: { idPerson: string; idCar: string } = action.payload;
      const CartOfPerson = currentState.filter(
        (item: Cart) => item.idPerson === body.idPerson
      );

      CartOfPerson &&
        CartOfPerson[0]?.carOfPerson.splice(action.payload.indexCar, 1);
      console.log(CartOfPerson[0]?.carOfPerson);
      return CartOfPerson;
    },
  },
});

export const { addCarToCart, deleteInCart } = AddCart.actions;

export default AddCart.reducer;
