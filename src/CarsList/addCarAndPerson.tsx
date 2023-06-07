import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CarModel, CarModelFormData, PersonModel } from "../model/ListModel";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { addFormCar } from "../service/addCar.slice";
import { addPerson } from "../service/addPerson.slice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CarStatusOptions, PersonGenderOption } from "../model/data";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { PersonModelFormData } from "../model/ListModel";

const AddCarAndPerSon = () => {
  const [openDialogCar, setOpenDialogCar] = useState(false);
  const [openDialogPerson, setOpenDialogPerson] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const handleCancelDiaLog = () => {
    setOpenDialogCar(false);
  };
  const handleOpenDiaLogCar = () => {
    setOpenDialogCar(true);
  };
  const handleOpenDialogPerson = () => {
    setOpenDialogPerson(true);
  };
  const submit = async (data: CarModelFormData) => {
    localStorage.clear();
    const formatData = {
      type: data.type,
      status: data?.status?.value || 10,
      model: moment(data.model).format("DD/MM/YYYY"),
      color: data.color,
      identificationPerson: data.identificationPerson,
      manufacturer: data.manufacturer,
      id: uuidv4(),
      price: data.price,
    };

    const res = dispatch(addFormCar(formatData));
    if (res) {
      setOpenDialogCar(false);
      navigate("/");
    }
  };
  const handleCancelDiaLogPerson = () => {
    setOpenDialogPerson(false);
  };
  const submitPerson = async (dataPerson: PersonModelFormData) => {
    const formDataPerson = {
      idPerson: uuidv4(),
      firstName: dataPerson.firstName,
      lastName: dataPerson.lastName,
      age: dataPerson.age,
      gender: dataPerson.gender,
      identification: dataPerson.identification,
      hasCar: dataPerson.hasCar,
    };
    const res = await dispatch(addPerson(formDataPerson));
    if (res) {
      setOpenDialogPerson(false);
      navigate("/");
    }
  };

  return (
    <div className="d-flex gap-2">
      <div>
        <Button variant="contained" onClick={handleOpenDiaLogCar}>
          Add Car
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={handleOpenDialogPerson}>
          Add Person
        </Button>
      </div>
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
                    <InputLabel id="demo-simple-select-label">
                      Tình trạng
                    </InputLabel>
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
    </div>
  );
};
export default AddCarAndPerSon;
