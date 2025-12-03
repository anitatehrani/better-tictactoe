import { InfoService } from './info.service';
import { UpdateInfoRequest } from './interfaces';
import { BaseResponse } from '../interfaces';
import { ExtendedInfoRequest } from './models';
export declare class InfoController {
    private readonly infoService;
    constructor(infoService: InfoService);
    getConfig(bodyRequest: UpdateInfoRequest): Promise<BaseResponse>;
    validateDetails(body: ExtendedInfoRequest): Promise<BaseResponse>;
}
