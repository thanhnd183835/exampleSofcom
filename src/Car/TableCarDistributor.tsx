import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import { TableHead } from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useDispatch, useSelector } from "react-redux";
import {
  CarFormData,
  CarModel,
  Distributor,
  DistributorFormData,
} from "../model/ListModel";
import { RootState } from "../service/store";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEdit from "@mui/icons-material/ModeEdit";
import { addFormCar, deleteCar, updateCar } from "../service/addCar.slice";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  addCarToDistributor,
  addDistributor,
} from "../service/addDistributor.slice";
import DialogEditCarDistributor from "./DialogEditCarDistributor";
import DialogAddInfoDistributor from "./DialogInfoDistributor";

const columnsCar = [
  { id: "type", label: "Loại xe", align: "center" },
  { id: "model", label: "Năm sản xuất", align: "center" },
  { id: "color", label: "Màu xe", align: "center" },
  { id: "importPrice", label: "Giá Nhập", align: "center" },
  { id: "salePrice", label: "Giá Bán", align: "center" },
  { id: "manufacturer", label: "Hãng sản xuất", align: "center" },
  { id: "numberCar", label: "Số lượng", align: "center" },
  { id: "openSale", label: "mở bán", align: "center" },
  { id: "action", label: "Action", align: "center" },
];
const TableCarDistributor = () => {
  const [openDialogCar, setOpenDialogCar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [idTableDistributor, setIdTableDistributor] = useState("");
  const [openDialogCarEditDistributor, setOpenDialogCarEditDistributor] =
    useState<boolean>(false);
  const [numberCar, setNumberCar] = useState<number>(0);
  const [rowDataCar, setRowDataCar] = useState<CarModel>();
  const dataDistributor: DistributorFormData = useSelector(
    (state: RootState) => state?.addDistributor
  );
  const infoDis = useSelector((state: RootState) => state?.addInfoDis);
  const [openDialogNumberCar, setOpenDialogNumberCar] = useState(false);
  const [openDialogInfoDistributor, setOpenDialogInfoDistributor] =
    useState(false);
  const [dataCarDistributor, setDataCarDistributor] = useState<CarModel>({
    id: "",
    type: "",
    model: "",
    color: "",
    importPrice: 0,
    salePrice: 0,
    manufacturer: "",
    openSale: false,
    licensePlates: NaN,
    numberCar: 0,
  });
  const dataCar: CarFormData = useSelector(
    (state: RootState) => state?.addFormCar
  );
  const dataImportCar: CarFormData = useSelector(
    (state: RootState) => state?.importCar
  );
  const handleOpenDialog = (id: string) => {
    setOpenDialogCar(true);
    setIdTableDistributor(id);
  };
  const handleCancelDialog = () => {
    setOpenDialogCar(false);
  };
  const handleCancelDialogNumberCar = () => {
    setOpenDialogNumberCar(false);
  };
  const handleImportCar = (data: CarModel) => {
    setRowDataCar(data);
    setOpenDialogNumberCar(true);
  };
  const handleCloseDialogSupplier = () => {
    setOpenDialogCarEditDistributor(false);
  };
  const handleEditCar = (data: CarModel, id: string) => {
    setIdTableDistributor(id);
    setDataCarDistributor(data);
    setOpenDialogCarEditDistributor(true);
  };
  const handleAddTable = () => {
    const distributor: Distributor = {
      idDistributor: uuidv4(),
      tableCar: [],
    };
    dispatch(addDistributor(distributor));
  };
  const handleImportCarForDistributor = () => {
    // let existCar = dataImportCar.find(
    //   (itemCar) => itemCar.id === rowDataCar?.id
    // );
    if (rowDataCar) {
      const body = {
        idTableDistributor: idTableDistributor,
        data: {
          color: rowDataCar.color,
          id: rowDataCar.id,
          licensePlates: rowDataCar.licensePlates,
          manufacturer: rowDataCar.manufacturer,
          model: rowDataCar.model,
          numberCar: numberCar!,
          openSale: rowDataCar.openSale,
          importPrice: rowDataCar.importPrice,
          salePrice: rowDataCar.salePrice,
          type: rowDataCar.type,
        },
      };

      const res = dispatch(addCarToDistributor(body));
      dispatch(
        updateCar({
          color: rowDataCar.color,
          id: rowDataCar.id,
          licensePlates: rowDataCar.licensePlates,
          manufacturer: rowDataCar.manufacturer,
          model: rowDataCar.model,
          numberCar: rowDataCar.numberCar - numberCar!,
          openSale: rowDataCar.openSale,
          salePrice: rowDataCar.salePrice,
          importPrice: rowDataCar.importPrice,
          type: rowDataCar.type,
        })
      );
      if (res) setOpenDialogNumberCar(false);
    }
  };
  const handleOpenInfoDistributor = () => {
    setOpenDialogInfoDistributor(true);
  };
  const handleCloseInfoDistributor = () => {
    setOpenDialogInfoDistributor(false);
  };
  return (
    <>
      <div>
        <Button
          variant="contained"
          color="error"
          className="me-3"
          onClick={handleAddTable}
        >
          Thêm Đại lý
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
          onClick={() => navigate("/addPerson")}
          size="small"
        >
          Back to Person
        </Button>
      </div>
      {dataDistributor.map((distributor: Distributor, index) => (
        <div>
          <div>
            <p className="text-center text-uppercase fs-4 mt-2">
              bảng thông tin xe của Distributor:{infoDis[index]?.nameDis}
            </p>
            <Button
              variant="contained"
              onClick={handleOpenInfoDistributor}
              className="mt-5"
            >
              Nhập thông tin distributor
            </Button>
            <p>Địa chỉ: {infoDis[index]?.addressDis}</p>
            <p>Email: {infoDis[index]?.email}</p>
            <p>SĐT: {infoDis[index]?.phoneNumber}</p>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => handleOpenDialog(distributor.idDistributor)}
              className="mt-2"
            >
              Nhập xe cho {infoDis[index]?.nameDis}
            </Button>
          </div>
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
                {dataDistributor &&
                  dataDistributor[index]?.tableCar.map((row: CarModel) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell align="center">{row.type}</TableCell>
                        <TableCell align="center">{row.model}</TableCell>
                        <TableCell align="center">{row.color}</TableCell>
                        <TableCell align="center">{row.importPrice}</TableCell>
                        <TableCell align="center">{row.salePrice}</TableCell>
                        <TableCell align="center">{row.manufacturer}</TableCell>
                        <TableCell align="center">{row.numberCar}</TableCell>
                        <TableCell align="center">
                          <Switch
                            disabled
                            checked={row.openSale}
                            color="success"
                          />
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={() =>
                            handleEditCar(row, distributor.idDistributor)
                          }
                        >
                          <ModeEdit />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
      {/* start: dialog nhap xe */}
      <Dialog
        open={openDialogCar}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={handleCancelDialog}
      >
        <DialogTitle>Nhập xe cho Distributor</DialogTitle>
        <DialogContent>
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
                        <TableCell align="center">{row.salePrice}</TableCell>
                        <TableCell align="center">{row.manufacturer}</TableCell>
                        <TableCell align="center">{row.numberCar}</TableCell>
                        <TableCell align="center">{}</TableCell>
                        <TableCell
                          align="center"
                          onClick={() => handleImportCar(row)}
                        >
                          <Button variant="contained">Nhập Xe</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      {/* end: dialog nhap xe */}
      <Dialog
        open={openDialogNumberCar}
        fullWidth={true}
        maxWidth={"md"}
        onClose={handleCancelDialogNumberCar}
      >
        <DialogTitle>Số lượng xe cần nhập</DialogTitle>
        <DialogContent>
          <div className="row mt-4">
            <label className="col-3 ">số lượng xe nhập</label>
            <input
              className="col-9"
              name="type"
              onChange={(e) => {
                setNumberCar(parseInt(e.target.value));
              }}
              type="text"
            />
            {rowDataCar && rowDataCar?.numberCar === 0 && (
              <>
                <span className="col-3"></span>
                <span
                  className="text-danger col-9 ps-0"
                  style={{ fontSize: 14 }}
                >
                  đã không còn xe để nhập
                </span>
              </>
            )}

            {rowDataCar && numberCar > rowDataCar?.numberCar && (
              <>
                <span className="col-3"></span>
                <span
                  className="text-danger col-9 ps-0"
                  style={{ fontSize: 14 }}
                >
                  không đủ số lượng xe để nhập
                </span>
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleCancelDialogNumberCar}
          >
            hủy
          </Button>
          {(rowDataCar && rowDataCar?.numberCar === 0) ||
          (rowDataCar && numberCar > rowDataCar?.numberCar) ? (
            <Button variant="contained" color="success" disabled>
              Nhập xe
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleImportCarForDistributor}
            >
              Nhập xe
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <DialogEditCarDistributor
        isOpen={openDialogCarEditDistributor}
        handleClose={handleCloseDialogSupplier}
        data={dataCarDistributor}
        idDistributor={idTableDistributor}
      />
      <DialogAddInfoDistributor
        isOpen={openDialogInfoDistributor}
        handleClose={handleCloseInfoDistributor}
      />
    </>
  );
};
export default TableCarDistributor;
