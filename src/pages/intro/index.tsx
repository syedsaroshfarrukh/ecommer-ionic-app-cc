import { IonPage } from "@ionic/react";
import React, { useState } from "react";

const Intro: React.FC = (props: any) => {
  const [isMobileActive, setIsMobileActive] = useState(false);

  return (
    <IonPage>
      <header className="books-header landing-header">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light foodlicious-navbar mt-4">
            <div className="navbar-brand">
              <img
                src={require("../../assets/img/intro/logo.svg")}
                alt="books"
              />
            </div>
          </nav>
          <div className="header-content">
            <div className="row">
              <div className="col-md-6 mt-7">
                <h1 className="font-weight-bold">
                  books in your pocket.
                </h1>
               
                <button
                  className="btn btn-warning mb-4"
                  onClick={() => setIsMobileActive(true)}
                >
                  Start Ordering now
                </button>
              </div>
              <div className="col-md-6 mt-n8 d-flex flex-row-reverse">
                <div
                  className={`phone ${isMobileActive ? "awake" : " laid_down"}`}
                  id="phone_1"
                >
                  <iframe
                    src={window.location.protocol + "//" + window.location.host}
                    id="app_frame"
                    title="app_frame"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </IonPage>
  );
};

export default Intro;
