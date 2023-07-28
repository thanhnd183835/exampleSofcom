export type CarStatusType = {
  label: string;
  value: number;
};
export type PersonGender = {
  label: string;
  value: string;
};
export type CarModel = {
  id: string;
  type: string;
  model: any;
  color: string;
  importPrice: number;
  salePrice: number;
  manufacturer: string;
  openSale: boolean;
  licensePlates: number; // biển số xe
  numberCar: number;
};
export type Distributor = {
  idDistributor: string;
  tableCar: Array<CarModel>;
};
export type Cart = {
  idPerson: string;
  carOfPerson: Array<CarModel> | CarModel;
};
export type DistributorFormData = Array<Distributor>; // redux car data

export type CarModelFormData = Omit<CarModel, "status"> & {
  status: CarStatusType | null;
};
export type CarFormData = Array<CarModel>; // redux car data
export type CartFormData = Array<Cart>;
export type PersonModel = {
  idPerson: string;
  firstName: string;
  lastName: string;
  age: number | undefined;
  gender: string | null;
  identification: string;
  hasCar: Array<
    CarModel & {
      kilometer: number;
      status: boolean;
    }
  >;
};
export type InfoDis = {
  nameDis: string;
  addressDis: string;
  email: string;
  phoneNumber: number;
};
export type PersonModelFormData = Omit<PersonModel, "gender"> & {
  gender: PersonGender | undefined;
};
export type PersonFormData = Array<PersonModel>;
//  tách view cho từng đối tượng,
// giá tiền đổi thành số,
// xe ở sub thành xe có số lượng,
// sẽ có nhiều đại lý,
// đảm bảo biển số không bh dc trùng,
// cùng 1 xe nhập nhiều lần x
// nhập xe cho person: trọn đại lý trc rồi lấy xe của đại lý đó
// chi tiết của một đại lý
// đại lý và person đều nhập được nhiều xe cùng 1 lúc( person có thể mua xe từ nhiều đại lý  khác nhau trong 1 lần)

// sub thêm dc xe
// bien so
// nhập thông tin dl  
// thêm giá nhập giá bán
// xe ve 0 không cho nhập (distri...)
// thêm xe vao gio hang trc (CRUD)
// gia ban p co ms cho active
