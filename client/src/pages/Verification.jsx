import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/api";
import { urlForUsers } from "../constants/endpoints";
import { getStorageValue } from "../utils/storage";
import PostButton from "../atoms/PostButton";
import Alert from "../components/Alert";
import { bgimage } from "../assets";
import Loader from "../atoms/Loader";
import axios from "axios";

const Verification = () => {
  let navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });
  const [response, setResponse] = useState({});

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  //verification
  const verify = async (e) => {
    e.preventDefault();
    setShow(true);

    const response = await axios.post(urlForUsers.otp, {
      otp: otp,
    });
    setResponse(response);
    if (response.status === 200) {
      setAlerting({ color: "success", data: "User created successfully" });
      navigate("/login", { replace: true });
    } else {
      setAlerting({ color: "danger", data: response.data.message });
    }
    setShow(false);
  };

  return (
    <div
      className="w-full overflow-hidden min-h-screen font-poppins flex flex-col items-center justify-center bg-cover sm:bg-contain bg-center "
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="w-fit overflow-hidden h-full font-poppins flex flex-col mx-auto items-center justify-center sm:bg-contain bg-center bg-white text-black px-10 py-10">
        <div className="">
          <h1 className="font-bold text-3xl mb-4">Otp verification</h1>
          <p className="text-sm">
            please check your email for otp secure code sent to finish your
            registration
          </p>
        </div>

        <form className="flex flex-col" onSubmit={verify}>
          <div className="mb-10">
            <div className="flex justify-center md:mt-10">
              {/* <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                isInputNum={true}
                shouldAutoFocus={true}
                separator={<span style={{ width: "8px" }}></span>}
                inputStyle={{
                  border: "1px solid transparent",
                  borderRadius: "8px",
                  width: "54px",
                  height: "54px",
                  fontSize: "12px",
                  color: "#000000",
                  fontWeight: "400",
                  caretColor: "blue",
                }}
                focusStyle={{
                  border: "1px solid #CFD3DB",
                  outline: "none",
                }}
              /> */}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mb-4">
            {response.statusText && (
              <Alert color={alerting.color} data={alerting.data} />
            )}

            <PostButton
              text={show ? <Loader /> : "Submit"}
              width="250px"
              disabled={otp === "" ? true : false}
            />

            {/* <div className="text-start mt-3">
              <PostButton
                text={"Back"}
                onclick={() => navigate("/auth/signup", { replace: true })}
              />
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
