import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import SavedAddress from '../../components/Addresses/saved-address-items';

const ManageAddress: React.FC = (props: any) => {

  return (
    <IonPage>

      <IonHeader className="bg-white ion-no-border border-bottom">
        <IonToolbar color="white">
          <IonTitle className="font-weight-bold">

            <IonIcon icon={arrowBackOutline} className="mr-2 align-text-top text-dark"
              onClick={() => props.history.goBack()}
            />
            Manage Address
          </IonTitle>
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen>
        <Container fluid={true} className="my-3 pb-6">
          <h6 className="font-weight-bold">Saved Address</h6>
          <small className="text-default font-weight-bold">Select a address to mark it as default</small>
          <Row className="my-2">
            <Col lg="5" className="py-2 bg-white">
              <SavedAddress history={props.history}/>
            </Col>
          </Row>
        </Container>
        <Button className="position-fixed fixed-bottom w-100 bg-success p-3 m-0 text-white" href="/add-address">Add new Address</Button>
      </IonContent>


    </IonPage>
  );
};

export default ManageAddress;
