import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React, { useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import { isMobile } from 'react-device-detect';

import "./assets/scss/argon-design-system-react.scss?v1.1.0";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
/* Theme variables */
// import './theme/variables.css';
import "./assets/vendor/nucleo/css/nucleo.css";

import FullPageLoader from "./components/Utilities/FullPageLoader";
import { fcmInitialization } from "./helpers/fcm-init";
import PrivateRoute from "./helpers/privateRoutes";

import { push_register } from "./helpers/push_notification_ionic";
import RestrictedRoute from "./helpers/restrictedRoutes";

import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import RecoverPassword from "./pages/auth/RecoverPassword";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Dashboard from "./pages/dashboard/Index";
import TopCategories from "./pages/dashboard/TopCategories";
import AddAddress from "./pages/locations/AddAddress";
import ManageAddress from "./pages/locations/ManageAddress";
import Cart from "./pages/shop/Cart";
import Notifications from "./pages/shop/Notifications";
import Payment from "./pages/shop/Payment";
import Store from "./pages/shop/Store";

//Import Single Item
import SingleItem from "./pages/shop/singleItem"



import Intro from "./pages/intro/index";
import { Plugins } from "@capacitor/core";

const { Device } = Plugins;

const App: React.FC = () => {
  const page_loader = useSelector(
    (state: RootStateOrAny) => state.alert.page_loader
  );

  const isMobile = window.innerWidth <= 700;

  useEffect(() => {
    pushNotifications();
  }, []);

  const pushNotifications = async () => {
    const info = await Device.getInfo();
    if (info.platform === "web") {
      //Web FCM
      fcmInitialization();
    } else {
      //iOS/Android
      push_register();
    }
  };

  return (
    <IonApp>
      {page_loader && <FullPageLoader />}

      <IonReactRouter>
        {isMobile ? (
          <IonRouterOutlet>
            <RestrictedRoute path="/" exact={true} />
            <Route path={`/auth/login`} component={Login} exact={true} />
            <Route path={`/auth/register`} component={Register} exact={true} />
            <Route path={`/auth/verify`} component={Verify} exact={true} />
            <Route
              path={`/auth/recover`}
              component={RecoverPassword}
              exact={true}
            />
            <Route path={`/auth/logout`} component={Logout} exact={true} />

            <Route path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/shop" component={Store} />
            <PrivateRoute path="/top_category/:id" component={TopCategories} />
            <PrivateRoute path="/single/:id" component={SingleItem} />

            <PrivateRoute path={`/cart`} component={Cart} />

            <PrivateRoute path="/payment" component={Payment} />

            <PrivateRoute path="/address" component={ManageAddress} />
            <PrivateRoute path="/add-address" component={AddAddress} />

            <PrivateRoute path="/notifications" component={Notifications} />
          </IonRouterOutlet>
        ) : (
          <IonRouterOutlet>
            <Route path="/" component={Intro} exact={true} />
            <Redirect from="*" to="/" />
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
