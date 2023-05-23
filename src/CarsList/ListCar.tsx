import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import { TableHead } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import MenuItem from "@mui/material/MenuItem";
import {
  CarData,
  CarStatusOptions,
  DataPerson,
  PersonGenderOption,
} from "../model/data";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ModeEdit from "@mui/icons-material/ModeEdit";
import { DatePicker } from "@mui/x-date-pickers";
import { CarModel, CarModelFormData, PersonModel } from "../model/ListModel";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";
import { PersonModelFormData } from "../model/ListModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../service/store";
import { UpdateCar, updateFormCar } from "../service/editCar.slice";
import { updateFormDataPerson } from "../service/editPerson.slice";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DirectionsCarFilledOutlined from "@mui/icons-material/DirectionsCarFilledOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

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

const columnsPerson = [
  { id: "lastName", label: "Họ, Tên đệm", align: "center" },
  { id: "firstName", label: "Tên", align: "center" },
  { id: "age", label: "Tuổi", align: "center" },
  { id: "gender", label: "Giới tính", align: "center" },
  { id: "identification", label: "CCCD", align: "center" },
  { id: "editPerSon", label: "Sửa", align: "center" },
  { id: "deletePerSon", label: "Xóa", align: "center" },
];
const ListCar = () => {
  const [openDialogCar, setOpenDialogCar] = useState(false);
  const [openDialogPerson, setOpenDialogPerson] = useState(false);
  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const dispath = useDispatch();
  const formDataPerson = useSelector(
    (action: RootState) => action?.updateFormPerson
  );
  console.log(formDataPerson);

  const handleClick = () => {
    setOpen(!open);
  };

  const {
    handleSubmit: handleSubmitCar,
    reset: resetCar,
    control: controlCar,
    watch: watchCar,
    setValue: setValueCar,
    getValues: getValuesCar,
  } = useForm<CarModelFormData>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: true,
    defaultValues: {},
  });
  const {
    handleSubmit: handleSubmitPerson,
    reset: resetPerson,
    control: controlPerson,
    watch,
    setValue,
    getValues,
  } = useForm<PersonModelFormData>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: true,
    defaultValues: {},
  });
  const handleDeleteCar = (id: string) => {
    console.log(id);
  };
  const handleDeletePerson = () => {};
  const handleEditPerson = (person: PersonModel) => {
    setOpenDialogPerson(true);
    let formPersonReset: PersonModelFormData = {
      hasCar: person.hasCar,
      idPerson: person.idPerson,
      age: person.age,
      firstName: person.firstName,
      gender: person && person.gender ? person.gender.value : null,
      lastName: person.lastName,
      identification: person.identification,
    };
    resetPerson(formPersonReset);
  };

  const handleEditCar = (car: CarModel) => {
    setOpenDialogCar(true);

    let formCarReset: CarModelFormData = {
      type: car.type,
      //   model: car.model,
      color: car.color,
      price: car.price,
      status: car?.status?.value || null,
      manufacturer: car.manufacturer,
      id: car.id,
      identificationPerson: car.identificationPerson,
      model: dayjs(new Date()),
    };

    resetCar(formCarReset);
  };
  const handleCancelDiaLog = () => {
    setOpenDialogCar(false);
  };
  const handleCancelDiaLogPerson = () => {
    setOpenDialogPerson(false);
  };

  const submit = (data: CarModelFormData) => {
    const formatData = {
      type: data.type,
      status: data.status,
      model: moment(data.model).format("DD/MM/YYYY"),
      color: data.color,
      identificationPerson: data.identificationPerson,
      manufacturer: data.manufacturer,
      id: data.id,
      price: data.price,
    };
    dispath(updateFormCar(formatData));
  };
  const submitPerson = (dataPerson: PersonModelFormData) => {
    console.log(dataPerson);
    dispath(updateFormDataPerson(dataPerson));
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
            {CarData.map((row: CarModel) => {
              return (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">
                    {moment(row.model).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="center">{row.color}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">
                    <span>{row.status ? row.status.label : ""}</span>
                  </TableCell>
                  <TableCell align="center">{row.manufacturer}</TableCell>
                  <TableCell align="center" onClick={() => handleEditCar(row)}>
                    <ModeEdit />
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleDeleteCar(row.id)}
                  >
                    <DeleteForeverIcon />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer className="pt-5">
        <Table>
          <TableHead>
            <TableRow>
              {columnsPerson.map((headPerson) => (
                <TableCell key={headPerson.id} align="center">
                  {headPerson.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {DataPerson.map((person: PersonModel) => {
              return (
                <TableRow key={person.idPerson}>
                  <TableCell align="center">{person.lastName}</TableCell>
                  <TableCell align="center">{person.firstName}</TableCell>
                  <TableCell align="center">{person.age}</TableCell>
                  <TableCell align="center">{person.gender.label}</TableCell>
                  <TableCell align="center">
                    <span>{person.identification}</span>
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleEditPerson(person)}
                  >
                    <ModeEdit />
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleDeletePerson()}
                  >
                    <DeleteForeverIcon />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {openDialogCar && (
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={true}
          onClose={handleCancelDiaLog}
        >
          <DialogTitle>cập nhật</DialogTitle>
          <DialogContent className="pt-2">
            {/*handleSubmit sẽ trigger thêm 1 số action như validate form trước khi gọi hàm submit*/}
            <form className="row m-auto" onSubmit={handleSubmitCar(submit)}>
              {/*<form className="row m-auto" onSubmit={() => submit(getValues())}>*/}
              <Controller
                name="type"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="type"
                    label="Loại xe"
                    variant="outlined"
                    className="pb-3"
                    size="small"
                  />
                )}
                control={controlCar}
              />

              <Controller
                name="model"
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Năm sản xuất" {...field} />
                  </LocalizationProvider>
                )}
                control={controlCar}
              />
              <Controller
                name="color"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="color"
                    label="Màu xe"
                    variant="outlined"
                    className="mt-3 pb-3"
                    size="small"
                  />
                )}
                control={controlCar}
              />
              <Controller
                name="price"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="price"
                    label="Giá"
                    variant="outlined"
                    className=" pb-3"
                    size="small"
                  />
                )}
                control={controlCar}
              />
              <Controller
                name="status"
                render={({ field }) => (
                  <FormControl fullWidth className="pb-3">
                    <Select
                      {...field}
                      variant="outlined"
                      label="Tình trạng"
                      size="small"
                    >
                      {CarStatusOptions.map((status, index) => {
                        return (
                          <MenuItem value={status.value} key={status.value}>
                            {status.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
                control={controlCar}
              />
              <Controller
                name="manufacturer"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="manufacturer"
                    label="Hãng sản xuất"
                    variant="outlined"
                    className=" pb-3"
                    size="small"
                  />
                )}
                control={controlCar}
              />
              <DialogActions>
                <button autoFocus onClick={handleCancelDiaLog}>
                  Hủy
                </button>
                <button autoFocus>Cập Nhật</button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
      {openDialogPerson && (
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={true}
          onClose={handleCancelDiaLogPerson}
        >
          <DialogTitle>Cập nhật</DialogTitle>
          <DialogContent className="pt-3">
            <form
              className="row m-auto"
              onSubmit={handleSubmitPerson(submitPerson)}
            >
              <Controller
                name="firstName"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="firstName"
                    label="Họ"
                    variant="outlined"
                    size="small"
                    className="pb-3"
                  />
                )}
                control={controlPerson}
              />
              <Controller
                name="lastName"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="lastName"
                    label="Họ, Đệm"
                    variant="outlined"
                    className="pb-3"
                    size="small"
                  />
                )}
                control={controlPerson}
              />
              <Controller
                name="age"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="age"
                    label="Tuổi"
                    variant="outlined"
                    className="pb-3"
                    size="small"
                  />
                )}
                control={controlPerson}
              />
              <Controller
                name="gender"
                render={({ field }) => (
                  <FormControl fullWidth className="pb-3">
                    <InputLabel id="demo-simple-select-label">
                      Giới tính
                    </InputLabel>
                    <Select {...field} label={"Giới tính"} variant="outlined">
                      {PersonGenderOption.map((gender, index) => {
                        return (
                          <MenuItem value={gender.value} key={gender.value}>
                            {gender.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
                control={controlPerson}
              />
              <Controller
                name="identification"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="identification"
                    label="CCCD"
                    variant="outlined"
                    className="pb-3"
                    size="small"
                  />
                )}
                control={controlPerson}
              />
              <Controller
                name="hasCar"
                render={(field) => (
                  <List
                    sx={{ width: "100%", bgcolor: "background.paper" }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    {...field}
                  >
                    <ListItemButton onClick={handleClick} className="border">
                      <ListItemIcon>
                        <DirectionsCarFilledOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Phương tiện" />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          {/* {formDataPerson.updateFormDataPerson} */}
                          {/* <ListItemText primary="Starred" /> */}
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                )}
                control={controlPerson}
              />
              <DialogActions>
                <button autoFocus onClick={handleCancelDiaLogPerson}>
                  Hủy
                </button>
                <button autoFocus>Cập Nhật</button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
export default ListCar;
