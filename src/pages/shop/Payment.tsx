import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import PaymentMethods from '../../components/Payments/payment-methods';
import { RootStateOrAny, useSelector } from 'react-redux';
import loadScript from '../../helpers/loadScript';

const Payment: React.FC = (props: any) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const total = useSelector((state: RootStateOrAny) => state.cart.total);
	const currency_symbol = useSelector((state: RootStateOrAny) => state.auth.currency_symbol);

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js', 'razorpay')
  }, [])

  return (
    <IonPage>

      <IonHeader className="bg-white ion-no-border border-bottom">
        <IonToolbar color="white">
          <IonTitle className="font-weight-bold">

            <IonIcon icon={arrowBackOutline} className="mr-2 align-text-top text-dark"
              onClick={() => props.history.goBack()}
            />
            Payment
          </IonTitle>
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen>
        <Container fluid={true} className="m-0 bg-white shadow py-3">
          <h6 className="font-weight-bold my-0 text-center text-uppercase">You have to pay</h6>
          <h2 className="font-weight-bold my-0 text-center">{(currency_symbol+total).toString()}</h2>
        </Container>

        <Container fluid={true} className="my-4">
          <h5 className="font-weight-bold my-0 text-center">Select your payment method:</h5>
          <Row className="my-0">
            <Col lg="5">
              <PaymentMethods history={props.history} />
            </Col>
          </Row>
          {/* <Button className="position-fixed fixed-bottom w-100 bg-success p-3 m-0 text-white" onClick={toggle}>Place the order</Button> */}
        </Container>

        <Modal isOpen={modal} toggle={toggle} backdrop={"static"} keyboard={true} style={{ top: '10%' }}>
          <ModalHeader toggle={toggle}>Order Info</ModalHeader>
          <ModalBody className="p-0">
            <h4 className="font-weight-bold my-0 text-center">
              {/* <IonIcon icon={closeCircleOutline} className="mt-2 text-warning" /> */}
              {/* <IonIcon icon={checkmarkCircleOutline} className="mt-2 text-warning" /> */}
            </h4>
            <Row>
              <Col xs="8" className="offset-2 px-0 pt-3">
                <img src={require('../../assets/img/icons/common/payment-success.svg')} alt="payment success" />
              </Col>
            </Row>
            <h5 className="font-weight-bold my-0 text-center text-default">Your order placed successfully</h5>
          </ModalBody>
          <ModalFooter className="justify-content-center">
            <Button block color="primary" href="/dashboard/orders">Go to Order</Button>
          </ModalFooter>
        </Modal>


      </IonContent>
    </IonPage >
  );
};

export default Payment;
