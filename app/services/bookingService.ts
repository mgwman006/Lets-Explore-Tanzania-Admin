import api from "../api/api";
import BookingDetails from "../models/booking";
import { ApiResponse } from "../models/common/apiresponse";

export const getBookingrDetails = async (tourId: number) => {
  
    try {
        const response = await api.get<ApiResponse<BookingDetails>>(`/tour/booking/${tourId}`);
        return response.data;
      
    } catch (error) {
      const data : ApiResponse<BookingDetails> = {
        success: false,
        message: typeof error === 'string' ? error : error instanceof Error ? error.message : JSON.stringify(error),
        data: {
            id:0,
            touristId:0,
            customerName:"",
            email:"",
            phoneNumber:"",
            pricePerPerson:0,
            numberOfPeople:0,
            totalPrice:0,
            tourDate:"",
            specialRequests:"",
            status:"",
            referenceNumber:""
        },
        statusCode: 0
      }
      return data;

    }
};

    