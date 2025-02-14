import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/HomePage.tsx";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register.tsx";
import { Login } from "./pages/LoginPage.tsx";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
