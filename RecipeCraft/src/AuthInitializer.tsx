import { useEffect } from "react";

import {
  useAppDispatch,
} from "./store/hooks";

import {
  fetchCurrentUser,
} from "./features/auth/authSlice";


const AuthInitializer = () => {

  const dispatch =
    useAppDispatch();

  useEffect(() => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (token) {

      dispatch(
        fetchCurrentUser()
      );

    }

  }, [dispatch]);


  return null;
};


export default AuthInitializer;