export interface Employees {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  phone: number;
  address: Address;
}

export interface Address {
  city: string;
  zip: string;
  street: string;
  number: string;
}
