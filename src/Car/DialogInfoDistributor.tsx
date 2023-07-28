import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { CarFormData, CarModel } from "../model/ListModel";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { addFormCar } from "../service/addCar.slice";
import TableContainer from "@material-ui/core/TableContainer";
import { TableHead } from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableCarSupplier from "./TableCarSupplier";
import { useNavigate } from "react-router-dom";
import { RootState } from "../service/store";
import { addInfoDis } from "../service/addInfoDis.slice";
type Props = {
  isOpen: boolean;
  handleClose: () => void;
};
const DialogAddInfoDistributor = (props: Props) => {
  const dispatch = useDispatch();
  const [nameDis, setNameDis] = useState("");
  const [addressDis, setAddressDis] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<number>();
  const handleSubmitInfoDis = () => {
    const body = {
      nameDis: nameDis,
      addressDis: addressDis,
      email: email,
      phoneNumber: phoneNumber!,
    };
    dispatch(addInfoDis(body));
    props.handleClose();
  };
  return (
    <>
      <Dialog
        open={props.isOpen}
        fullWidth={true}
        onClose={props.handleClose}
        maxWidth={"lg"}
      >
        <DialogTitle>Nhập thông tin distributor</DialogTitle>
        <DialogContent>
          <div className="row mt-4">
            <label className="col-2 ">Tên Distributor</label>
            <input
              className="col-10"
              name="type"
              type="text"
              onChange={(e) => {
                setNameDis(e.target.value);
              }}
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 ">Địa chỉ </label>
            <input
              className="col-10"
              name="type"
              type="text"
              onChange={(e) => {
                setAddressDis(e.target.value);
              }}
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 ">Email</label>
            <input
              className="col-10"
              name="type"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 ">SĐT</label>
            <input
              className="col-10"
              name="type"
              type="number"
              onChange={(e) => {
                setPhoneNumber(parseInt(e.target.value));
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmitInfoDis}>
            submit{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DialogAddInfoDistributor;
