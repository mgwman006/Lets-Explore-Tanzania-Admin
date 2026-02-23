
import { Button, Col, Progress, Row, Image, Layout, Menu, Drawer, Typography, Flex, Card, notification, Statistic } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPrivateTours} from '../services/privateTourService';
import { OperatorDetails } from '../models/operator';
import { getOperator } from '../services/userService';
import { useUserContext } from '../contexts/UserContext';
import { getToursByOperatorId } from '../services/tourOperatorService';
import { UserStatus } from '../models/auth';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function WelcomePage() {

    const navigate = useNavigate();
    const [tours, setTours] = useState<TourListItemDto[]>([]);
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    const { userStatus, user, operator} = useUserContext(); // Get user status and login state from context
    

    const openNotificationWithIcon = (type: NotificationType, message:string) => {
        notificationApi[type]({
        message: `${message}`
        });
    };

    useEffect(() => {

        if(userStatus === UserStatus.Unknown) return;
        if(userStatus === UserStatus.LoggedOut)
        {
            navigate("/auth");
        }

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
    }, [userStatus]);

    return(
        <div>
            {notificationContextHolder}
            <Row
                justify={'center'}
                align={'middle'}
            >
                <Col xs={24} sm={6} lg={6} xl={6} xxl={6}>
                    
                    <Card 
                        style={
                            { 
                                backgroundColor:"#0a3b8a",
                                color:"white"
                            }
                        }>
                        <Statistic 
                            
                            title={<p style={{color:"white"}}>Number of Tours</p>}
                            valueStyle={{ color: 'white' }}
                            value={tours.length} 
                        />
                        
                        <Button color='green' variant='outlined' onClick={() => navigate('tours')}>Manage <RightOutlined /></Button>

                    </Card>
                    
                </Col>
            </Row>

        </div>
        
    )
    ;

}