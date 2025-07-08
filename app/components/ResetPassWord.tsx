import { Button, Col, Form, Input, notification, Row } from "antd";
import { ResetPassWordDTO } from "../models/auth";
import { resetPassword} from "../services/userService";
import { useNavigate } from "react-router";
import { useState } from "react";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function ResetPassWord()
{
    const navigate = useNavigate();
    const [form] = Form.useForm<ResetPassWordDTO>();
    const [loading, setLoading] = useState<boolean>(false);
    const [apiNotification, notificationContextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message:string) => {
        apiNotification[type]({
        message: `${message}`,
        });
    };
    
    const onFinish = (vakues: ResetPassWordDTO) => 
    {
        resetPassword(vakues)
        .then(
            (apiResponse) =>
            {
                if(apiResponse.success)
                {
                    navigate("/login");
                }
                else
                {
                    openNotificationWithIcon('error',apiResponse.message);
                }
            }
        )
    }
    return (
        <Row
            style={
                {
                    height:"100vh"
                }
            } 
            align="middle"
            justify="center">
            <Col xs={20} sm={3} lg={3} xl={3} xxl={3}>
                {notificationContextHolder}
                <Form<ResetPassWordDTO>
                    size="large"
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required:true, message:"Email is required"}]}
                    >
                        <Input type="email"/>
                    </Form.Item>
                    <Form.Item
                        name="passWord"
                        label="New Pass Word"
                        rules={[{required:true, message:"Password is required"}]}
                    >
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
                
            </Col>
        </Row>
    )
}