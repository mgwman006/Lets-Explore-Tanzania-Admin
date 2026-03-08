import { Breadcrumb, Col, Row, Typography } from "antd";
import { Outlet } from "react-router-dom";


export default function BookingsDashboard()
{
    return(
        <div>
            <Outlet/>
        </div>
    );
}