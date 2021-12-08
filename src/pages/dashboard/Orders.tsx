import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { refreshOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import OrderItems from '../../components/BookCard/order-items';
import GeneralSkeletonText from '../../components/skeleton_text/general_book';
import axios from '../../helpers/axiosInterceptor';
import { useSelector, RootStateOrAny } from 'react-redux';


const Orders: React.FC = (props: any) => {

  const [orderList, setOrderList] = useState([])
  const [load, setLoad] = useState(false)
  const currency_symbol = useSelector((state: RootStateOrAny) => state.auth.currency_symbol);

  useEffect(() => {
    if (!load) {
      axios.get(`/orders`)
        .then(res => {
          const data = res.data
          setOrderList(data)
          
          setLoad(true);

          // setTimeout(() => {
          //   setLoad(false)
          // }, 30 * 1000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [load]);


  return (
    <IonPage>

      <IonHeader className="bg-white ion-no-border border-bottom">
        <IonToolbar color="white">
          <IonButtons slot="primary">
            <IonButton onClick={() => setLoad(false)} className="position-relative">
              <IonIcon icon={refreshOutline} className="text-muted" />
              {/* <span className="hint danger position-absolute"></span> */}
            </IonButton>
          </IonButtons>
          <IonTitle className="font-weight-bold text-dark">
            My Orders
          </IonTitle>
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen>

        <Container fluid={true} className="h-100">
          {/* <h5 className="font-weight-bold">Ongoing Orders</h5> */}
          <Row className="h-100">
            <Col>
              {load ? (
                orderList.length === 0 ?
                  (
                    <Container fluid={true} className="h-100 d-flex align-items-center">
                      <Col>
                        {/* <h4 className="font-weight-light text-center text-muted">You have no orders</h4> */}
                        <img src={require('../../assets/img/icons/common/no-orders.png')} className="dull-filter p-5 w-100" alt="pan" />
                        {/* <h1><IonIcon icon={receiptOutline} /></h1> */}
                      </Col>
                    </Container>
                  )
                  :
                  orderList.map((data: any) => {
                    return (
                      <Card key={data.id} className="shadow-lg my-3">
                        <CardHeader data-event={data.id}>
                          <Row>
                            <Col data-event={data.id} className="p-0 text-dark font-weight-bold">
                              Order {data.unique_id}
                              <small className="d-block" data-event={data.id}>{data.created_at}</small>
                            </Col>
                            <Col xs="4" className="p-0 text-right" data-event={data.id}>
                              <Badge color="success" >{data.status}</Badge>
                            </Col>
                          </Row>
                        </CardHeader>
                        {/* <Collapse isOpen={collapsedOrder === index}> */}
                        <CardBody className="p-3">

                          <OrderItems order_books={data.order_books} />

                          <Row className="flex-row flex-wrap shadow-0 py-2 px-3 border-bottom">
                            <Col className="p-0">
                              <h6 className="my-0 item-name">Other Charges </h6>
                            </Col>
                            <Col xs="3" className="p-0">
                              <span className="p-0 text-dark text-right d-block">{currency_symbol + (parseInt(data.delivery_charge) + parseInt(data.restaurant_charges) + parseInt(data.tax))}</span>
                            </Col>
                          </Row>
                          {data.coupon_discount !== '0' && (
                            <Row className="flex-row flex-wrap shadow-0 py-2 px-3 border-bottom">
                              <Col className="p-0">
                                <h6 className="my-0 item-name text-success">Coupon Discount </h6>
                              </Col>
                              <Col xs="3" className="p-0">
                                <span className="p-0 text-right d-block text-success">{currency_symbol + data.coupon_discount}</span>
                              </Col>
                            </Row>
                          )}

                          <h6 className="text-right font-weight-bold">{currency_symbol + data.total}</h6>
                        </CardBody>
                        {/* </Collapse> */}
                      </Card>
                    )
                  })
              ) : [...Array(5)].map((e, i) => (<Container className="mt-3 p-0" key={i}><GeneralSkeletonText /></Container>))}
            </Col>
          </Row>
        </Container>
      </IonContent>


    </IonPage>
  );
};

export default Orders;
