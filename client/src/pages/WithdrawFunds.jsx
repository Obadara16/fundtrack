import { useContext, useEffect, useState } from "react";
import styles from "../style";
// import Alert from "../components/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AppContext } from "../context/usercontext";
import { postRequest } from "../utils/api";
import { wallets_endpoint } from "../constants/endpoints";
import Alert from "../components/Alert";
const apiKey = "sk_test_5975f07cf39e43a9a3b01011afe536efc159c61d";

console.log("apiKey", apiKey);

const WithdrawFunds = () => {
  const [amount, setAmount] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false);
  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });


  const handleBankChange = (event) => {
    setBankCode(event.target.value);
    setAccountNumber(""); // Reset the account number
    setAccountName(""); // Reset the account name
  };

  const handleAccountNumberChange = async (event) => {
    setAccountNumber(event.target.value);
    setAccountName(""); // Reset the account name

    if (event.target.value.length >= 10) {
      try {
        // Get the account name from Paystack's API
        const response = await axios.get(
          `https://api.paystack.co/bank/resolve?account_number=${event.target.value}&bank_code=${bankCode}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        console.log("banks loaded", response);
        setAccountName(response.data.data.account_name);
      } catch (error) {
        console.log(error);
        setAccountName("Default");
      }
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const userInfo = useContext(AppContext);

  const handleWithdrawFunds = async (e) => {
    console.log("you called me");
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postRequest(wallets_endpoint.withdrawFunds, {
        userId: userInfo.user,
        amount: parseFloat(amount),
        bankAccount: {
          bankCode,
          accountNumber,
        },
      });

      if (response.status === 200) {
        setAlerting({ color: "success", data: response.data.message });
        setResponse(response)
        userInfo.setWallet(response.data.newBalance);

      } else {
        setAlerting({ color: "success", data: response.data.error });
        setResponse(response)

      }
      
      
      setLoading(false)
    } catch (error) {
      console.error("this is the error", error);
      setLoading(false);
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

  const isDisabled = accountName === "";

  return (
    <div className="w-fit overflow-hidden h-fit font-poppins flex flex-col items-center justify-center sm:bg-contain bg-center bg-white ">
      <div className={`  w-full mx-10 flex flex-col`}>
        <div className="w-full">
          <div className="w-full mx-auto flex justify-center items-center flex-col gap-4 bg-white">
            <form
              onSubmit={handleWithdrawFunds}
              className="w-full h-full flex flex-col justify-start text-left text-black p-6 gap-6"
            >
              <h1 className="text-2xl font-light text-gray-500">
                Withdraw Funds
              </h1>
              <div className="w-full flex gap-6">
                <label htmlFor="amount" className="flex-1">
                  Amount (NGN)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="flex-1"
                />
              </div>
              <div className="w-full flex gap-6">
                <label htmlFor="bank" className="flex-1">
                  Bank
                </label>
                <select
                  id="bank"
                  value={bankCode}
                  onChange={handleBankChange}
                  className="flex-1"
                >
                  <option value="">Select a bank</option>
                  <option value="058">GTBank</option>
                  <option value="070">Fidelity Bank</option>
                  <option value="011">First Bank of Nigeria</option>
                  {/* Add more banks as needed */}
                </select>
              </div>
              <div className="w-full flex gap-6">
                <label htmlFor="accountNumber" className="flex-1">
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  className="flex-1"
                />
              </div>
              {accountName && (
                <div className="w-full flex gap-6">
                  <label htmlFor="accountName" className="flex-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    value={accountName}
                    className="flex-1"
                    readOnly
                  />
                </div>
              )}
              <div className="flex flex-col">
                {response.statusText ? (
                  <Alert color={alerting.color} data={alerting.data} />
                ) : null}
                <button
                  className={`w-full px-4 h-[54px] rounded 
                ${
                  !loading && isDisabled
                    ? "bg-gray-200 text-black cursor-not-allowed"
                    : "bg-btn-purple-gradient text-white cursor-pointer"
                }
                ${
                  loading && !isDisabled
                    ? "bg-blue-gradient text-black cursor-pointer"
                    : ""
                }`}
                  disabled={isDisabled}
                >
                  {loading ? "Processing..." : "Withdraw Funds"}
                </button>
              </div>

              {error && <div>{error}</div>}
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

export default WithdrawFunds;
