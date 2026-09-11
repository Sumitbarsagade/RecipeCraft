import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  useAppSelector,
} from "../../store/hooks";


const ProtectedRoute = () => {

  const location = useLocation();

  const {
    isAuthenticated,
    initialized,
    isLoading,
  } = useAppSelector(
    (state) => state.auth
  );


  /* =======================================================
     SESSION IS STILL BEING RESTORED
  ======================================================= */

  if (!initialized || isLoading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">

        <div className="text-center">

          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-[#E8DDD4]
              border-t-[#C8501A]
            "
          />

          <p className="mt-4 text-sm text-[#737C76]">
            Preparing your RecipeCraft account...
          </p>

        </div>

      </div>
    );
  }


  /* =======================================================
     NOT AUTHENTICATED
  ======================================================= */

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }


  /* =======================================================
     AUTHENTICATED
  ======================================================= */

  return <Outlet />;
};


export default ProtectedRoute;