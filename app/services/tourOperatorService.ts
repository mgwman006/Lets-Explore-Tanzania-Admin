import { data } from 'react-router';
import api from '../api/api';
import { AddOperator, CreatedOperator } from '../models/operator';
import { ApiResponse } from '../models/common/apiresponse';

export const registerOperator = async (operatorData: AddOperator): Promise<ApiResponse<CreatedOperator>> => {
    try {
        const response = await api.post<ApiResponse<CreatedOperator>>('/operator', operatorData);
        return response.data;
    } catch (error: any) {
        let message = "An unexpected error occurred";
        let statusCode = 0;
        if (error.response) {
            message = JSON.stringify(error.response.data) || "Registration failed";
            statusCode = error.response.status;
        } else if (error.request) {
            message = "No response from server";
        } else if (error.message) {
            message = error.message;
        }

        return {
            success: false,
            message,
            data: {
                id: 0,
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            },
            statusCode
        };
    }
};

export const getToursByOperatorId = async (operatorId: number): Promise<ApiResponse<TourListItemDto[]>> => {
    try {
        const response = await api.get<ApiResponse<TourListItemDto[]>>(`/operator/${operatorId}/tours`);
        return response.data;
    } catch (error: any) {
        let message = "An unexpected error occurred";
        let statusCode = 0;
        if (error.response) {
            message = JSON.stringify(error.response.data) || "failed";
            statusCode = error.response.status;
        } else if (error.request) {
            message = "No response from server";
        } else if (error.message) {
            message = error.message;
        }

        return {
            success: false,
            message,
            data: [],
            statusCode
        };
    }
};

export const addPrivateTour = async (operatorId:number,userData: FormData) => {
  try {

    const response = await api.post<ApiResponse<PrivateTourCreatedDto>>(
        `/operator/${operatorId}/tour/private`, userData,
        {
            headers: {'Content-Type': 'multipart/form-data'},
        }
    );
    return response.data;

    
  } catch (error) {
    const data : ApiResponse<PrivateTourCreatedDto> = {
      success: false,
      message: typeof error === 'string' ? error : error instanceof Error ? error.message : JSON.stringify(error),
      data: {
          id:0,
          tourGuideId:0,
          title:"",
          overView:"",
          durationDays:0,
          bannerImageUrl:"",
          destinations:[]
      },
      statusCode: 0
    }
    return data;
  }
};
