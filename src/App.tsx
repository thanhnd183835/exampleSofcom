import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ListCar from "./CarsList/ListCar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCarAndPerSon from "./CarsList/addCarAndPerson";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ListCar} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
