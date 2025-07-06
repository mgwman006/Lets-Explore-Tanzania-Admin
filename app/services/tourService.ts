import api from "../api/api";
import { ApiResponse } from "../models/common/apiresponse";

export const getTours = async () => {

    try {
        const response = await api.get<ApiResponse<TourListItemDto[]>>('/tour/private');
        return response.data;
    } catch (error) {
        const data : ApiResponse<TourListItemDto[]> = {
        success: false,
        message: typeof error === 'string' ? error : error instanceof Error ? error.message : JSON.stringify(error),
        data: [],
        statusCode: 0
      }
      return data;
    }
  
};