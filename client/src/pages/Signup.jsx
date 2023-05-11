import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style";
// import Alert from "../components/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { bgimage, logo } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { urlForAuth, urlForUsers } from "../constants/endpoints";
import { postRequest } from "../utils/api";
import { getStorageValue, useLocalStorage } from "../utils/storage";

const style = {
  iconstyle: {
    position: "absolute",
    right: "8%",
    top: "30%",
    cursor: "pointer",
  },
};

const Signup = () => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useLocalStorage("email", "");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });
  const [response, setResponse] = useState({});
  const [toggleConfirm, setToggleConfirm] = useState(false);

  //submit
  const submit = async (e) => {
    setShow(true);
    e.preventDefault();
    const response = await postRequest(urlForAuth.registration, {
      firstName,
      lastName,
      email,
      password,
    });
    setResponse(response);
    if (response.status === 200) {
      setAlerting({ color: "success", data: "User created successfully" });
      navigate("/otp-verification", { replace: true });
    } else {
      setAlerting({ color: "danger", data: response.data.message });
    }
  };

  //togglepassword
  const togglePassword = () => {
    setShowPassword(!showpassword);
  };
  //toggleconfirm
  const toggleConfirmPassword = () => {
    setToggleConfirm(!toggleConfirm);
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
            <form
              className="flex flex-col my-4 sm-w-full md:w-2/5 gap-8 bg-white p-10 rounded-xl"
              onSubmit={submit}
            >
              <h1 className="text-2xl font-light text-secondary">Sign Up</h1>
              <p className="text-center text-secondary">
                Kindly enter your details below
              </p>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={firstName}
                    onChange={({ target: { value } }) => setFirstName(value)}
                    required={true}
                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-secondary bg-transparent rounded-lg border border-bg-purple-gradient appearance-none dark:text-white dark:border-secondary dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-bg-purple-gradient peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="firstName"
                    className={`absolute text-sm text-secondary dark:text-secondary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    FirstName
                  </label>
                </div>

                <div className="relative w-full">
                  <input
                    type="text"
                    value={lastName}
                    onChange={({ target: { value } }) => setLastName(value)}
                    required={true}
                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-secondary bg-transparent rounded-lg border border-bg-purple-gradient appearance-none dark:text-white dark:border-secondary dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-bg-purple-gradient peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="lastName"
                    className={`absolute text-sm text-secondary dark:text-secondary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    LastName
                  </label>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    required={true}
                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-secondary bg-transparent rounded-lg border border-bg-purple-gradient appearance-none dark:text-white dark:border-secondary dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-bg-purple-gradient peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className={`absolute text-sm text-secondary dark:text-secondary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
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
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-secondary bg-transparent rounded-lg border border-bg-purple-gradient appearance-none dark:text-white dark:border-secondary dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-bg-purple-gradient peer`}
                      placeholder=""
                    />
                    <label
                      htmlFor="password"
                      className={`absolute text-sm text-secondary dark:text-secondary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
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
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm cursor-pointer text-right text-secondary"
                >
                  Forgot Password ?
                </Link>
              </div>
              <div className="flex flex-col">
                <button
                  className={`w-full px-4 h-[54px] rounded cursor-pointer ${
                    show
                      ? "bg-blue-gradient text-secondary"
                      : "bg-purple-gradient text-white"
                  }`}
                  disabled={show}
                >
                  {show ? "Loading..." : "Signup"}
                </button>
              </div>
              <p className="text-center text-[14px] text-secondary">
                Already Registered ?{" "}
                <Link
                  to="/login"
                  className="my-2 text-[15px] font-semibold cursor-pointer text-custom-btn-green  text-secondary"
                >
                  Login
                </Link>
              </p>
              {/* {error && <span className="text-red-500">Something went wrong...</span>} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
