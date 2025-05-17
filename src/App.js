import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from "./pages/Register";
import Selectrole from './pages/Selectrole';
import AdminDashboard from './pages/AdminDashboard';
import GuestView from './pages/GuestView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role" element={<Selectrole />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/guest" element={<GuestView />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

