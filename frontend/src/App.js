import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book/:id" element={<BookDetails />} />

        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;