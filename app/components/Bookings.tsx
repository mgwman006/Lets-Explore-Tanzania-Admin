import { List, Avatar, Image, Card, Row, Col, Button, Popconfirm, PopconfirmProps, notification, Modal, Breadcrumb, Tag } from "antd";
import { useEffect, useState } from "react";
import { StarOutlined, LikeOutlined, MessageOutlined, SettingOutlined, EditOutlined, EllipsisOutlined, DeleteOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { getPrivateTours, deteleTour } from "../services/privateTourService";
import { useNavigate } from "react-router-dom";
import { getBookingsByOperatorId, getToursByOperatorId } from "../services/tourOperatorService";
import { useUserContext } from "../contexts/UserContext";
import { UserStatus } from "../models/auth";
import BookingDetails from "../models/booking";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export default function Bookings()
{

    const navigate = useNavigate();
    const [bookings, setBookings] = useState<BookingDetails[]>([]);
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    const {userStatus, operator } = useUserContext();

    const openNotificationWithIcon = (type: NotificationType, message:string) => {
        notificationApi[type]({
        message: `${message}`
        });
    };

    const getLatestBookingData = () =>
    {
        
        getBookingsByOperatorId(operator?.id ?? 0).then(
            (apiResponse) => {
                if(apiResponse?.success)
                {
                    setBookings(apiResponse.data);
                }
                else
                {
                    openNotificationWithIcon("error", apiResponse?.message || "An unknown error occurred");
                }
            }
        );
    }

    useEffect(() => {

        if(userStatus === UserStatus.Unknown) return;
        if(userStatus === UserStatus.LoggedOut) navigate("/auth");
        getLatestBookingData();
        
    }, [userStatus]);

    const handleDeleteTour = (tourId: number) => 
        new Promise((resolve) => 
        {
            setTimeout(
                () =>
                {
                    deteleTour(tourId).then(
                        (apiResponse) =>
                        {
                            if(apiResponse.success)
                            {
                                getLatestBookingData();
                                openNotificationWithIcon("success","Deleted Successfully")
                            }
                            else
                            {
                                alert(apiResponse.message);
                            }
                        }
                    );

                    resolve(null);
                    
                }
                    , 
                1000
            );
        }
    ); 
   
   
    const handleBookingDetails = (bookingId: number) => {
        navigate(`/bookings/${bookingId}`);
    }

    return(
        <Row gutter={[16, 10]} justify={'center'} align={'middle'} style={{padding:10}}>
            {notificationContextHolder}
            {bookings.map((booking) => (
                <Col xs={22} sm={20} md={6} lg={6} xl={6} key={booking.id}>
                    <Card
                        actions={[
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis"  onClick={() => handleBookingDetails(booking.id)}/>,
                        ]} 
                    >
                        <Meta 
                            avatar={<UserOutlined />}
                            title={booking.customerName} 
                            description={booking.email}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
}