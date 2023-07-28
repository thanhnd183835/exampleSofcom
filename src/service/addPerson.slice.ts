import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CarModel, PersonFormData, PersonModel } from "../model/ListModel";
import { cloneDeep } from "lodash";
const initialState: PersonFormData = [];

export const AddPerSon = createSlice({
  name: "addPerson",
  initialState: initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<PersonModel>) => {
      return [...state, action.payload];
    },
    addCarToPerson: (state, action: PayloadAction<PersonModel>) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));

      const carToAdd: PersonModel = action.payload;

      const personToUpdateIndex: number = currentState.findIndex(
        (person: PersonModel) => person.idPerson === carToAdd.idPerson
      );

      if (personToUpdateIndex !== -1) {
        // Object.assign(personToUpdate, carToAdd);
        currentState[personToUpdateIndex] = carToAdd;
      }
      return currentState;
    },
    deleteCarInPerson: (
      state,
      action: PayloadAction<{ idCar: string; idPerson: string | undefined }>
    ) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));
      const id: { idCar: string; idPerson: string | undefined } =
        action.payload;

      const personIndex: number = currentState.findIndex(
        (person: PersonModel) => person.idPerson === id.idPerson
      );
      const carOfPerson = currentState
        .map((person: PersonModel) => person.hasCar)
        .flat();
      const newCarOfPerson = carOfPerson.filter(
        (car: CarModel) => car.id !== id.idCar
      );
      if (personIndex !== -1) {
        currentState[personIndex].hasCar = newCarOfPerson;
      }
      return currentState;
    },
  },
});

export const { addPerson, addCarToPerson, deleteCarInPerson } =
  AddPerSon.actions;

export default AddPerSon.reducer;
