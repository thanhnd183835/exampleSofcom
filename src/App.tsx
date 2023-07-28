import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import DialogAddCar from "./Car/DialogAddCar";
import DialogAddPerson from "./Car/DialogAddPerson";
import TableCarDistributor from "./Car/TableCarDistributor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={DialogAddCar} />
        <Route path="/addPerson" Component={DialogAddPerson} />
        <Route path="/carImport" Component={TableCarDistributor} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
