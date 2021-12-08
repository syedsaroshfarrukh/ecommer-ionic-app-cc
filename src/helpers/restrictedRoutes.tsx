import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const RestrictedRoute = ({ ...rest }) => {
  //Redux Store
  const authState = useSelector((state: RootStateOrAny) => state.auth);

  const AuthCheck = (props) => {
    let auth, auth_token;

    if (authState.user) {
      auth = authState;
      auth_token = authState.auth_token;
    } else {
      // Local Storage
      const storage = JSON.parse(
        localStorage.getItem("persist:storage") as any
      );
      if (storage) {
        // auth = storage.auth
        // auth_token = JSON.parse(auth).auth_token
        auth = JSON.parse(storage.auth);
        auth_token = auth.auth_token;
      }
    }
    // console.log(auth_token , auth , auth.user)
    if (auth && auth.user) {
      if (auth.user.verification_required && !auth.user.phone_verified)
        return <Redirect to="/auth/login" />;
      else if (
        !(auth.default_address && auth.default_address.id) &&
        !(authState.default_address && authState.default_address.id)
      )
        return (
          <Redirect
            to={{
              pathname: "/add-address",
              state: { redirectTo: "/dashboard/home" },
            }}
            // to="/dashboard/home"
          />
        );
      else return <Redirect to="/dashboard/home" />;
    } else return <Redirect to="/auth/login" />;
  };

  return <Route {...rest} render={(props) => AuthCheck(props)} />;
};

export default RestrictedRoute;
