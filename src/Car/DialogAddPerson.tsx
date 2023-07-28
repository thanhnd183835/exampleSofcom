import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { PersonGenderOption } from "../model/data";
import DialogTitle from "@mui/material/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import {
  PersonGender,
  PersonModel,
  PersonModelFormData,
} from "../model/ListModel";
import { useDispatch, useSelector } from "react-redux";
import { addPerson } from "../service/addPerson.slice";
import { useNavigate } from "react-router-dom";
import TablePerson from "./TablePerson";

const DialogAddPerson = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialogPerson, setOpenDialogPerson] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<string | null>("Nam");
  const [identification, setIdentification] = useState("");

  const handleCancelDiaLogPerson = () => {
    setOpenDialogPerson(false);
  };

  const handleOpenDialogPerson = () => {
    setOpenDialogPerson(true);
  };

  const handleSubmitPerson = () => {
    const body: PersonModel = {
      idPerson: uuidv4(),
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender || null,
      identification: identification,
      hasCar: [],
    };
    dispatch(addPerson(body));

    setOpenDialogPerson(false);
  };
  return (
    <>
      <div>
        <Button
          variant="contained"
          onClick={handleOpenDialogPerson}
          className="ms-3"
        >
          Add Person
        </Button>
        <Button
          variant="contained"
          className="float-end"
          onClick={() => navigate("/")}
          size="small"
        >
          Back to Supplier
        </Button>
        <Button
          variant="contained"
          className="float-end me-3"
          onClick={() => navigate("/carImport")}
          size="small"
        >
          Back to Distributor
        </Button>
      </div>
      <Dialog
        maxWidth={"lg"}
        fullWidth={true}
        open={openDialogPerson}
        onClose={handleCancelDiaLogPerson}
      >
        <DialogTitle>Add Person</DialogTitle>
        <DialogContent>
          <div className="row pt-4">
            <label className="col-2">First Name</label>
            <input
              name="firstName"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              className="col-10"
            />
          </div>
          <div className="row pt-4">
            <label className="col-2">last Name</label>
            <input
              name="lastName"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              className="col-10"
            />
          </div>
          <div className="row pt-4">
            <label className="col-2">Tuổi</label>
            <input
              name="age"
              min={1}
              onChange={(e) => {
                setAge(parseInt(e.target.value));
              }}
              type="number"
              className="col-10"
            />
          </div>
          <div className="row pt-4">
            <label className="col-2">Giới Tính</label>
            <select
              name="gender"
              className="col-10"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              {PersonGenderOption.map((gender) => (
                <option>{gender.label}</option>
              ))}
            </select>
          </div>
          <div className="row pt-4">
            <label className="col-2">CCCD</label>
            <input
              name="identification"
              onChange={(e) => {
                setIdentification(e.target.value);
              }}
              type="text"
              className="col-10"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitPerson}>submit person</Button>
        </DialogActions>
      </Dialog>
      <div>
        <p className="text-center text-uppercase fs-4">
          bảng thông tin của Peron
        </p>
      </div>
      <div>
        <TablePerson />
      </div>
    </>
  );
};
export default DialogAddPerson;
