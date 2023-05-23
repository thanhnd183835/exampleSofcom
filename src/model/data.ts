import { CarModel, PersonModel } from "./ListModel";
import exp from "constants";
import dayjs from "dayjs";

export const CarStatusOptions: Array<{
  label: string;
  value: number;
}> = [
  {
    label: "Xe mới",
    value: 10,
  },
  {
    label: "Xe Cũ",
    value: 20,
  },
];

export const PersonGenderOption: Array<{
  label: string;
  value: number;
}> = [
  {
    label: "Nam",
    value: 0,
  },
  {
    label: "Nữ",
    value: 1,
  },
];

export const CarData: CarModel[] = [
  {
    id: "1",
    type: "SUV",
    model: dayjs(Date.now()),
    color: "red",
    price: "2,5 tỷ",
    status: {
      label: "Xe Cũ",
      value: 20,
    },
    manufacturer: "ToYoTa",
    identificationPerson: "1234",
  },
  {
    id: "2",
    type: "Sedan",
    model: dayjs(Date.now()),
    color: "Yellow",
    price: "1,5 tỷ",
    status: {
      label: "Xe mới",
      value: 10,
    },
    manufacturer: "MazDa",
    identificationPerson: "1234",
  },
  {
    id: "3",
    type: "Coupe",
    model: dayjs(Date.now()),
    color: "Yellow",
    price: "8,5 tỷ",
    status: {
      label: "Xe mới",
      value: 10,
    },
    manufacturer: "Porsche",
    identificationPerson: "99999",
  },
  {
    id: "4",
    type: "Coupe",
    model: dayjs(Date.now()),
    color: "Green",
    price: "30 tỷ",
    status: {
      label: "Xe mới",
      value: 10,
    },
    manufacturer: "lamborghini aventador",
    identificationPerson: "88888",
  },
  {
    id: "5",
    type: "SUV",
    model: dayjs(Date.now()),
    color: "Black",
    price: "15 tỷ",
    status: {
      label: "Xe mới",
      value: 10,
    },
    manufacturer: "Mercedes-AMG G63",
    identificationPerson: "4567",
  },
  {
    id: "6",
    type: "sedan",
    model: dayjs(Date.now()),
    color: "Black",
    price: "1,2 tỷ",
    status: {
      label: "Xe mới",
      value: 10,
    },
    manufacturer: "Mercedes c200",
    identificationPerson: "12345",
  },
];
export const DataPerson: PersonModel[] = [
  {
    idPerson: 1,
    firstName: "Mạnh",
    lastName: "Nguyễn Văn",
    age: 20,
    gender: {
      label: "Nam",
      value: 0,
    },
    identification: "1234",
    hasCar: null,
  },
  {
    idPerson: 2,
    firstName: "Tiến",
    lastName: "Nguyễn Đức",
    age: 22,
    gender: {
      label: "Nam",
      value: 0,
    },
    identification: "12345",
    hasCar: [
      {
        id: "1",
        type: "SUV",
        model: dayjs(Date.now()),
        color: "red",
        price: "2,5 tỷ",
        status: {
          label: "Xe Cũ",
          value: 20,
        },
        manufacturer: "ToYoTa",
        identificationPerson: "1234",
        km: 2000,
        using: true,
      },
      {
        id: "3",
        type: "Coupe",
        model: dayjs(Date.now()),
        color: "Yellow",
        price: "8,5 tỷ",
        status: {
          label: "Xe mới",
          value: 10,
        },
        manufacturer: "Porsche",
        identificationPerson: "99999",
        km: 3000,
        using: true,
      },
    ],
  },
  {
    idPerson: 3,
    firstName: "Hương",
    lastName: "Nguyễn Thu",
    age: 30,
    gender: {
      label: "Nữ",
      value: 1,
    },
    identification: "4567",
    hasCar: [
      {
        id: "6",
        type: "sedan",
        model: dayjs(Date.now()),
        color: "Black",
        price: "1,2 tỷ",
        status: {
          label: "Xe mới",
          value: 10,
        },
        manufacturer: "Mercedes c200",
        identificationPerson: "12345",
        km: 1000,
        using: false,
      },
      {
        id: "4",
        type: "Coupe",
        model: dayjs(Date.now()),
        color: "Green",
        price: "30 tỷ",
        status: {
          label: "Xe mới",
          value: 10,
        },
        manufacturer: "lamborghini aventador",
        identificationPerson: "88888",
        km: 5000,
        using: true,
      },
    ],
  },
  {
    idPerson: 3,
    firstName: "Hằng",
    lastName: "Nguyễn Thị",
    age: 26,
    gender: {
      label: "Nữ",
      value: 1,
    },
    identification: "99999",
    hasCar: [
      {
        id: "4",
        type: "Coupe",
        model: dayjs(Date.now()),
        color: "Green",
        price: "30 tỷ",
        status: {
          label: "Xe mới",
          value: 10,
        },
        manufacturer: "lamborghini aventador",
        identificationPerson: "88888",
        km: 100000,
        using: false,
      },
    ],
  },
  {
    idPerson: 4,
    firstName: "Anh",
    lastName: "Nguyễn Đức",
    age: 29,
    gender: {
      label: "Nam",
      value: 0,
    },
    identification: "88888",
    hasCar: [
      {
        id: "6",
        type: "sedan",
        model: dayjs(Date.now()),
        color: "Black",
        price: "1,2 tỷ",
        status: {
          label: "Xe mới",
          value: 10,
        },
        manufacturer: "Mercedes c200",
        identificationPerson: "12345",
        km: 900000,
        using: true,
      },
      {
        id: "2",
        type: "Sedan",
        model: dayjs(Date.now()),
        color: "Yellow",
        price: "1,5 tỷ",
        status: {
          label: "Xe mới",
          value: 10,
        },
        manufacturer: "MazDa",
        identificationPerson: "1234",
        km: 65000,
        using: false,
      },
    ],
  },
];

export const DetailCar = {
  id: "1",
  type: "SUV",
  model: new Date().toLocaleDateString(),
  color: "red",
  price: "2,5 tỷ",
  status: "xe mới",
  manufacturer: "ToYoTa",
  identificationPerson: "1234",
};
