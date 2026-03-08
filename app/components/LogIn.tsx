import { Button, Checkbox, Col, Flex, Form, Input, Row, Image, notification, Alert } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { useState } from "react";
import { LogInDetails, UserStatus } from "../models/auth";
import { login } from "../services/authService";
import { getOperator } from "../services/userService";
import { useUserContext } from "../contexts/UserContext";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function LogIn()
{
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm<LogInDetails>();
    const [apiNotification, notificationContextHolder] = notification.useNotification();
    const { userStatus,setUserStatus, user} = useUserContext(); // Get user status and login state from context
    

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
                          
                            getOperator(apiResponse.data.id)
                            .then(
                                (operatorResponse) =>
                                {
                                    if(operatorResponse.success)
                                    {
                                        localStorage.setItem("operator",JSON.stringify(operatorResponse.data));
                                        localStorage.setItem("user",JSON.stringify(apiResponse.data));
                                        localStorage.setItem("userStatus",JSON.stringify(UserStatus.LoggedIn));

                                        setUserStatus(UserStatus.LoggedIn);

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
                                    onClick={() => navigate("/auth/register")}
                                >
                                    Register
                                </Button>                                    

                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="link"
                                    onClick={() => navigate("/auth/resetpassword")}
                                >
                                    Reset PassWord
                                </Button>
                            </Form.Item>
                            
                            

                    </Form>
                </Col>
            </Row>
        </div>
        
    );
}