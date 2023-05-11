import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style";
// import Alert from "../components/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { bgimage, logo } from "../assets";
import { BASE_URL } from "../requestMethods";
import axios from "axios";
import { AppContext } from "../context/usercontext";
import { postRequest } from "../utils/api";
import { wallets_endpoint } from "../constants/endpoints";

const AddFunds = () => {
  const [show, setshow] = useState(false);
  const user = useContext(AppContext);
  const [response, setResponse] = useState({});
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [transactionHistory, setTransactionHistory] = useState("");
  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const userInfo = useContext(AppContext);

  const handleAddFunds = async (e) => {
    e.preventDefault();
    setshow(true);
    try {
      const response = await postRequest(wallets_endpoint.addFunds, {
        userId: userInfo.user,
        amount: parseFloat(amount),
      });
      if (response) {
        window.location.href = response.data.authorization_url;
      }
    } catch (error) {
      console.error(error);
      setshow(false);
      setAlerting({ color: "danger", data: error });
    }
  };

  const schema = yup.object().shape({
    amount: yup.number().required("Amount is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //   const onSubmit = async (data) => {
  //     // dispatch(login(data.email, data.password));
  //   };

  useEffect(() => {
    // if (success) {
    //   setAlerting({
    //     color: "success",
    //     data: `Welcome Back ${success}`,
    //   });
    //   navigate("/");
    // } else {
    //   setAlerting({ color: "danger", data: error });
    // }
  }, []);

  return (
    <div className="w-fit overflow-hidden h-fit font-poppins flex flex-col items-center justify-center sm:bg-contain bg-center bg-white ">
      <div className={`  w-full mx-10 flex flex-col`}>
        <div className="w-full">
          <div className="w-full mx-auto flex justify-center items-center flex-col gap-4">
            <form
              className="w-full h-full px-6"
              onSubmit={handleAddFunds}
              //   onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-4">
                <div className="w-[10%] flex justify-center items-center text-black text-xl font-normal"><p className="mb-6">NGN</p></div>
                <div className=" w-[90%] flex flex-col gap-8 bg-white py-10 rounded-xl pr-10">
                    <h1 className="text-2xl font-light text-gray-500">Add Fund</h1>
                  <div className="flex h-fit items-center">
                    <div className="relative w-full h-full ">
                      <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        className={`block px-2.5 py-4  w-full h-full text-sm md:text-xl text-gray-500 bg-transparent border border-bg-purple-gradient appearance-none dark:text-gradient dark:border-secondary dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-bg-purple-gradient peer `}
                        placeholder="100.00 "
                      />
                      <label
                        htmlFor="amount"
                        className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                      ></label>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <button
                      className={`w-full px-4 h-[54px] rounded cursor-pointer ${
                        show
                          ? "bg-blue-gradient text-gray-500"
                          : "bg-btn-purple-gradient text-gradient"
                      }`}
                      disabled={show}
                    >
                      {show ? "Processing..." : "Add Fund"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={` bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}></div>
      </div>
    </div>
  );
};

export default AddFunds;
