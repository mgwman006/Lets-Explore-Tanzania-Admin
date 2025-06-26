import AdminWelcomePage from "./components/WelcomePage";
import TourDashboard from "./components/TourDashboard";
import TourDetails from "./components/TourDetails";
import Home from "./components/Home";
import WelcomePage from "./components/WelcomePage";
import Tours from "./components/Tours";
import AddTour from "./components/AddTour";

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
        path:"tours",
        Component: TourDashboard,
        children : [
          {
            path: "",
            Component: Tours
          },
          {
            path: "tourdetails",
            Component: TourDetails
          },
          {
            path: "addtour",
            Component: AddTour
          }
        ]
      }
    ]
  }
];

export default routes;
