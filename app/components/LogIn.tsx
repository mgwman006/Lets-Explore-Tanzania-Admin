import { Button, Checkbox, Col, Flex, Form, Input, Row, Image, notification } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { useState } from "react";
import { LogInDetails, UserStatus } from "../models/auth";
import { useUserContext } from "../contexts/UserContext";
import { login } from "../services/authService";
import { getOperator } from "../services/userService";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function LogIn()
{
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm<LogInDetails>();
    const [apiNotification, notificationContextHolder] = notification.useNotification();
    const { userStatus, user, setUser, setUserStatus, setOperator} = useUserContext(); // Get user status and login state from context
    

    const openNotificationWithIcon = (type: NotificationType, message:string) => {
        apiNotification[type]({
        message: `${message}`,
        });
    };


    const onFinish = (values: LogInDetails) => {
        setLoading(true);
        setTimeout(
            () =>
            {
                login(values)
                .then(
                    (apiResponse) => {
                        if(apiResponse.success)
                        {
                            setUser(apiResponse.data);
                            setUserStatus(UserStatus.LoggedIn);

                            getOperator(apiResponse.data.id)
                            .then(
                                (operatorResponse) =>
                                {
                                    if(operatorResponse.success)
                                    {
                                        setOperator(operatorResponse.data);
                                        setLoading(false);
                                        navigate("/");
                                    }
                                    else{
                                        openNotificationWithIcon('error',"Faild to load operator");
                                        setLoading(false);
                                    }
                                }
                            )

                        }
                        else{
                            openNotificationWithIcon('error',apiResponse.message);
                            setLoading(false);
                        }
                    }
                )
            },
            2000
        );
    }

    return (
        <div
            style={
                {
                    height:"100vh",
                    alignContent:"center"
                }
            }
        >
            {notificationContextHolder}
            <Row
                justify={"center"}
            >
                <Col
                    xs={24} sm={6} lg={6} xl={6} xxl={6}
                    style={
                        {
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            
                        }
                    }
                >
                    <Flex
                        vertical
                        align="center"
                    >
                        <Image 
                            src="logo.jpg"
                            preview={false}
                            width={"50%"}
                        />
                        <h1>LogIn</h1>
                    </Flex>
                </Col>
            </Row>
            <Row
                justify={"center"}
            
            >
                <Col 
                    xs={20} sm={6} lg={6} xl={6} xxl={6}
                  
                >
                    
                    
                    <Form<LogInDetails>
                        form={form}
                        size="large"
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input 
                                    prefix={<UserOutlined />} 
                                    placeholder="Email"  
                                    type="email"
                                />
                            </Form.Item>
                            <Form.Item
                                name="passWord"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                            </Form.Item>
                            

                            <Form.Item>
                                <Button 
                                    block 
                                    type="primary" 
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Log in
                                </Button>                                    
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    block
                                    variant="solid"
                                    color="green"
                                    onClick={() => navigate("/register")}
                                >
                                    Register
                                </Button>                                    

                            </Form.Item>
                            
                            

                    </Form>
                </Col>
            </Row>
        </div>
        
    );
}