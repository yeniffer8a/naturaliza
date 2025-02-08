import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/HomePage.tsx";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register.tsx";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
