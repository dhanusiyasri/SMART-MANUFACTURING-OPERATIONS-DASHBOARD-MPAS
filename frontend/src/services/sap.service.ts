import { axiosClient } from '../api/axiosClient.js';
import { ISAPSequencePlanRecord } from '../interfaces/dashboard.interface.js';
import { ApiResponseWrapper } from './dashboard.service.js';

export class SapService {
  /**
   * Fetches SAP sequence plans
   */
  public async getSequencePlans(limit: number = 20): Promise<ApiResponseWrapper<ISAPSequencePlanRecord[]>> {
    return await axiosClient.get<unknown, ApiResponseWrapper<ISAPSequencePlanRecord[]>>(`/dashboard/sequence-plans`, {
      params: { limit }
    });
  }
}

export const sapService = new SapService();
