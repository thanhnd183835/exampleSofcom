export type CarStatusType = {
  label: string;
  value: number;
};
export type PersonGender = {
  label: string;
  value: string;
};
export type CarModel = {
  identificationPerson: string;
  id: string;
  type: string;
  model: any;
  color: string;
  price: string;
  status: number;
  manufacturer: string;
};

export type CarModelFormData = Omit<CarModel, "status"> & {
  status: CarStatusType | null;
};
export type CarFormData = Array<CarModel>; // redux car data

export type PersonModel = {
  idPerson: string;
  firstName: string;
  lastName: string;
  age: number | null;
  gender: string | null;
  identification: string;
  hasCar: Array<CarModel>;
};

export type PersonModelFormData = Omit<PersonModel, "gender"> & {
  gender: PersonGender;
};
export type PersonFormData = Array<PersonModelFormData>;
