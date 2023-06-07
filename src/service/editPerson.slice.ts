import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonModelFormData } from "../model/ListModel";

const initialState = {
  loading: false,
  updateFormDataPerson: <PersonModelFormData>{},
};
export const UpdatePerson = createSlice({
  name: "updateFormDataPerson",
  initialState: initialState,
  reducers: {
    updateFormDataPerson: (
      state = initialState,
      action: PayloadAction<PersonModelFormData>
    ) => {
      return {
        ...state,
        updateFormDataPerson: { ...action.payload },
      };
    },
  },
});
export const { updateFormDataPerson } = UpdatePerson.actions;
export default UpdatePerson.reducer;
