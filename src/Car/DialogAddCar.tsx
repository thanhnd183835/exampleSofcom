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

const columnsCar = [
  { id: "type", label: "Loại xe", align: "center" },
  { id: "model", label: "Năm sản xuất", align: "center" },
  { id: "color", label: "Màu xe", align: "center" },
  { id: "price", label: "Giá Nhập", align: "center" },
  { id: "manufacturer", label: "Hãng sản xuất", align: "center" },
  { id: "numberCar", label: "Số lượng", align: "center" },
  { id: "addCar", label: "Thêm xe", align: "center" },
];

const DialogAddCar = () => {
  const dispatch = useDispatch();
  const [openDialogCar, setOpenDialogCar] = useState(false);
  const navigate = useNavigate();
  const [openDialogTableCarSub, setOpenDialogTableCarSub] = useState(false);
  const [model, setModel] = useState("");
  const [nameCar, setNameCar] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState<number>();
  const [isANumber, setIsANumber] = useState<boolean>(true);
  const [numberCar, setNumberCar] = useState<number>();
  const [manufacturer, setManufacturer] = useState("");
  const dataCar: CarFormData = useSelector(
    (state: RootState) => state?.addFormCar
  );
  const handleCancelDiaLogCar = () => {
    setOpenDialogCar(false);
  };
  const handleCloseDialogCarSub = () => {
    setOpenDialogTableCarSub(false);
  };
  const handleOpenDiaLogCar = () => {
    setOpenDialogCar(true);
  };
  const handleOpenDialogCarSub = () => {
    setOpenDialogTableCarSub(true);
  };
  const handleSubmitCar = () => {
    const body: CarModel = {
      id: uuidv4(),
      type: nameCar,
      model: model,
      color: color,
      importPrice: price!,
      salePrice: 0,
      manufacturer: manufacturer,
      openSale: false,
      licensePlates: NaN,
      numberCar: numberCar!,
    };
    dispatch(addFormCar(body));
    setOpenDialogCar(false);
  };
  return (
    <>
      <div>
        <Button variant="contained" onClick={handleOpenDiaLogCar}>
          Nhập xe mới
        </Button>

        <Button
          variant="contained"
          className="float-end me-3"
          onClick={() => navigate("/addPerson")}
          size="small"
        >
          Back to Person
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
        open={openDialogCar}
        fullWidth={true}
        onClose={handleCancelDiaLogCar}
        maxWidth={"lg"}
      >
        <DialogTitle>Add Car</DialogTitle>
        <DialogContent>
          <div className="row mt-4">
            <label className="col-2 ">Loại xe</label>
            <input
              className="col-10"
              name="type"
              onChange={(e) => {
                setNameCar(e.target.value);
              }}
              type="text"
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 ">Năm Sản Xuất</label>
            <input
              name="model"
              onChange={(e) => {
                setModel(e.target.value);
              }}
              type="text"
              className="col-10"
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 ">Màu</label>
            <input
              name="color"
              onChange={(e) => {
                setColor(e.target.value);
              }}
              type="text"
              className="col-10"
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 ">Giá</label>
            <input
              name="price"
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) {
                  setIsANumber(false);
                } else {
                  setIsANumber(true);
                }
                setPrice(Number(e.target.value));
              }}
              type="text"
              className="col-10"
            />
            {isANumber === false && (
              <>
                <span className="col-2"></span>
                <span className="text-danger col-10" style={{ fontSize: 14 }}>
                  phải nhập giá tiền dưới dạng số
                </span>
              </>
            )}
          </div>
          <div className="row mt-4">
            <label className="col-2 ">số lượng</label>
            <input
              name="numberCar"
              onChange={(e) => {
                setNumberCar(parseInt(e.target.value));
              }}
              type="text"
              className="col-10"
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 r-0">Hãng Xe</label>
            <input
              name="manufacturer"
              onChange={(e) => {
                setManufacturer(e.target.value);
              }}
              type="text"
              className="col-10"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitCar}>submit Car</Button>
        </DialogActions>
      </Dialog>

      <div className="text-center text-uppercase fs-4">
        <p>Bảng thông tin xe của Supplier</p>
      </div>
      <div>
        <TableCarSupplier />
      </div>
    </>
  );
};
export default DialogAddCar;
