import api from '../api/api';
import { ApiResponse } from '../models/common/apiresponse';
import { OperatorDetails } from '../models/operator';

export const getOperator = async (userId: number): Promise<ApiResponse<OperatorDetails>> => {
    try {
        const response = await api.get<ApiResponse<OperatorDetails>>(`/user/${userId}/operator`);
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
                email: "",
                firstName:"",
                lastName:"",
                phone:""
            },
            statusCode
        };
    }
};
