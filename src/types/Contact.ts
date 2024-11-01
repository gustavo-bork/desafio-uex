export type Contact = {
  name: string;
  cpf: string;
  telephone: string;
  address: Address;
}

export type Address = {
  street: string;
  number: number;
  neighborhood: string;
  cep: string;
  complement: string | null;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
}
