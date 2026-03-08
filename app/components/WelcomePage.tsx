
import { Button, Col, Progress, Row, Image, Layout, Menu, Drawer, Typography, Flex, Card, notification, Statistic } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { UserStatus } from '../models/auth';


export default function WelcomePage() {

    const navigate = useNavigate();
    const { userStatus, user, operator} = useUserContext(); // Get user status and login state from context
    

    useEffect(() => {

        if(userStatus === UserStatus.Unknown) return;
        if(userStatus === UserStatus.LoggedOut)
        {
            navigate("/auth");
        }
    }, [userStatus]);

    return(
        <div>
            <Row
                justify={'center'}
                align={'middle'}
            >
                <Col xs={24} sm={6} lg={6} xl={6} xxl={6}>
                    
                    <Card 
                        onClick={() => navigate('tours')}
                        style={
                            { 
                                backgroundColor:"#0a3b8a",
                                color:"white"
                            }
                        }>
                        <Statistic 
                            
                            title={<p style={{color:"white"}}>Your Tours</p>}
                            valueStyle={{ color: 'white' }}
                            value={operator?.numberOfTours??0} 
                        />
                        
                    </Card>
                    
                </Col>
                <Col xs={24} sm={6} lg={6} xl={6} xxl={6}>
                    
                    <Card 
                        onClick={() => navigate('bookings')}
                        style={
                            { 
                                backgroundColor:"#0a3b8a",
                                color:"white"
                            }
                        }>
                        <Statistic 
                            
                            title={<p style={{color:"white"}}>Total Bookings</p>}
                            valueStyle={{ color: 'white' }}
                            value={operator?.numberOfBookings??0} 
                        />
                    </Card>
                    
                </Col>
            </Row>

        </div>
        
    )
    ;

}