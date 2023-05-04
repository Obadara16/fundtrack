import React, { useEffect } from "react";
import {
  FaDelicious,
  FaShoppingCart,
  FaWallet,
  FaChartLine,
  FaRegClock,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { icon, logo, people02 } from "../assets/index"

function Menu() {
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

  return (
    <menu className="w-1/8 h-screen flex flex-col items-center shadow sticky top-0 text-white py-4 px-6" style={{background: "#0a010f"}}>
      <img src={people02} alt="" className="w-[50px]  h-[60px] pt-8" />
      

      <ul id="mainMenu" className="pt-8 w-full flex flex-col items-center gap-10">
        <Icon icon={<FaDelicious />} />
        <Icon icon={<FaShoppingCart />} />
        <Icon icon={<FaWallet />} />
        <Icon icon={<FaChartLine />} />
        <Icon icon={<FaRegClock />} />
      </ul>

      <ul className="lastMenu mt-auto flex flex-col items-center gap-10 mb-10">
        <Icon icon={<FaCog />} />
        <Icon icon={<FaSignOutAlt />} />
      </ul>
    </menu>
  );
}

const Icon = ({ icon }) => (
  <li>
    <a href="#">{icon}</a>
  </li>
);

export default Menu;
