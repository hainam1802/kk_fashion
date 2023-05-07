import Major from "./pages/Major";
import Home from "./pages/Home";
import MajorEdit from "./pages/MajorEdit";
import NotFound from './pages/NotFound';
import NetWorkError from './pages/NetworkError';
import NoPermission from './pages/NoPermission';
import Student1 from "./pages/Student1";
import Product from "./pages/Product";

const routes = [
  { path: "", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/major", component: <Major /> },
  { path: "/major-edit/:id", component: <MajorEdit /> },
  { path: "/:category/:id", component: <Product /> },
  { path: "/student", component: <Student1 /> },
  { path: "/not-found", component: <NotFound /> },
  { path: "/net-work-error", component: <NetWorkError /> },
  { path: "/no-permission", component: <NoPermission /> },
  { path: "*", component: <NotFound /> },
];

export default routes;
