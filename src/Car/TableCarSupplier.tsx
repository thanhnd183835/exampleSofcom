import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import { TableHead } from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ModeEdit from "@mui/icons-material/ModeEdit";
import { useDispatch, useSelector } from "react-redux";
import { CarFormData, CarModel } from "../model/ListModel";
import { RootState } from "../service/store";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { addFormCar, deleteCar, updateCar } from "../service/addCar.slice";
import { columnsCar } from "../constant/constant";

const TableCarSupplier = () => {
  const dispatch = useDispatch();
  const dataCar: CarFormData = useSelector(
    (state: RootState) => state?.addFormCar
  );
  const [openDialogCar, setOpenDialogCar] = useState(false);
  const [openDialogAddCar, setOpenDialogAddCar] = useState(false);
  const [idCar, setIdCar] = useState("");
  const [model, setModel] = useState("");
  const [nameCar, setNameCar] = useState("");
  const [color, setColor] = useState("");
  const [importPrice, setImportPrice] = useState<number>();
  const [salePrice, setSalePrice] = useState<number>();
  const [manufacturer, setManufacturer] = useState("");
  const [numberCar, setNumberCar] = useState<number>();
  const [newNumberCar, setNewNumberCar] = useState<number>();
  const [rowDataCar, setRowDataCar] = useState<CarModel>();
  const handleCancelDiaLogCar = () => {
    setOpenDialogCar(false);
  };
  const handleCancelDiaLogAddCar = () => {
    setOpenDialogAddCar(false);
  };
  const handleSubmitCar = () => {
    const body: CarModel = {
      id: idCar,
      type: nameCar,
      model: model,
      color: color,
      importPrice: importPrice!,
      salePrice: salePrice!,
      manufacturer: manufacturer,
      openSale: false,
      licensePlates: NaN,
      numberCar: numberCar!,
    };
    dispatch(updateCar(body));
    setOpenDialogCar(false);
  };
  const handleEditCar = (car: CarModel) => {
    setOpenDialogCar(true);
    setModel(car.model);
    setNameCar(car.type);
    setColor(car.color);
    setImportPrice(car.importPrice);
    setManufacturer(car.manufacturer);
    setIdCar(car.id);
    setNumberCar(car.numberCar);
  };
  const handleDeleteCar = (id: string) => {
    dispatch(deleteCar(id));
  };
  const handleAddCar = (dataCar: CarModel) => {
    setRowDataCar(dataCar);
    setOpenDialogAddCar(true);
  };
  const handleAddNumberCar = () => {
    if (rowDataCar) {
      const body = {
        id: rowDataCar.id,
        color: rowDataCar.color,
        importPrice: rowDataCar.importPrice,
        licensePlates: rowDataCar.licensePlates,
        manufacturer: rowDataCar.manufacturer,
        model: rowDataCar.model,
        numberCar: rowDataCar.numberCar + newNumberCar!,
        openSale: rowDataCar.openSale,
        salePrice: rowDataCar.salePrice,
        type: rowDataCar.type,
      };
      const res = dispatch(updateCar(body));
      if (res) setOpenDialogAddCar(false);
    }
  };
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columnsCar.map((headCell) => {
                return (
                  <TableCell key={headCell.id} align={"center"}>
                    {headCell.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCar &&
              dataCar?.map((row: CarModel) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="center">{row.model}</TableCell>
                    <TableCell align="center">{row.color}</TableCell>
                    <TableCell align="center">{row.importPrice}</TableCell>
                    <TableCell align="center">{row.manufacturer}</TableCell>
                    <TableCell align="center">{row.numberCar}</TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleEditCar(row)}
                    >
                      <ModeEdit />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAddCar(row)}
                      >
                        Thêm xe
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteCar(row.id)}
                      >
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
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
              value={nameCar}
              className="col-10"
              name="type"
              type="text"
              onChange={(e) => {
                setNameCar(e.target.value);
              }}
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 ">Năm Sản Xuất</label>
            <input
              value={model}
              name="model"
              type="text"
              className="col-10"
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 ">Màu</label>
            <input
              value={color}
              name="color"
              type="text"
              className="col-10"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 ">Giá Nhập</label>
            <input
              value={importPrice}
              name="price"
              type="text"
              className="col-10"
              onChange={(e) => {
                setImportPrice(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 ">số lượng</label>
            <input
              value={numberCar}
              name="numberCar"
              type="text"
              className="col-10"
              onChange={(e) => {
                setNumberCar(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="row mt-4">
            <label className="col-2 r-0">Hãng Xe</label>
            <input
              value={manufacturer}
              name="manufacturer"
              type="text"
              className="col-10"
              onChange={(e) => {
                setManufacturer(e.target.value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitCar}>submit Car</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogAddCar}
        fullWidth={true}
        onClose={handleCancelDiaLogAddCar}
        maxWidth={"lg"}
      >
        <DialogTitle>Nhập số lượng xe muốn nhập thêm</DialogTitle>
        <DialogContent>
          <div className="row">
            <label className="col-3 text-center">số lượng xe nhập thêm</label>
            <input
              className="col-9"
              name="type"
              onChange={(e) => setNewNumberCar(Number(e.target.value))}
              type="text"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAddNumberCar}>
            Nhập
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default TableCarSupplier;
