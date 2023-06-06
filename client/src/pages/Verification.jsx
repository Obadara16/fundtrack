import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRequest } from "../utils/api";
import PostButton from "../atoms/PostButton";
import Alert from "../components/Alert";
import { bgimage, logo } from "../assets";
import Loader from "../atoms/Loader";
import OtpInput from 'react-otp-input';
import { urlForAuth } from "../constants/endpoints";
import styles from "../style";

const Verification = () => {
  let navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });
  const [response, setResponse] = useState(null );



  const handleVerification = async (e) => {
    setShow(true);
    setResponse(true);
    e.preventDefault();
    try {
      const response = await postRequest(urlForAuth.otp, {
        otp: otp,
      });
      setResponse(response);
      if (response.status === 200) {
        setAlerting({ color: "success", data: "User created successfully" });
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 10000); 
      } else {
        setAlerting({ color: "danger", data: response.data.error });
      }
      setShow(false);
      
    }  catch (error) {
        setResponse(error);
      
        if (error.message === "Network Error") {
          console.log(error);
          setAlerting({ color: "danger", data: "No internet connection" });
          // Handle network error
        } else if (error.response) {
          console.log(error.response);
          setAlerting({ color: "danger", data: error.response.data });
          // Handle response error (e.g., server error)
        } else {
          console.log(error);
          setAlerting({ color: "danger", data: "Something went wrong" });
          // Handle other errors
        }
    }
       
  };

  return (
    <div
      className=" w-full overflow-hidden min-h-screen font-poppins flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div
        className={`w-full h-full ${styles.paddingX} ${styles.flexStart} flex  flex-col`}
      >
        <div className="justify-start my-4">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className={`${styles.boxWidth}`}>
          <div className="w-full mx-auto flex justify-center items-center my-10 gap-4">
            <div className="flex flex-col my-4 sm-w-full md:w-2/5 gap-8 bg-white p-10 mx-4">
              <div className="">
                <h1 className="font-bold text-3xl mb-4">Otp verification</h1>
                <p className="text-sm">
                  please check your email for otp secure code sent to finish your
                  registration
                </p>
              </div>

              <form className="flex flex-col" onSubmit={handleVerification}>
                <div className="mb-10 ">
                  <div className="flex justify-center md:mt-10">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span className="mx-2"> </span>}
                      renderInput={(props) => <input {...props} />}
                      inputStyle={{
                        border: "1px solid #CFD3DB",
                        borderRadius: "8px",
                        width: "16%",
                        display: "flex",
                        justifyContent: "center",
                        height: "54px",
                        fontSize: "18px",
                        color: "#000000",
                        fontWeight: "400",
                        caretColor: "blue",
                      }}
                      focusStyle={{
                        border: "1px solid #CFD3DB",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center mb-4">
                  {response && (
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
        </div>
      </div>
    </div>
  );
};

export default Verification;
