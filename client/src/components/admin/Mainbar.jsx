import { useState, useEffect } from "react";
import CardHistory from "./CardHistory";
import Overview from "./Overview";
import Wallet from "./Wallet";
import Modal from "../Modal";
import PaymentMessage from "../../pages/PaymentMessage";
import { useNavigate } from "react-router-dom";

const Mainbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/dashboard", { replace: true }); // replace '/dashboard' with the URL of your dashboard page
    console.log("Modal closed and navigated to /dashboard");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    // Define the regex pattern for the desired URL format
    const urlPattern = /^http:\/\/localhost:3000\/dashboard\?/;

    // Get the current URL
    const currentUrl = window.location.href;

    // Check if the URL matches the pattern
    if (urlPattern.test(currentUrl)) {
      // Call the desired function here
      handleOpenModal();
    }
  }, []);

  return (
    <>
      <section className="w-full  bg-dashboard py-24 px-10 text-white font-poppins">
        <div className="w-full h-full">
          <div className="top flex flex-col justify-center lg:flex-row gap-12 ">
            <div className="md:w-[25%] ">
              <Wallet />
            </div>
            <div className="md:w-[45%]">
              <Overview />
            </div>
            <div className="md:w-[30%] px-6">
              <CardHistory />
            </div>
          </div>
          {showModal && (
            <Modal close={handleCloseModal}>
              <PaymentMessage />
            </Modal>
          )}
          <div className="bottom "></div>
        </div>
      </section>
    </>
  );
};

const Icon = ({ icon }) => (
  <span>
    <a href="#">{icon}</a>
  </span>
);

export default Mainbar;
