import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumb, Button, Card, Col, Image, List, Row, Statistic, Tabs, TabsProps, Typography, Table, Flex, Modal, Form, notification, Input, InputNumber, Select, Upload, UploadProps, Alert, Popconfirm, DatePicker, Tag, UploadFile } from 'antd';
import Meta from "antd/es/card/Meta";
import { CalendarFilled, CalendarOutlined, CalendarTwoTone, ClockCircleFilled, ClockCircleTwoTone, DeleteColumnOutlined, DeleteOutlined, DeleteRowOutlined, EnvironmentOutlined, EnvironmentTwoTone, ExclamationCircleOutlined, FieldTimeOutlined, LikeOutlined, MoneyCollectTwoTone, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { addEndOfTourInformation, addPickUpInformation, addTourActivity, addTourPrices, deleteTourPrice, getCurrencies, getDestinations, getPrivateTourDetails, getTourGuideDetails, postPrivateTour, updatePrivateTour } from "../services/privateTourService";
import TextArea from "antd/es/input/TextArea";
import ImgCrop from "antd-img-crop";
import { getBookingrDetails } from "../services/bookingService";
import BookingDetailsDTO from "../models/booking";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function BookingDetails()
{
    const { bookingId } = useParams();
    const [bookingDetails, setBookingDetails] = useState<BookingDetailsDTO>();
    const [apiNotification, notificationContextHolder] = notification.useNotification();
 
    


  
    const openNotificationWithIcon = (type: NotificationType, message:string) => {
        apiNotification[type]({
        message: `${message}`,
        });
    };



    useEffect(() => {
        getBookingrDetails(Number(bookingId))
            .then((apiResponse) => {
                if (apiResponse.success) {
                    setBookingDetails(apiResponse.data);
                } else {
                    console.error("Failed to fetch tour details:", apiResponse.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching tour details:", error);
            });
                
    }, []);




    return(
        <div
        >
            {notificationContextHolder}
           <h1 style={{textAlign:'center'}}>Work In Progress: {bookingDetails?.customerName ?? 'Unknown'}</h1>

        </div>
    );
}