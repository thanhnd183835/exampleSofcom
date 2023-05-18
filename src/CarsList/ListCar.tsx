import React, {useState, useEffect} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField
} from '@material-ui/core';
import {Button, SelectChangeEvent, TableHead} from "@mui/material";
import {CarData, CarStatusOptions, DataPerson} from "../model/data";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ModeEdit from '@mui/icons-material/ModeEdit';
import {DatePicker} from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {CarModel, CarModelFormData, PersonModel} from "../model/ListModel";
import {Controller, useForm} from 'react-hook-form';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {FieldPathValue, Noop, RefCallBack} from "react-hook-form/dist/types";
import 'dayjs/locale/en';
import moment from 'moment';

const columnsCar = [
    {id: "type", label: "Loại xe", align: "center"},
    {id: "model", label: "Năm sản xuất", align: "center"},
    {id: "color", label: "Màu xe", align: "center"},
    {id: "price", label: "Giá", align: "center"},
    {id: "status", label: "Tình trạng", align: "center"},
    {id: "manufacturer", label: "Hãng sản xuất", align: "center"},
    {id: "editCar", label: "Sửa", align: "center"},
    {id: "deleteCar", label: "Xóa", align: "center"},

];
// firstName: string,
//     lastName: string,
//     age: number,
//     gender: EnumPersonGender,
//     identification: string
const columnsPerson = [
    {id: "lastName", label: "Họ", align: "center"},
    {id: "firstName", label: 'Tên Đệm, Tên', align: "center"},
    {id: "age", label: "Tuổi", align: "center"},
    {id: "gender", label: "Giới tính", align: "center"},
    {id: "identification", label: "CCCD", align: "center"},
    {id: "editPerSon", label: "Sửa", align: "center"},
    {id: "deletePerSon", label: "Xóa", align: "center"},
]
const ListCar = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [status, setStatus] = React.useState('');
    const {handleSubmit, reset, control, watch, setValue, getValues} = useForm<CarModelFormData>({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        criteriaMode: 'firstError',
        shouldFocusError: true,
        defaultValues: {}
    });
    console.log(new Date().toLocaleDateString())
    const handleDeleteCar = (id: string) => {
        console.log(id);
    };
    const handleDeletePerson = () => {

    }
    const handleEditPerson = () => {
    }
    const handleEditCar = (car: CarModel) => {
        setOpenDialog(true);

        let formCarReset: CarModelFormData = {
            type: car.type,
            // model: car.model,
            color: car.color,
            price: car.price,
            status: car && car.status ? car.status.value : null,
            manufacturer: car.manufacturer,
            id: car.id,
            identificationPerson: car.identificationPerson,
            model: new Date()

        };
        // CarData.filter((car: CarModel) => car.id === id ? formCarReset = {
        //     type: car.type,
        //     model: car.model,
        //     color: car.color,
        //     price: car.price,
        //     status: car?.status?.value || null,
        //     manufacturer: car.manufacturer,
        //     id: car.id,
        //     identificationPerson: car.identificationPerson
        // } : '');

        reset(formCarReset);

    }
    const handleCancelDiaLog = () => {
        setOpenDialog(false)
    }

    const submit = (data: CarModelFormData) => {
        console.log(data)
    }
    const validationRules = {
        model: {
            validate: (val: Dayjs | null) => {
                if (val === null) {
                    return 'Please input the deadline';
                }
                if (!val.format('YYYY/MM/DD').match(/^\d{8}$/g)) {
                    return 'Invalid date format';
                }
                return true;
            },
        },
    };
    // @ts-ignore
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columnsCar.map(headCell => {
                                return (
                                    <TableCell key={headCell.id} align={"center"}>{headCell.label}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {CarData.map((row: CarModel) => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.type}</TableCell>
                                    <TableCell align="center">{row.model.toLocaleDateString()}</TableCell>
                                    <TableCell align="center">{row.color}</TableCell>
                                    <TableCell align="center">{row.price}</TableCell>
                                    <TableCell
                                        align="center"><span>{row.status ? row.status.label : ''}</span></TableCell>
                                    <TableCell align="center">{row.manufacturer}</TableCell>
                                    <TableCell align="center"
                                               onClick={() => handleEditCar(row)}><ModeEdit/>
                                    </TableCell>
                                    <TableCell align="center" onClick={() => handleDeleteCar(row.id)}>
                                        <DeleteForeverIcon/>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer className='pt-5'>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columnsPerson.map(headPerson => (
                                <TableCell key={headPerson.id} align='center'>{headPerson.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DataPerson.map((person: PersonModel) => {
                            return (
                                <TableRow key={person.idPerson}>
                                    <TableCell align="center">{person.firstName}</TableCell>
                                    <TableCell align="center">{person.lastName}</TableCell>
                                    <TableCell align="center">{person.age}</TableCell>
                                    <TableCell align="center">{person.gender}</TableCell>
                                    <TableCell
                                        align="center"><span>{person.identification}</span></TableCell>
                                    <TableCell align="center"
                                               onClick={() => handleDeletePerson()}><ModeEdit/></TableCell>
                                    <TableCell align="center" onClick={() => handleEditPerson()}>
                                        <DeleteForeverIcon/>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                openDialog && (
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
                                    render={({field}) => <TextField {...field} id="type" label="Loại xe"
                                                                    variant="outlined"
                                                                    className="pb-3"
                                                                    size="small"
                                    />
                                    }
                                    control={control}
                                />

                                <Controller
                                    name="model"
                                    render={({field}) =>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker  label="Uncontrolled picker"  {...field} />

                                        </LocalizationProvider>
                                    }
                                    control={control}
                                />
                                <Controller
                                    name="color"
                                    render={({field}) => <TextField {...field} id="color" label="Màu xe"
                                                                    variant="outlined"
                                                                    className="r pb-3"
                                                                    size="small"
                                    />
                                    }
                                    control={control}
                                />
                                <Controller
                                    name="price"
                                    render={({field}) => <TextField {...field} id="price" label="Giá" variant="outlined"
                                                                    className=" pb-3"
                                                                    size="small"
                                    />
                                    }
                                    control={control}
                                />
                                <Controller
                                    name="status"
                                    render={({field}) =>
                                        <FormControl fullWidth className="pb-3">
                                            <InputLabel id="demo-simple-select-label">Tình trạng</InputLabel>
                                            <Select
                                                {...field}
                                                label={'Tình Trạng'}
                                                variant='outlined'
                                            >
                                                {
                                                    CarStatusOptions.map((status, index) => {
                                                        return <MenuItem value={status.value}
                                                                         key={status.value}>{status.label}
                                                        </MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    }
                                    control={control}
                                />
                                <Controller
                                    name="manufacturer"
                                    render={({field}) => <TextField {...field} id="manufacturer" label="Hãng sản xuất"
                                                                    variant="outlined"
                                                                    className=" pb-3" size="small"
                                    />
                                    }
                                    control={control}
                                />
                                <DialogActions>
                                    <button autoFocus onClick={handleCancelDiaLog}>
                                        Hủy
                                    </button>
                                    <button autoFocus>
                                        Cập Nhật
                                    </button>
                                </DialogActions>
                            </form>
                        </DialogContent>

                    </Dialog>
                )
            }
        </>
    );
}
export default ListCar;