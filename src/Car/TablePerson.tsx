import React, { useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import { TableHead } from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ModeEdit from "@mui/icons-material/ModeEdit";
import {
  CarFormData,
  CarModel,
  PersonFormData,
  PersonModel,
} from "../model/ListModel";
import { RootState } from "../service/store";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { PersonGenderOption } from "../model/data";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { addCarToPerson, deleteCarInPerson } from "../service/addPerson.slice";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import licensePlatesSlice, {
  ListLicensePlates,
  updateListLicensePlates,
} from "../service/licensePlates.slice";
import {
  addCarToDistributor,
  editDistributor,
} from "../service/addDistributor.slice";
import { AddCart, addCarToCart } from "../service/cart.slice";
import DialogCart from "./cart";
const columnsPerson = [
  { id: "lastName", label: "Họ, Tên đệm", align: "center" },
  { id: "firstName", label: "Tên", align: "center" },
  { id: "age", label: "Tuổi", align: "center" },
  { id: "gender", label: "Giới tính", align: "center" },
  { id: "identification", label: "CCCD", align: "center" },
  { id: "editPerSon", label: "Sửa", align: "center" },
  { id: "addCar", label: "Thêm xe", align: "center" },
  { id: "cart", label: "giỏ hàng", align: "center" },
];
const columnsCar = [
  { id: "type", label: "Loại xe", align: "center" },
  { id: "model", label: "Năm sản xuất", align: "center" },
  { id: "color", label: "Màu xe", align: "center" },
  { id: "price", label: "Giá", align: "center" },
  { id: "manufacturer", label: "Hãng sản xuất", align: "center" },
  { id: "numberCar", label: "Số lương", align: "center" },
  { id: "openSale", label: "mở bán", align: "center" },
  { id: "action", label: "Action", align: "center" },
];
const TablePerson = () => {
  const dispatch = useDispatch();
  const dataPerson: PersonFormData = useSelector(
    (state: RootState) => state?.addPerson
  );
  const dataImportCar: CarFormData = useSelector(
    (state: RootState) => state?.importCar
  );
  const distributor = useSelector((state: RootState) => state?.addDistributor);
  const listLicensePlates = useSelector(
    (state: RootState) => state?.updateListLicensePlates
  );
  const [openDialogCart, setOpenDialogCart] = useState<boolean>(false);
  const [dataRowPerson, setDataRowPerson] = useState<PersonModel | undefined>(
    undefined
  );
  const [cars, setCars] = useState<
    Array<
      CarModel & {
        kilometer: number;
        status: boolean;
      }
    >
  >([]);

  const [person, setPerson] = useState<PersonModel>();
  const [openDialogPerson, setOpenDialogPerson] = useState<boolean>(false);
  const [openDialogTableCar, setOpenDialogTableCar] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<string | null>();
  const [identification, setIdentification] = useState("");
  const [openRegisterCar, setOpenRegisterCar] = useState<boolean>(false);
  const [licensePlates, setLicensePlates] = useState<number>();
  const [carToPerson, setCarToPerson] = useState<CarModel>();
  const [distributorName, setDistributorName] = useState<string>(
    distributor[0]?.idDistributor
  );
  const [numberCar, setNumberCar] = useState<number>();
  const handleCancelDiaLogPerson = () => {
    setOpenDialogPerson(false);
  };
  const handleCancelDiaLogTableCar = () => {
    setOpenDialogTableCar(false);
  };
  const handleEditPerson = (person: PersonModel) => {
    setDataRowPerson(person);
    setOpenDialogPerson(true);
    setFirstName(person.firstName);
    setLastName(person.lastName);
    setAge(person.age);
    setGender(person.gender);
    setIdentification(person.identification);
    setCars(person.hasCar);
  };

  const handleSubmitPerson = () => {
    setOpenDialogPerson(false);

    const body: PersonModel = {
      idPerson: dataRowPerson?.idPerson!,
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender!,
      identification: identification,
      hasCar: cars,
    };
    dispatch(addCarToPerson(body));
  };
  const handleShowDialogCar = (person: PersonModel) => {
    setOpenDialogTableCar(true);
    setDataRowPerson(person);
  };
  const handleAddCarToPerson = (car: CarModel) => {
    setOpenRegisterCar(true);
    setCarToPerson(car);
  };
  const handleCloseDialogCart = () => {
    setOpenDialogCart(false);
  };
  const handleDeleCar = (idCar: string) => {
    const body = {
      idCar: idCar,
      idPerson: dataRowPerson?.idPerson,
    };
    dispatch(deleteCarInPerson(body));
  };
  const handleRandomNumber = () => {
    const randomIndex = Math.floor(Math.random() * listLicensePlates.length);
    const updatedLicensePlates = listLicensePlates.slice();
    const randomValue = updatedLicensePlates.splice(randomIndex, 1)[0];
    setLicensePlates(randomValue);

    dispatch(updateListLicensePlates(updatedLicensePlates));
  };
  const handleDialogRegisterCar = () => {
    let temp: PersonModel | undefined = cloneDeep(dataRowPerson);
    let existCar = temp?.hasCar.find(
      (itemCar) => itemCar.id === carToPerson?.id
    );
    if (carToPerson && temp) {
      const body = {
        idPerson: temp?.idPerson,
        carOfPerson: {
          id: carToPerson.id,
          type: carToPerson.type,
          model: carToPerson.model,
          color: carToPerson.color,
          salePrice: carToPerson.salePrice,
          importPrice: carToPerson.importPrice,
          manufacturer: carToPerson.manufacturer,
          numberCar: numberCar!,
          openSale: carToPerson.openSale,
          licensePlates: licensePlates!,
        },
      };
      dispatch(addCarToCart(body));

      dispatch(
        editDistributor({
          idDistributor: distributorName,
          dataCar: {
            id: carToPerson.id,
            type: carToPerson.type,
            model: carToPerson.model,
            color: carToPerson.color,
            salePrice: carToPerson.salePrice,
            importPrice: carToPerson.importPrice,
            manufacturer: carToPerson.manufacturer,
            licensePlates: licensePlates!,
            numberCar: carToPerson.numberCar - numberCar!,
            openSale: carToPerson.openSale,
          },
        })
      );
      setOpenRegisterCar(false);
    }
  };
  const handleCloseDialogRegisterCar = () => {
    setOpenRegisterCar(false);
  };
  const handleChange = (e: SelectChangeEvent) => {
    setDistributorName(e.target.value);
  };
  const handleOpenCart = (person: PersonModel) => {
    setOpenDialogCart(true);
    setPerson(person);
  };
 

  return (
    <>
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
            {dataPerson.map((person: PersonModel) => {
              return (
                <TableRow key={person.idPerson}>
                  <TableCell align="center">{person.lastName}</TableCell>
                  <TableCell align="center">{person.firstName}</TableCell>
                  <TableCell align="center">{person.age}</TableCell>
                  <TableCell align="center">{person?.gender}</TableCell>
                  <TableCell align="center">
                    <span>{person.identification}</span>
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleEditPerson(person)}
                  >
                    <ModeEdit />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleShowDialogCar(person)}
                    >
                      add car to cart
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleOpenCart(person)}
                    >
                      cart
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* begin: dialog person */}
      <Dialog
        maxWidth={"lg"}
        fullWidth={true}
        open={openDialogPerson}
        onClose={handleCancelDiaLogPerson}
      >
        <DialogTitle>edit person</DialogTitle>
        <DialogContent>
          <div className="row pt-4">
            <label className="col-2">First Name</label>
            <input
              value={firstName}
              name="firstName"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              className="col-10"
            />
          </div>
          <div className="row pt-4">
            <label className="col-2">last Name</label>
            <input
              name="lastName"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              className="col-10"
              value={lastName}
            />
          </div>
          <div className="row pt-4">
            <label className="col-2">Tuổi</label>
            <input
              name="age"
              min={1}
              onChange={(e) => {
                setAge(parseInt(e.target.value));
              }}
              type="number"
              className="col-10"
              value={age}
            />
          </div>
          <div className="row pt-4">
            <label className="col-2">Giới Tính</label>
            <select
              name="gender"
              className="col-10"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              {PersonGenderOption.map((gender) => (
                <option>{gender.label}</option>
              ))}
            </select>
          </div>
          <div className="row pt-4">
            <label className="col-2">CCCD</label>
            <input
              name="identification"
              onChange={(e) => {
                setIdentification(e.target.value);
              }}
              type="text"
              className="col-10"
              value={identification}
            />
          </div>
          <div className="row pt-4">
            <div className="col-2">
              <Typography>Xe</Typography>
            </div>
            <div className="col-10">
              {cars?.map(
                (
                  itemCar: CarModel & {
                    kilometer: number;
                    status: boolean;
                  },
                  index
                ) => (
                  <Accordion className="mb-2 border">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <DialogTitle className="py-0 my-0">
                        {itemCar.type}
                      </DialogTitle>
                    </AccordionSummary>
                    <AccordionDetails className="d-flex gap-2">
                      <Typography>Hãng SX: {itemCar.manufacturer},</Typography>
                      <Typography>năm SX: {itemCar.model},</Typography>
                      <Typography>màu xe: {itemCar.color},</Typography>
                      <Typography>Giá: {itemCar.salePrice}</Typography>
                      <Typography>
                        Biển số xe: {itemCar.licensePlates}
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails className="d-flex gap-2">
                      <label>số KM đi được:</label>
                      <input
                        name="numberKilometer"
                        onChange={(e) => {
                          // Cập nhật số km của 1 car (itemCar)
                          let dataItemCar: CarModel & {
                            kilometer: number;
                            status: boolean;
                          } = { ...itemCar };

                          dataItemCar.kilometer = parseInt(e.target.value);

                          let currentListCar: Array<
                            CarModel & {
                              kilometer: number;
                              status: boolean;
                            }
                          > = [...cars];
                          currentListCar[index] = dataItemCar;

                          setCars(currentListCar);
                          // setNumberKilometer(parseInt(e.target.value));
                        }}
                        type="text"
                        className="col-10"
                        value={itemCar.kilometer}
                      />
                    </AccordionDetails>
                    <AccordionDetails className="d-flex flex-row">
                      <div className="me-5">
                        <input
                          type="checkbox"
                          checked={itemCar.status}
                          onChange={(e) => {
                            let dataItemCar: CarModel & {
                              kilometer: number;
                              status: boolean;
                            } = { ...itemCar };

                            dataItemCar.status = e.target.checked;

                            let currentListCar: Array<
                              CarModel & {
                                kilometer: number;
                                status: boolean;
                              }
                            > = [...cars];
                            currentListCar[index] = dataItemCar;

                            setCars(currentListCar);
                          }}
                        />
                        <label>Sử Dụng</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          checked={!itemCar.status}
                          onChange={(e) => {
                            let dataItemCar: CarModel & {
                              kilometer: number;
                              status: boolean;
                            } = { ...itemCar };

                            dataItemCar.status = !e.target.checked;
                            let currentListCar: Array<
                              CarModel & {
                                kilometer: number;
                                status: boolean;
                              }
                            > = [...cars];
                            currentListCar[index] = dataItemCar;

                            setCars(currentListCar);
                          }}
                        />
                        <label>Không sử dụng</label>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails className="float-end">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleCar(itemCar.id)}
                      >
                        Delete
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                )
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitPerson}>update person</Button>
        </DialogActions>
      </Dialog>
      {/* end: dialog person */}

      {/* begin: dialog table car */}
      <Dialog
        maxWidth={"lg"}
        fullWidth={true}
        open={openDialogTableCar}
        onClose={handleCancelDiaLogTableCar}
      >
        <FormControl className="ms-5 me-5 mt-5">
          <InputLabel id="demo-simple-select-label">Distributor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={distributorName}
            label="Distributor"
            onChange={handleChange}
          >
            {distributor.map(
              (
                item: { idDistributor: string; tableCar: Array<CarModel> },
                index
              ) => (
                <MenuItem value={item.idDistributor}>
                  DISTRIBUTOR {index + 1}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
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
              {distributor
                .find((item) => item.idDistributor === distributorName)
                ?.tableCar.filter((car) => car.openSale === true)
                .map((row: CarModel) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.model}</TableCell>
                      <TableCell align="center">{row.color}</TableCell>
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
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => handleAddCarToPerson(row)}
                        >
                          add car
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
      {/* end: dialog table car */}
      {/* add car */}
      <Dialog
        open={openRegisterCar}
        onClose={handleCloseDialogRegisterCar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" className="text-center">
          Đăng ký xe
        </DialogTitle>
        <DialogContent>
          <div className="mb-3 d-flex flex-column">
            <label className="">số lượng xe mua </label>
            <input
              name="numberCar"
              onChange={(e) => {
                setNumberCar(Number(e.target.value));
              }}
              type="text"
              className=""
            />
            {carToPerson && carToPerson?.numberCar === 0 && (
              <span className="text-danger col-9 ps-0" style={{ fontSize: 14 }}>
                đã không còn xe để mua
              </span>
            )}
            {carToPerson && numberCar! > carToPerson?.numberCar && (
              <span className="text-danger col-9 ps-0" style={{ fontSize: 14 }}>
                không đủ số lượng xe mà bạn muốn
              </span>
            )}
          </div>
          <DialogContentText
            id="alert-dialog-description"
            className="text-uppercase fs-5 d-flex"
          >
            <Button
              variant="outlined"
              color="success"
              onClick={handleRandomNumber}
            >
              Quay biển số
            </Button>
            {licensePlates ? (
              <p className="text-danger ms-5 mb-auto mt-auto">
                {licensePlates}
              </p>
            ) : (
              <p>{""}</p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="">
          {(carToPerson && carToPerson?.numberCar === 0) ||
          (carToPerson && numberCar! > carToPerson?.numberCar) ? (
            <Button
              disabled
              variant="outlined"
              color="error"
              onClick={handleDialogRegisterCar}
            >
              đồng ý
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDialogRegisterCar}
            >
              đồng ý
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <DialogCart
        isOpen={openDialogCart}
        handleClose={handleCloseDialogCart}
        personData={person!}
      />
    </>
  );
};
export default TablePerson;
