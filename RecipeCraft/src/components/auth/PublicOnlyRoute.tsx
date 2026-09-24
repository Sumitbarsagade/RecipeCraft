import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useAppSelector,
} from "../../store/hooks";


const PublicOnlyRoute = () => {

  const {
    isAuthenticated,
    initialized,
  } = useAppSelector(
    (state) => state.auth
  );


  if (!initialized) {

    return null;

  }

 console.log("public route",isAuthenticated)
  if (isAuthenticated) {
  
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  return <Outlet />;
};


export default PublicOnlyRoute;