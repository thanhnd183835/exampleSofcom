import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { CarFormData, CarModel, Cart, PersonModel } from "../model/ListModel";
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
import { addCarToPerson } from "../service/addPerson.slice";
import { addCarToCart, deleteInCart } from "../service/cart.slice";
type Props = {
  isOpen: boolean;
  handleClose: () => void;
  personData: PersonModel;
};
const columnsCar = [
  { id: "type", label: "Loại xe", align: "center" },
  { id: "model", label: "Năm sản xuất", align: "center" },
  { id: "color", label: "Màu xe", align: "center" },
  { id: "importPrice", label: "Giá Nhập", align: "center" },
  { id: "salePrice", label: "Giá Bán", align: "center" },
  { id: "manufacturer", label: "Hãng sản xuất", align: "center" },
  { id: "numberCar", label: "Số lượng", align: "center" },
  { id: "addCar", label: "Thêm xe", align: "center" },
];

const DialogCart = (props: Props) => {
  const listCart = useSelector((state: RootState) => state?.addCarToCart);
  const dispatch = useDispatch();
  const cartOfPerson = listCart
    .filter(
      (itemCarts: Cart) => itemCarts.idPerson === props?.personData?.idPerson
    )
    .map((itemCart: Cart) => itemCart.carOfPerson)
    .flat();

  const handleBuyCar = (dataCar: CarModel, index: number) => {
    const body = {
      idPerson: props.personData.idPerson,
      firstName: props.personData.firstName,
      lastName: props.personData.lastName,
      age: props.personData.age,
      gender: props.personData.gender,
      identification: props.personData.identification,
      hasCar: [
        {
          id: dataCar.id,
          type: dataCar.type,
          model: dataCar.model,
          color: dataCar.color,
          importPrice: dataCar.importPrice,
          salePrice: dataCar.salePrice,
          manufacturer: dataCar.manufacturer,
          openSale: dataCar.openSale,
          licensePlates: dataCar.licensePlates, // biển số xe
          numberCar: dataCar.numberCar,
          kilometer: 0,
          status: false,
        },
      ],
    };
    dispatch(addCarToPerson(body));
    const data = {
      indexCar: index,
      idPerson: props.personData.idPerson,
      idCar: dataCar.id,
    };
    dispatch(deleteInCart(data));
  };
  const handleDeleItemCart = (index: number, data: CarModel) => {
    const body = {
      idPerson: props.personData.idPerson,
      idCar: data.id,
      indexCar: index,
    };
    dispatch(deleteInCart(body));
  };
  return (
    <>
      <Dialog
        open={props.isOpen}
        fullWidth={true}
        onClose={props.handleClose}
        maxWidth={"lg"}
      >
        <DialogTitle>person cart</DialogTitle>
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
                {cartOfPerson.map((itemCar: CarModel, index) => {
                  return (
                    <TableRow>
                      <TableCell align="center">{itemCar?.type}</TableCell>
                      <TableCell align="center">{itemCar?.model}</TableCell>
                      <TableCell align="center">{itemCar?.color}</TableCell>
                      <TableCell align="center">
                        {itemCar?.importPrice}
                      </TableCell>
                      <TableCell align="center">{itemCar?.salePrice}</TableCell>
                      <TableCell align="center">
                        {itemCar?.manufacturer}
                      </TableCell>
                      <TableCell align="center">{itemCar?.numberCar}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleBuyCar(itemCar, index)}>
                          Mua xe
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="error"
                          onClick={() => handleDeleItemCart(index, itemCar)}
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default DialogCart;
