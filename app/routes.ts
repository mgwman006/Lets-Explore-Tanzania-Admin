import TourDashboard from "./components/TourDashboard";
import TourDetails from "./components/TourDetails";
import Home from "./components/Home";
import WelcomePage from "./components/WelcomePage";
import Tours from "./components/Tours";
import AddTour from "./components/AddTour";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import ResetPassWord from "./components/ResetPassWord";
import AuthLayout from "./components/AuthLayout";
import Bookings from "./components/Bookings";
import BookingDetails from "./components/BookingDetails";
import BookingsDashboard from "./components/BookingsDashboard";

const routes = [
  {
    path: "/",
    Component: Home,
    children: [
      {
        path:"",
        Component: WelcomePage
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { 
            path:"",
            Component: LogIn 
          },
          { 
            path: "register", 
            Component: Register 
          },
          { 
            path:"resetpassword",
            Component: ResetPassWord,
          }
        ],
      },
      {
        path:"tours",
        Component: TourDashboard,
        children : [
          {
            path: "",
            Component: Tours
          },
          {
            path: ":tourId",
            Component: TourDetails
          },
          {
            path: "addtour",
            Component: AddTour
          }
        ]
      },
      {
        path:"bookings",
        Component: BookingsDashboard,
        children : [
          {
            path: "",
            Component: Bookings
          },
          {
            path: ":bookingId",
            Component: BookingDetails
          }
        ]
      }
    ]
  }
  
];

export default routes;
