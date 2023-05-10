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
import Category from "./pages/Category";
import ListProduct from "./pages/ListProduct";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";

const routesAdmin = [
  { path: "", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/:category/:id", component: <Product /> },
  { path: "/:category", component: <Category /> },
  { path: "/search", component: <ListProduct /> },
  { path: "/not-found", component: <NotFound /> },
  { path: "/net-work-error", component: <NetWorkError /> },
  { path: "/no-permission", component: <NoPermission /> },
  { path: "*", component: <NotFound /> },
  { path: "/:category/:id", component: <Product /> },
  { path: "/order-review", component: <OrderReview /> },
  { path: "/order-history", component: <OrderHistory /> },
  { path: "/checkout", component: <CheckOut /> },
  { path: "/cart", component: <Cart /> },
  { path: "/profile", component: <Profile /> },
];

export default routesAdmin;
