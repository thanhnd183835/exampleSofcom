import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import { TableHead } from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ModeEdit from "@mui/icons-material/ModeEdit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../service/store";
import { CarModel, CarModelFormData, PersonModel } from "../model/ListModel";
import Dialog from "@mui/material/Dialog";
const columnsCar = [
  { id: "type", label: "Loại xe", align: "center" },
  { id: "model", label: "Năm sản xuất", align: "center" },
  { id: "color", label: "Màu xe", align: "center" },
  { id: "price", label: "Giá", align: "center" },
  { id: "status", label: "Tình trạng", align: "center" },
  { id: "manufacturer", label: "Hãng sản xuất", align: "center" },
  { id: "editCar", label: "Sửa", align: "center" },
  { id: "deleteCar", label: "Xóa", align: "center" },
];
const DialogPerson = () => {
  const formDataCar = useSelector((action: RootState) => action.addFormCar);
  const status = [
    { label: "xe mới", value: 10 },
    { label: "xe cũ", value: 20 },
  ];
  const handleDeleteCar = (id: string) => {
    console.log(id);
  };
  return <div></div>;
};

export default DialogPerson;
