import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateInfoRequest as UpdateInfoRequestInterface } from './interfaces';
import { BaseResponse } from '../interfaces';
import {
  ExtendedInfoRequest,
  ExtendedInfoRequest as ExtendedInfoRequestModel,
  UpdateInfoRequest,
} from './models';

@Injectable()
export class InfoService {
  async validateInfo(
    rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateInfoRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data,
    };
  }

  async validateExtendedInfo(
    rawData: ExtendedInfoRequest,
  ): Promise<BaseResponse> {
    const data = plainToClass(ExtendedInfoRequestModel, rawData);
    const errors = await validate(data);

    if (errors.length > 0) {
      return { success: false, errors };
    }

    if (data.age > 18 && data.married === undefined) {
      return {
        success: false,
        errors: [
          {
            property: 'married',
            constraints: { required: 'married is required when age > 18' },
          },
        ],
      };
    }

    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    let computedAge = today.getFullYear() - dob.getFullYear();

    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      computedAge--;
    }

    if (computedAge !== data.age) {
      return {
        success: false,
        errors: [
          {
            property: 'dateOfBirth',
            constraints: {
              ageMismatch: 'dateOfBirth is not consistent with age',
            },
          },
        ],
      };
    }

    return { success: true, data };
  }
}
