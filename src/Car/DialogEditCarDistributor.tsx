import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { CarModel } from "../model/ListModel";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { editDistributor } from "../service/addDistributor.slice";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  data: CarModel;
  idDistributor: string;
};
const DialogEditCarDistributor = (props: Props) => {
  const dispatch = useDispatch();
  const [nameType, setTypeCar] = useState("");
  const [model, setModel] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [importPrice, setImportPrice] = useState<number>();
  const [salePrice, setSalePrice] = useState<number>();
  const [manufacturer, setManufacturer] = useState<string>("");
  const [numberCar, setNumberCar] = useState<number>();
  const [openSale, setOpenSale] = useState(false);
  const [idDistributor, setIdDistributor] = useState<string>("");
  useEffect(() => {
    setTypeCar(props.data?.type);
    setModel(props.data?.model);
    setColor(props.data?.color);
    setImportPrice(props.data?.importPrice);
    setSalePrice(props.data.salePrice);
    setManufacturer(props.data?.manufacturer);
    setOpenSale(props.data?.openSale);
    setNumberCar(props.data.numberCar);
    setIdDistributor(props.idDistributor);
  }, [
    props.data?.type,
    props.data?.model,
    props.data?.color,
    props.data?.importPrice,
    props.data?.manufacturer,
    props.data?.openSale,
    props.data.numberCar,
    props.idDistributor,
    props.data.salePrice,
  ]);

  const handleEditCarDistributor = () => {
    const body = {
      idDistributor: idDistributor,
      dataCar: {
        id: props.data?.id!,
        type: nameType,
        model: model,
        color: color,
        importPrice: importPrice!,
        salePrice: salePrice!,
        manufacturer: manufacturer,
        openSale: openSale,
        numberCar: numberCar!,
        licensePlates: NaN,
      },
    };

    dispatch(editDistributor(body));
    props.handleClose();
  };

  return (
    <Dialog
      open={props.isOpen}
      fullWidth={true}
      onClose={props.handleClose}
      maxWidth={"lg"}
    >
      <DialogTitle>Edit Car</DialogTitle>
      <DialogContent>
        <div className="row mt-4">
          <label className="col-2 ">Loại xe</label>
          <input
            disabled
            value={nameType}
            className="col-10"
            name="type"
            type="text"
            onChange={(e) => {
              setTypeCar(e.target.value);
            }}
          />
        </div>
        <div className="row mt-4">
          <label className="col-2 ">Năm Sản Xuất</label>
          <input
            disabled
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
            disabled
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
          <label className="col-2 ">Giá nhập</label>
          <input
            disabled
            value={importPrice}
            name="color"
            type="number"
            className="col-10"
            onChange={(e) => {
              setImportPrice(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="row mt-4">
          <label className="col-2 ">Giá bán</label>
          {openSale == true ? (
            <input
              value={salePrice}
              name="importPrice"
              type="number"
              className="col-10"
              onChange={(e) => {
                setSalePrice(parseInt(e.target.value));
              }}
            />
          ) : (
            <input
              disabled
              value={salePrice}
              name="importPrice"
              type="text"
              className="col-10"
              onChange={(e) => {
                setSalePrice(parseInt(e.target.value));
              }}
            />
          )}
        </div>
        <div className="row mt-4">
          <label className="col-2 r-0">Số lượng</label>
          <input
            disabled
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
            disabled
            value={manufacturer}
            name="manufacturer"
            type="text"
            className="col-10"
            onChange={(e) => {
              setManufacturer(e.target.value);
            }}
          />
        </div>
        <div className="row mt-4">
          <span className="col-2 ">Mở bán:</span>
          <span className="col-10 ">
            <Switch
              checked={openSale}
              onChange={(e) => setOpenSale(e.target.checked)}
              color="success"
            />
            <span className="mb-auto mt-auto">Active</span>
          </span>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleEditCarDistributor}>
          submit Car
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogEditCarDistributor;
