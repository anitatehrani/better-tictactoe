import { UpdateInfoRequest as UpdateInfoRequestInterface } from '../interfaces';
export declare class UpdateInfoRequest implements UpdateInfoRequestInterface {
    name: string;
}
export declare class ExtendedInfoRequest {
    name: string;
    age: number;
    married?: boolean;
    dateOfBirth: string;
}
