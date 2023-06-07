import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import FormDataCarReducer from "../service/editCar.slice";
import FormDataPersonReducer from "../service/editPerson.slice";
import addFormCarReducer from "../service/addCar.slice";
import addFormPersonReducer from "../service/addPerson.slice";

const rootReducer = combineReducers({
  updateFormCar: FormDataCarReducer,
  updateFormPerson: FormDataPersonReducer,
  addFormCar: addFormCarReducer,
  addPerson: addFormPersonReducer,
});
const persistConfig = {
  key: "root",
  storage: storage,
  //   stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
