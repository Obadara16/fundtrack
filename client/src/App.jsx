import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./scrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


const App = () => {
  return (
    <div className=" w-full overflow-hidden">
      <ScrollToTop/>
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
};

export default App;
