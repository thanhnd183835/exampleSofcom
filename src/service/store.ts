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
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { configureStore } from "@reduxjs/toolkit";
import FormDataCarReducer from "../service/editCar.slice";
import FormDataPersonReducer from "../service/editPerson.slice";
import { config } from "process";

const rootReducer = combineReducers({
  updateFormCar: FormDataCarReducer,
  updateFormPerson: FormDataPersonReducer,
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
