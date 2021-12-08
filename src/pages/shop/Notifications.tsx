import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import NotificationItems from '../../components/Navbars/Notifications';
import axios from '../../helpers/axiosInterceptor';
import GeneralSkeletonText from '../../components/skeleton_text/general_book';

const Notifications: React.FC = (props: any) => {

  const [notifications, setNotifications] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    axios.get(`/user/notifications`)
      .then(res => {
        setNotifications(res.data);
        setLoad(true)
      })
      .catch(err => {
        console.log(err)
        setLoad(true)
      })
  }, []);

  const ShowNotification = () => {
    console.log(load)
    if (load) {
      if (notifications.length > 0)
        return <NotificationItems notifications={notifications} />
      else {
        return (
          <div className="bg-white shadow-sm py-4 m-3 text-center">
            You have no new Notifications
          </div>
        )
      }
    } else
      return <GeneralSkeletonText />
  }


  return (
    <IonPage>

      <IonHeader className="bg-white ion-no-border border-bottom">
        <IonToolbar color="white">
          <IonButtons slot="start">
            <IonButton onClick={() => props.history.goBack()}>
              <IonIcon icon={arrowBackOutline} className="mr-2 align-text-top text-dark" />
            </IonButton>
          </IonButtons>
          <IonTitle className="p-0">
            <small className="font-weight-bold">Notifications</small>
          </IonTitle>
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen>
        <Container fluid={true} className="my-3">
          <h6 className="font-weight-bold">Recent Notifications</h6>
          <Row className="my-2">
            <Col lg="5" className="py-2">

              {/* {load ? ((notifications.length > 0) ? <NotificationItems notifications={notifications} />
                : (
                  <div className="bg-white shadow-sm py-4 m-3 text-center">
                    You have no new Notifications
                  </div>
                )) : <GeneralSkeletonText />} */}
              {/* {showNotification} */}
              <ShowNotification />
            </Col>
          </Row>
        </Container>

      </IonContent>


    </IonPage >
  );
};

export default Notifications;
