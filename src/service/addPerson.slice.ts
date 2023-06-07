import dayjs from "dayjs";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersonFormData, PersonModelFormData } from "../model/ListModel";
const initialState: PersonFormData = [
  // {
  //   idPerson: "",
  //   firstName: "",
  //   lastName: "",
  //   age: null,
  //   gender: null,
  //   identification: "",
  //   hasCar: [],
  // },
];

export const AddPerSon = createSlice({
  name: "addPerson",
  initialState: initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<PersonModelFormData>) => {
      state.push(action.payload);
    },
  },
});

export const { addPerson } = AddPerSon.actions;

export default AddPerSon.reducer;
