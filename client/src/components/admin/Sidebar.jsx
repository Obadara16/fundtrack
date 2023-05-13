import React, { useEffect } from "react";
import {
  FaShoppingCart,
  FaWallet,
  FaChartLine,
  FaRegClock,
  FaCog,
  FaSignOutAlt,
  FaHouseUser,
  FaList,
  FaWindowClose,
  FaWindows,
  FaWindowRestore,
  FaDoorClosed,
  FaDoorOpen,
  FaWindowMaximize,
} from "react-icons/fa";
import { logo } from "../../assets";
import { useAuth } from "../../context/useAuth";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  
useEffect(() => {
    const mainMenuLi = document
    .getElementById("mainMenu")
    .querySelectorAll("li");

    function changeActive() {
    mainMenuLi.forEach((n) => n.classList.remove("active"));
    this.classList.add("active");
    }

    mainMenuLi.forEach((n) => n.addEventListener("click", changeActive));
}, []);

  const navigate = useNavigate();

    let { logout } = useAuth()
    const handleLogout = () => {
      logout();
      navigate("/")
      console.log("handle logout is been called")
    };

  return (
    <menu className="w-full h-full flex flex-col items-center shadow sticky top-0 text-white px-10" style={{background: "#020d2d"}}>
      <img src={logo} alt="" className="w-[50px]  h-[50px] pt-8" />
      

      <ul id="mainMenu" className="pt-14 w-full flex flex-col items-center gap-10">
        <Link to="/dashboard"><Icon icon={<FaWindowMaximize />} /></Link>
        <Link to="/transactions"><Icon icon={<FaList />} /></Link>
        <Icon icon={<FaWallet />} />
        <Icon icon={<FaChartLine />} />
        <Icon icon={<FaRegClock />} />
      </ul>

      <ul className="lastMenu mt-auto flex flex-col items-center gap-10 mb-10">
        <Icon icon={<FaCog />} />
        <button onClick={handleLogout}><Icon icon={<FaSignOutAlt />} /></button>
      </ul>
    </menu>
  );
}

const Icon = ({ icon }) => (
  <li>
    <p>{icon}</p>
  </li>
);

export default Sidebar;
