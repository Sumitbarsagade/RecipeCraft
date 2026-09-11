import {
  useEffect,
} from "react";

import {
  useAppDispatch,
} from "../../store/hooks";

import {
  fetchCurrentUser,
   markAuthInitialized
} from "../../features/auth/authSlice";


const AuthInitializer = () => {

  const dispatch =
    useAppDispatch();


  useEffect(() => {

    const accessToken =
      localStorage.getItem(
        "accessToken"
      );


    /*
     * If there is an access token,
     * try to restore the session.
     */

    if (accessToken) {

      dispatch(
        fetchCurrentUser()
      );

    }
    else {

    dispatch(
      markAuthInitialized()
    );

  }

  }, [dispatch]);


  return null;
};


export default AuthInitializer;