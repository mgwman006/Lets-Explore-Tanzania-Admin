import { Button, Checkbox, Col, Flex, Form, Input, notification, Row } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { AddOperator } from "../models/operator";
import { registerOperator } from "../services/tourOperatorService";
import { useNavigate } from "react-router-dom";


type NotificationType = 'success' | 'info' | 'warning' | 'error';


export default function Register()
{
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm<AddOperator>();
    const [apiNotification, notificationContextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message:string) => {
        apiNotification[type]({
        message: `${message}`,
        });
    };

    const onFinish = (values: AddOperator) => {
        setLoading(true);
        setTimeout(
            () =>
            {
                registerOperator(values)
                .then(
                    (apiResponse) =>
                    {
                        if(apiResponse.success)
                        {
                            openNotificationWithIcon('success',"Operator created successfully");
                            navigate("/auth");
                            setLoading(false);
                            
                        }
                        else
                        {
                            openNotificationWithIcon('error', apiResponse.message);
                            setLoading(false);
                        }
                    }
                )
            }
            ,
            2000
        );
        
    }

    return (
        <Row
            style={
                {
                    height:"100vh"
                }
            }
            justify={"center"}
            align={"middle"}
        >
            <Col 
                xs={20} sm={6} lg={6} xl={6} xxl={6}
            >
                {notificationContextHolder}
                <Form<AddOperator>
                    form={form}
                    layout="vertical"
                    size="large"
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    >
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please input your First Name!' }]}
                        >
                            <Input type="text"  />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please input your Last Name!' }]}
                        >
                            <Input  type="text"/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input type="email" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <Input type="phone"/>
                        </Form.Item>
                        <Form.Item
                            label="PassWord"
                            name="passWord"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                block 
                                type="primary" 
                                htmlType="submit"
                                loading={loading}
                            >
                                Register
                            </Button>
                        </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}