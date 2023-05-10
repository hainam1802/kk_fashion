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

const routes = [

  { path: "/:category/:id", component: <Product /> },
  { path: "/order-review", component: <OrderReview /> },
  { path: "/checkout", component: <CheckOut /> },
  { path: "/cart", component: <Cart /> },
];

export default routes;
