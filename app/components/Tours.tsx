import { List, Avatar, Image, Card, Row, Col, Button, Popconfirm, PopconfirmProps, notification, Modal, Breadcrumb, Tag } from "antd";
import { useEffect, useState } from "react";
import { StarOutlined, LikeOutlined, MessageOutlined, SettingOutlined, EditOutlined, EllipsisOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { getPrivateTours, deteleTour } from "../services/privateTourService";
import { useNavigate } from "react-router-dom";
import { getToursByOperatorId } from "../services/tourOperatorService";
import { useUserContext } from "../contexts/UserContext";
import { UserStatus } from "../models/auth";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export default function AdminTours()
{

    const navigate = useNavigate();
    const [tours, setTours] = useState<TourListItemDto[]>([]);
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    const {userStatus, operator } = useUserContext();

    const openNotificationWithIcon = (type: NotificationType, message:string) => {
        notificationApi[type]({
        message: `${message}`
        });
    };

    const getLatestTourData = () =>
    {
        
        getToursByOperatorId(operator?.id ?? 0).then(
            (apiResponse) => {
                if(apiResponse?.success)
                {
                    setTours(apiResponse.data);
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
        getLatestTourData();
        
    }, [userStatus]);

    // Ensure the handler matches Popconfirm's onConfirm signature
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
                                getLatestTourData();
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
   

   
    const handleMoreTourDetails = (tourId: number) => {
        navigate(`/tours/${tourId}`);
    }

    return(
        <div>
            {notificationContextHolder}

            <div>
                 <List
                    header={
                        <Button 
                            onClick={() => navigate("addtour")} 
                            variant="solid" 
                            color="blue">Add New Tour <PlusOutlined />
                        </Button>
                    }
                    grid={{
                    gutter: 5,
                    xs: 1,
                    sm: 4,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
                    }}
                    style={{
                        backgroundColor:"",
                        padding:"10px"
                    }}
                    dataSource={tours}
        
                    renderItem={(item) => (

                        <List.Item
                            key={item.title}

                            
                        >
                            <Card
                                cover={
                                    <Image
                                        preview={false}
                                        alt="example"
                                        src={item.bannerImageUrl}
                                        fallback="../listfallbackimage.png"
                                        height="200px"
                                        width="100%"
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    />
                                }
                                actions={[
                                    <Popconfirm
                                        key={item.id}
                                        onConfirm={() => handleDeleteTour(item.id)}
                                        title={item.title}
                                        description="Are you sure to delete this Tour?"
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined key="setting" />
                                    </Popconfirm>,
                                    <EditOutlined key="edit" onClick={() => handleMoreTourDetails(item.id)}/>
                                    
                                ]}
                            >
                                <Meta
                                    title={item.title}
                                    description={<Tag color={item.isLive?"success":"warning"}>{ item.isLive ? "live" :"Not Live"}</Tag>}
                                />
                            </Card>
                        </List.Item>
                    
                    )}
            />
            </div>      
           
        </div>
    );
}