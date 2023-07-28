import { ListLicensePlates } from "./licensePlates.slice";
import { addDistributor } from "./addDistributor.slice";
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
import addCarToPersonReducer from "../service/addPerson.slice";
import addFormCarReducer from "../service/addCar.slice";
import addFormPersonReducer from "../service/addPerson.slice";
import updateCarReducer from "../service/addCar.slice";
import deleteCarReducere from "../service/addCar.slice";
import deleteCarInPersonReducer from "../service/addPerson.slice";
import importCarReducer from "../service/importCar.slice";
import editDistributorReducer from "../service/addDistributor.slice";
import addDistributorReducer from "../service/addDistributor.slice";
import addCarToDistributorReducer from "../service/addDistributor.slice";
import ListLicensePlatesReducer from "../service/licensePlates.slice";
import addCarToCartReducer from "../service/cart.slice";
import addInfoDisReducer from "../service/addInfoDis.slice";
import deleteInCartReducer from "../service/cart.slice";
const rootReducer = combineReducers({
  addCarToPerson: addCarToPersonReducer,
  addFormCar: addFormCarReducer,
  addPerson: addFormPersonReducer,
  updateCar: updateCarReducer,
  deleteCar: deleteCarReducere,
  deleteCarInPerson: deleteCarInPersonReducer,
  importCar: importCarReducer,
  editDistributor: editDistributorReducer,
  addDistributor: addDistributorReducer,
  addCarToDistributor: addCarToDistributorReducer,
  updateListLicensePlates: ListLicensePlatesReducer,
  addCarToCart: addCarToCartReducer,
  addInfoDis: addInfoDisReducer,
  deleteInCart: deleteInCartReducer,
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
