import React from "react";
import {
  RootStateOrAny,
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const useSelector: TypedUseSelectorHook<RootStateOrAny> =
  useReduxSelector;

const PrivateRoute = ({ component: Component, ...rest }) => {
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
        auth = JSON.parse(storage.auth);
        auth_token = auth.auth_token;
      }
    }

    if (auth_token && auth && auth.user) {
      if (auth.user.verification_required && !auth.user.phone_verified)
        return <Redirect to="/login" />;
      else if (
        (auth.default_address && auth.default_address.id) === undefined &&
        (authState.default_address && authState.default_address.id) ===
          undefined
      )
        return (
          <Redirect
            to={{
              pathname: "/add-address",
              state: { redirectTo: "/dashboard/home" },
            }}
          />
        );
      else return <Component {...props} />;
    } else return <Redirect to="/auth/login" />;
  };

  return <Route {...rest} render={(props) => AuthCheck(props)} />;
};

export default PrivateRoute;
