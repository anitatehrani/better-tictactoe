export interface UpdateInfoRequest {
  name: string;
}

export interface ExtendedInfoRequest {
  name: string;
  age: number;
  married?: boolean;
  dateOfBirth: string;
}
