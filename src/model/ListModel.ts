import dayjs from "dayjs";

export type CarStatusType = {
  label: string;
  value: number;
};
export type PersonGender = {
  label: string;
  value: number;
};
export type CarModel = {
  identificationPerson: string;
  id: string;
  type: string;
  model: any;
  color: string;
  price: string;
  status: CarStatusType | null;
  manufacturer: string;
};

export type CarModelFormData = Omit<CarModel, "status"> & {
  status: number | null;
};
export type PersonModel = {
  idPerson: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: PersonGender;
  identification: string;
  hasCar: Array<
    CarModel & {
      km: number;
      using: boolean;
    }
  > | null;
};

export type PersonModelFormData = Omit<PersonModel, "gender"> & {
  gender: number | null;
};
