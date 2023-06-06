import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style";
// import Alert from "../components/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { bgimage, logo } from "../assets";
import { useAuth } from "../context/useAuth";
import { AppName } from "../constants";
import Loader from "../atoms/Loader";
import { urlForAuth, urlForUsers } from "../constants/endpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { generalPostRequest, postRequest } from "../utils/api";
import Alert from "../components/Alert";
import axios from "axios";

const style = {
  iconstyle: {
    position: "absolute",
    right: "8%",
    top: "30%",
    cursor: "pointer",
  },
};

const Login = () => {
  let { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });
  const [response, setResponse] = useState(null);
  const [toggleConfirm, setToggleConfirm] = useState(false);

  //togglepassword
  const togglePassword = () => {
    setShowPassword(!showpassword);
  };
  //toggleconfirm
  const toggleConfirmPassword = () => {
    setToggleConfirm(!toggleConfirm);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  //submit form
  const handleLogin = async (e) => {
    setShow(true);
    setResponse(true);
    e.preventDefault();
    // setAlerting({ color: 'primary', data: 'please wait!' })
    try {
      const response = await generalPostRequest(urlForAuth.login, {
        email,
        password,
      });
      setResponse(response);
      console.log(response);
      if (response.status === 200) {
        window.localStorage.setItem(
          "__xTFTGweTHDeRTT__%",
          JSON.stringify(response.data.tokens.accessToken)
        );
  
        setAlerting({ color: "success", data: `Welcome to ${AppName}` });
  
        login().then(() => {
          window.location = "/dashboard";
        });
      } else {
        setAlerting({ color: "danger", data: response.data.error });
      }
      setShow(false);
      
    } catch (error) {
      setResponse(error)

      if (error.message === "Network Error") {
        setAlerting({ color: "danger", data: "No internet connection" });
        
        // Handle network error
      } else if (error.response) {
        setAlerting({ color: "danger", data: error.response.data });
        // Handle response error (e.g., server error)
      } else {
        setAlerting({ color: "danger", data: "Something went wrong" });
        // Handle other errors
      }
      
      
    }
    
  };

  return (
    <div
      className="w-full overflow-hidden min-h-screen font-poppins flex flex-col items-center justify-center bg-cover sm:bg-contain bg-center "
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div
        className={`  w-full ${styles.paddingX} ${styles.flexStart} flex flex-col`}
      >
        <div className="justify-start align-baseline my-4">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className={`${styles.boxWidth}`}>
          <div className="w-full mx-auto flex justify-center items-center flex-col my-10 gap-4">
            <form
              className="flex flex-col mt-4 sm-w-full md:w-2/5 gap-8 bg-white p-10 rounded-xl"
              onSubmit={handleLogin}
            >
              <h1 className="text-2xl font-light text-gradient">Login</h1>
              <p className="text-center text-gradient">
                Kindly enter your email and password
              </p>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={({ target: { value } }) => setEmail(value)}
                  required={true}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-bg-purple-gradient appearance-none dark:text-white dark:border-secondary dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-bg-purple-gradient peer
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className={`absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 
                  }`}
                >
                  Email
                </label>
              </div>

              <div className="relative w-full">
                <div className="relative w-full">
                  <input
                    type={showpassword ? "text" : "password"}
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    required={true}
                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-bg-purple-gradient appearance-none dark:text-white dark:border-secondary dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-bg-purple-gradient peer
                    }`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="password"
                    className={`absolute text-sm text-black dark:text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1
                    }`}
                  >
                    Password
                  </label>
                </div>
                <div style={style.iconstyle}>
                  <FontAwesomeIcon
                    icon={faEye}
                    color="#000000"
                    onClick={togglePassword}
                    size={"xs"}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm cursor-pointer text-right text-gradient"
                >
                  Forgot Password ?
                </Link>
              </div>
              <div className="flex flex-col">
                {response ? (
                  <Alert color={alerting.color} data={alerting.data} />
                ) : null}
                <button
                  className={`w-full px-4 h-[54px] rounded cursor-pointer ${
                    show
                      ? "bg-blue-gradient text-black"
                      : "bg-purple-gradient text-white"
                  }`}
                  disabled={show}
                >
                  {show ? <Loader /> : "Login"}
                </button>
              </div>
              <p className="text-center text-[14px] text-gradient">
                Don't have an account ?{" "}
                <Link
                  to="/signup"
                  className="my-2 text-[15px] cursor-pointer text-custom-btn-green font-semibold text-gradient"
                >
                  Sign Up
                </Link>
              </p>
              {/* {error && <span className="text-red-500">Something went wrong...</span>} */}
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

export default Login;
