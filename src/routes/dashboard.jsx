// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import TableList from "views/TableList/TableList.jsx";

const dashboardRoutes = [
  {
    path: "/dieasePredictor",
    sidebarName: "Disease Predictor",
    navbarName: "Disease Predictor",
    icon: ContentPaste,
    component: TableList
  },
  {
    path: "/analyzeReport",
    sidebarName: "Analyze Report",
    navbarName: "Medical Report Analyzer",
    icon: Dashboard,
    component: DashboardPage
  },
  { redirect: true, path: "/", to: "/dieasePredictor", navbarName: "Redirect" }
];

export default dashboardRoutes;
