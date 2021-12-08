import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  compassOutline,
  personOutline,
  receiptOutline,
  searchOutline,
} from "ionicons/icons";
import React from "react";
import { Redirect } from "react-router-dom";
import PrivateRoute from "../../helpers/privateRoutes";
import Home from "../shop/Store";
// import Home from "./Home";
import Orders from "./Orders";
import Profile from "./Profile";
import Search from "./Search";

interface RouteProps {
  match?: any;
}

const DashboardIndex: React.FC<RouteProps> = ({ match }) => (
  <IonTabs>
    <IonRouterOutlet>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
      <PrivateRoute path={`${match.url}/home`} component={Home} exact={true} />
      <PrivateRoute
        path={`${match.url}/search`}
        component={Search}
        exact={true}
      />
      <PrivateRoute
        path={`${match.url}/orders`}
        component={Orders}
        exact={true}
      />
      <PrivateRoute path={`${match.url}/profile`} component={Profile} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href={`${match.url}/home`}>
        <IonIcon icon={compassOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="search" href={`${match.url}/search`}>
        <IonIcon icon={searchOutline} />
        <IonLabel>Explore</IonLabel>
      </IonTabButton>
      <IonTabButton tab="orders" href={`${match.url}/orders`}>
        <IonIcon icon={receiptOutline} />
        <IonLabel>Orders</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href={`${match.url}/profile`}>
        <IonIcon icon={personOutline} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default DashboardIndex;
