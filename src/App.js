import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { useCart } from "./zustand/cart";
import ProductForm from "./pages/Admin/ProductForm";
import { getAllProducts } from "./service/firebase";
import { useEffect } from "react";
import { useProduct } from "./zustand/product";

// Initialize the cart when your application starts
useCart.getState().initializeCart();

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
        {/* ==================== Admin pages below ===================== */}
        <Route path="/add_product" element={<ProductForm />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Route>
  )
);

function App() {
  const products = useProduct((state) => state.products);
  useEffect(() => {
    console.log("products", products);
  }, [products]);

  return (
    <div className="font-bodyFont">
      <SetupZustand>
        <RouterProvider router={router} />
      </SetupZustand>
    </div>
  );
}

const SetupZustand = (props) => {
  const { children } = props;
  const setProducts = useProduct((state) => state.setProducts);

  useEffect(() => {
    const getProducts = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };
    getProducts();
  }, []);

  return children;
};

export default App;
