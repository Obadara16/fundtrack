import React, { useState, createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { getStorageValue } from "../utils/storage";
import { getRequest } from "../utils/api";
import { urlForUsers, wallets_endpoint } from "../constants/endpoints";

export const AppContext = createContext();

export const Provider = (props) => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");
  const [userProfile, setUserProfile] = useState("");

  //get profile pic
  const getProfile = async () => {
    console.log(user)
    try {
      const url = `${urlForUsers.getUserDetails}/${user}`;
      const res = await getRequest(url);

      if (res?.status === 200) {
        setUserProfile(res?.data);
      } else {
        setUserProfile("user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWallet = async () => {
    console.log(user)
    try {
      const url = `${wallets_endpoint.getWalletBalance}/${user}`;
      const res = await getRequest(url);

      if (res?.status === 200) {
        setWallet(res?.data?.walletBalance);
      } else {
        setWallet("wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let token = getStorageValue("__xTFTGweTHDeRTT__%", "");
    console.log("gotten storage value", token);
    if (token) {
      let decode = jwtDecode(token);
      setUser(decode.userId);
    }
    getProfile();
    getWallet();
  }, [user, wallet]);
  const userInfo = {
    user,
    wallet,
    setWallet,
    userProfile,
  };
  return (
    <AppContext.Provider value={userInfo}>{props.children}</AppContext.Provider>
  );
};
