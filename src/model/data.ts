import {CarModel, EnumPersonGender, PersonModel} from "./ListModel";
import exp from "constants";


export const CarStatusOptions: Array<{
    label: string,
    value: number
}> = [{
    label: 'Xe mới',
    value: 10
},
    {
        label: 'Xe Cũ',
        value: 20
    }]

export const CarData: CarModel[] = [
    {
        id: '1',
        type: 'SUV',
        model: new Date(),
        color: 'red',
        price: '2,5 tỷ',
        status: {
            label: 'Xe Cũ',
            value: 20
        },
        manufacturer: 'ToYoTa',
        identificationPerson: '1234'
    },
    {
        id: '2',
        type: 'Sedan',
        model: new Date(),
        color: 'Yellow',
        price: '1,5 tỷ',
        status:  {
            label: 'Xe mới',
            value: 10
        },
        manufacturer: 'MazDa',
        identificationPerson: '1234'
    },
    {
        id: '3',
        type: 'Coupe',
        model: new Date(),
        color: 'Yellow',
        price: '8,5 tỷ',
        status:  {
            label: 'Xe mới',
            value: 10
        },
        manufacturer: 'Porsche',
        identificationPerson: '99999'
    },
    {
        id: '4',
        type: 'Coupe',
        model: new Date(),
        color: 'Green',
        price: '30 tỷ',
        status:  {
            label: 'Xe mới',
            value: 10
        },
        manufacturer: 'lamborghini aventador',
        identificationPerson: '88888'
    },
    {
        id: '5',
        type: 'SUV',
        model: new Date(),
        color: 'Black',
        price: '15 tỷ',
        status: {
            label: 'Xe mới',
            value: 10
        },
        manufacturer: 'Mercedes-AMG G63',
        identificationPerson: '4567'
    },
    {
        id: '6',
        type: 'sedan',
        model: new Date(),
        color: 'Black',
        price: '1,2 tỷ',
        status:  {
            label: 'Xe mới',
            value: 10
        },
        manufacturer: 'Mercedes c200',
        identificationPerson: '12345'
    },

]
export const DataPerson: PersonModel[] = [
    {
        idPerson:1,
        firstName: 'Mạnh',
        lastName: 'Nguyễn Văn',
        age: 20,
        gender: EnumPersonGender.MALE,
        identification: '1234',
    },
    {
        idPerson:2,
        firstName: 'Tiến',
        lastName: 'Nguyễn Đức',
        age: 22,
        gender: EnumPersonGender.MALE,
        identification: '12345',
    },
    {
        idPerson:3,
        firstName: 'Hương',
        lastName: 'Nguyễn Thu',
        age: 30,
        gender: EnumPersonGender.FEMALE,
        identification: '4567',
    },
    {
        idPerson:3,
        firstName: 'Hằng',
        lastName: 'Nguyễn Thị',
        age: 26,
        gender: EnumPersonGender.FEMALE,
        identification: '99999',
    },
    {
        idPerson:4,
        firstName: 'Anh',
        lastName: 'Nguyễn Đức',
        age: 29,
        gender: EnumPersonGender.MALE,
        identification: '88888',
    }
]

export const DetailCar = {
    id: '1',
    type: 'SUV',
    model: new Date().toLocaleDateString(),
    color: 'red',
    price: '2,5 tỷ',
    status: 'xe mới',
    manufacturer: 'ToYoTa',
    identificationPerson: '1234'
}
