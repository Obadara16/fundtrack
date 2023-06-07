import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRequest, postRequest } from "../utils/api";
import { AppContext } from "../context/usercontext";
import { wallets_endpoint } from "../constants/endpoints";
import { paymentconfirm } from "../assets";

const PaymentMessage = () => {
  const user = useContext(AppContext);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });

  const searchParams = new URLSearchParams(window.location.search);
  const reference = searchParams.get("reference");
  console.log(reference);

  const updateWalletBalance = async () => {
    try {
      const url = `${wallets_endpoint.updateWalletBalance}?reference=${reference}`;
      const response = await postRequest(url);
      console.log("the awaited response", response)
      if (response.status === 200) {
        setResponse("Funds added successfully"); // set the response data as the state variable value
      }
      else {
        setResponse("Unauthorized  Access"); // set the response data as the state variable value
      }
    } catch (error) {
      setError("An error occured while adding funds"); // set the response data as the state variable value
      
    }
  };

  useEffect(() => {
    updateWalletBalance(reference); // call the function with the reference parameter
  }, [reference]);

  return (
    <div className="w-fit overflow-hidden h-fit font-poppins flex flex-col items-center justify-center sm:bg-contain bg-center bg-white text-black px-10">
      <div className="flex flex-col w-full justify-center  my-12  items-center text-center gap-4">
        <img src={paymentconfirm} alt="paymenttick" height={85} width={85} />
        {response && 
          <p className="text-sm md:text-lg font-bold">{response}</p>
        }
        {error && 
          <p className="text-sm md:text-lg font-bold">{error}</p>
        }
      </div>
    </div>
  );
};

export default PaymentMessage;
