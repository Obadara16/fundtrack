import React, { useContext, useState } from "react";
import { people01, people02, people03 } from "../../assets";
import { FaPlus } from "react-icons/fa";
import Modal from "../Modal";
import AddFunds from "../../pages/AddFunds";
import { AppContext } from "../../context/usercontext";
import WithdrawFunds from "../../pages/WithdrawFunds";
import CurrencyFormat from "../../atoms/CurrencyFormat";
const apiKey = "";

console.log("apiKey", apiKey);

const Wallet = () => {
  const [showModal, setShowModal] = useState(false);
  const [withdrawShowModal, setWithdrawShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleWithdrawCloseModal = () => {
    setWithdrawShowModal(false);
  };

  const handleWithdrawOpenModal = () => {
    setWithdrawShowModal(true);
  };

  const user = useContext(AppContext);
  const userInfo = user.userProfile;
  return (
    <div className="w-full font-poppins">
      <div className="flex items-center gap-4 w-full ">
        <div className="w-18 h-18 rounded-full bg-blue-400 justify-center items-center">
          <img src={people01} alt="profile" className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-[16px]">{userInfo.firstName}</h3>
          <p className="text-[14px] font-light">{userInfo.email}</p>
        </div>
      </div>
      <div className="w-full justify-center items-center text-center mt-14">
        <p className="text-center">TOTAL BALANCE</p>
        <CurrencyFormat value={user.wallet} size={40} />
        <p className="text-[12px]">12.81%</p>
        <div className="flex gap-4 w-full justify-center my-12">
          <button
            className="text-white px-8 py-3 bg-btn-purple-gradient whitespace-nowrap"
            onClick={handleOpenModal}
          >
            Add Funds
          </button>
          {showModal && (
            <Modal close={handleCloseModal}>
              <AddFunds />
            </Modal>
          )}
          <button
            className="text- px-8 py-3 whitespace-nowrap"
            style={{ background: "#020d2d" }}
            onClick={handleWithdrawOpenModal}
          >
            Withdraw
          </button>
          {withdrawShowModal && (
            <Modal close={handleWithdrawCloseModal}>
              <WithdrawFunds />
            </Modal>
          )}
        </div>
      </div>
      <div className="md:w-9/12">
        <h3 className="font-normal my-4">QUICK TRANSFER</h3>
        <div className="flex justify-between">
          <div className="flex ">
            <div className="w-12 h-12 rounded-full flex  justify-center items-center">
              <img src={people02} alt="profile" className="w-12 h-12" />
            </div>
            <div className="w-12 h-12 rounded-full flex  justify-center items-center">
              <img src={people03} alt="profile" className="w-12 h-12" />
            </div>
            <div className="w-12 h-12 rounded-full flex  justify-center items-center">
              <img src={people01} alt="profile" className="w-12 h-12" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Icon icon={<FaPlus />} />
          </div>
        </div>
      </div>
    </div>
  );
};
const Icon = ({ icon }) => (
  <span>
    <a href="#">{icon}</a>
  </span>
);

export default Wallet;
