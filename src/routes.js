import Major from "./pages/Major";
import Home from "./pages/Home";
import MajorEdit from "./pages/MajorEdit";
import NotFound from './pages/NotFound';
import NetWorkError from './pages/NetworkError';
import NoPermission from './pages/NoPermission';
import Student1 from "./pages/Student1";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import OrderReview from "./pages/OrderReview";
import CheckOut from "./pages/CheckOut";

const routes = [
  { path: "", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/major", component: <Major /> },
  { path: "/major-edit/:id", component: <MajorEdit /> },
  { path: "/:category/:id", component: <Product /> },
  { path: "/order-review", component: <OrderReview /> },
  { path: "/checkout", component: <CheckOut /> },
  { path: "/cart", component: <Cart /> },
  { path: "/student", component: <Student1 /> },
  { path: "/not-found", component: <NotFound /> },
  { path: "/net-work-error", component: <NetWorkError /> },
  { path: "/no-permission", component: <NoPermission /> },
  { path: "*", component: <NotFound /> },
];

export default routes;
