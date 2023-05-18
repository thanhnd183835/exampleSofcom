export enum EnumPersonGender {
    MALE,// Nam
    FEMALE,// Nu
}

export type CarStatusType ={
    label: string,
    value: number
}

export type CarModel = {
    identificationPerson:string,
    id: string,
    type: string,
    model: any,
    color: string,
    price: string,
    status:  CarStatusType | null,
    manufacturer: string
};

export type CarModelFormData = Omit<CarModel, 'status'> & {
    status: number | null,
};
export type PersonModel = {
    idPerson: number,
    firstName: string,
    lastName: string,
    age: number,
    gender: EnumPersonGender,
    identification: string
}



