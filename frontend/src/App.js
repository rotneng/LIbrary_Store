import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import AdminRoute from "./components/AdminRoute";
import BookDetails from "./pages/BookDetails";
import AdminOrders from "./pages/AdminOrders";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyOrders from "./pages/MyOrders";

import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book/:id" element={<BookDetails />} />

          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/my-orders" element={<MyOrders />} />

          <Route path="/cart" element={<Cart />} />

          <Route element={<AdminRoute />}>
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
