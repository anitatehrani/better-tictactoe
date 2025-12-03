import { UpdateInfoRequest as UpdateInfoRequestInterface } from './interfaces';
import { BaseResponse } from '../interfaces';
import { ExtendedInfoRequest } from './models';
export declare class InfoService {
    validateInfo(rawData: UpdateInfoRequestInterface): Promise<BaseResponse>;
    validateExtendedInfo(rawData: ExtendedInfoRequest): Promise<BaseResponse>;
}
