import api from '../api/api';
import { LogInDetails, User } from '../models/auth';
import { ApiResponse } from '../models/common/apiresponse';

export const login = async (logInDetails: LogInDetails): Promise<ApiResponse<User>> => {
    try {
        const response = await api.post<ApiResponse<User>>('/auth/login', logInDetails);
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
                passWord:"",
                userType:""
            },
            statusCode
        };
    }
};
