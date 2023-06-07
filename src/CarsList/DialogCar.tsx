import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { CarStatusOptions } from "../model/data";
import React, { useState } from "react";
import { CarModelFormData } from "../model/ListModel";

const DialogCar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { handleSubmit, reset, control, watch, setValue, getValues } =
    useForm<CarModelFormData>({
      mode: "onSubmit",
      reValidateMode: "onBlur",
      criteriaMode: "firstError",
      shouldFocusError: true,
      defaultValues: {},
    });
  const handleCancelDiaLog = () => {
    setOpenDialog(false);
  };
  const submit = (data: CarModelFormData) => {
    console.log(data);
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={true}
      onClose={handleCancelDiaLog}
    >
      <DialogTitle>cập nhật</DialogTitle>
      <DialogContent>
        {/*handleSubmit sẽ trigger thêm 1 số action như validate form trước khi gọi hàm submit*/}
        <form className="row m-auto" onSubmit={handleSubmit(submit)}>
          {/*<form className="row m-auto" onSubmit={() => submit(getValues())}>*/}
          <Controller
            name="type"
            render={({ field }) => (
              <TextField
                {...field}
                id="type"
                label="Loại xe"
                variant="outlined"
                className=" pb-3"
                size="small"
              />
            )}
            control={control}
          />
          <Controller
            name="model"
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs} {...field}>
                <DatePicker label="Năm sản xuất" className=" pb-3 pe-0 ps-0" />
              </LocalizationProvider>
            )}
            control={control}
          />
          <Controller
            name="color"
            render={({ field }) => (
              <TextField
                {...field}
                id="color"
                label="Màu xe"
                variant="outlined"
                className="r pb-3"
                size="small"
              />
            )}
            control={control}
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
            control={control}
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
                  label={"Tình Trạng"}
                  // value={values.status}
                  // onChange={e => setValue('status', e.target.value , true)}
                >
                  {/* {CarStatusOptions.map((status, index) => {
                    return (
                      <MenuItem value={status.value} key={status.value}>
                        {status.label}
                      </MenuItem>
                    );
                  })} */}
                </Select>
              </FormControl>
            )}
            control={control}
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
            control={control}
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
  );
};
export default DialogCar;
