import {
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonModal,
  } from "@ionic/react";
  import { arrowBackOutline, cart, locationOutline, star } from "ionicons/icons";
  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { Badge, Col, Container, Row } from "reactstrap";
  import FeaturedMenu from "../../components/BookCard/featured";
  import MenuList from "../../components/BookCard/general";
  import Addons from "../../components/BookCard/addons";
  import axios from "../../helpers/axiosInterceptor";
  import FeaturedSkeletonText from "../../components/skeleton_text/featured_book";
  import { useSelector, RootStateOrAny } from "react-redux";
  import Zoom from 'react-reveal/Zoom';
    
  // reactstrap components
  import { Card, CardBody, CardHeader, CardImg } from "reactstrap";
  import PackBoxCounter from "../../components/Utilities/pack-box-counter";
  
  const SingleItem: React.FC = (props: any) => {



    const [hide, setHide] = React.useState(false);
  
    const [details, setDetails] = useState({} as any);
    const [address, setAddress] = useState("");
    const [bookList, setbookList] = useState([]);
    const [load, setLoad] = useState(false);
  
    //Selectors
    const getBookState = (store) => store.cart.books;
  
    // Get index
    const getAllbooks = (store) => {
      const books = getBookState(store) ?? [];
      let total = 0,
        addons_cost = 0;
      books.map((book) => {
        book.addons_book.map((d) => {
          d.addons.map((a) => (addons_cost += parseInt(a.price)));
        });
        return (total += book.count * book.price + addons_cost);
      });
      return { count: books.length, total };
    };
  
    //Redux Hooks
    const basket_book_id = useSelector(
      (state: RootStateOrAny) => state.cart.restaurant_id
    );
    const basket = useSelector((state: RootStateOrAny) => getAllbooks(state));
    const currency_symbol = useSelector(
      (state: RootStateOrAny) => state.auth.currency_symbol
    );
  
    const hideBar = (e: any) => {
      console.log(e.scrollTop);
    };
  
    useEffect(() => {
    console.log(props)
      window.addEventListener("ion-content", hideBar);
      axios
        .get(`/booke/${props.match.params.id}`)
        .then((res) => {
          const data = res.data;
          setDetails(data);
        
          setLoad(true);
  
          const address = data.addresses[0];
          const add =
            address.street + ", " + address.city + ", " + address.postal_code;
          setAddress(add);
        })
        .catch((err) => {
          console.log(err);
          setLoad(true);
        });
    }, [props.match.params.id]);
  
    return (
      <IonPage>
        {console.log("props", bookList)}
        {(hide || (load && bookList.length <= 2)) && (
          <IonHeader className="bg-white ion-no-border border-bottom">
            <IonToolbar color="white">
              <IonTitle className="font-weight-bold">
                <IonIcon
                  icon={arrowBackOutline}
                  className="mr-2 align-text-top text-default"
                  onClick={() => props.history.goBack()}
                />
                {details.name}
              </IonTitle>
            </IonToolbar>
          </IonHeader>
        )}
        <IonContent
          fullscreen
          scrollEvents={true}
          onIonScrollStart={(e) => {
            setHide(true);
          }}
        >
          {load && (
            <div
              id="shop-header"
              className="shop-header"
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.85)),url(${details.image})`,
              }}
            >
              <Row className="shop-content mx-0">
                <Row className="mx-0 p-3 w-100">
                  {details.featured === 1 && (
                    <Badge color="danger" pill className="mx-1">
                      Featured
                    </Badge>
                  )}
                  
                  <h3 className="my-0 font-weight-light text-white text-left w-100">
                    {details.name}
                  </h3>
                 
                </Row>
              </Row>
            </div>
          )}
            <Container fluid={true} className="my-3 p-0">
            <h5 className="font-weight-bold px-3">Description</h5>
            <Row className="my-2">
              <Col lg="5">
                {load ? (
                  details.description  ? (
                    <div className="bg-white shadow-sm py-4 m-3 text-center">
                     {details.description}
                    </div>                  ) : (
                    <div className="bg-white shadow-sm py-4 m-3 text-center">
                      No Description
                    </div>
                  )
                ) : (
                  <FeaturedSkeletonText />
                )}
              </Col>
            </Row>
          </Container>

          <Card className="flex-row flex-wrap shadow-sm p-2 mb-3 border-0" key={details.id}>
							<Col xs="3" className="p-0">
								<CardHeader className="border-0 p-0 py-0 pr-1">
									<Zoom>
										<CardImg className="rounded-lg" src={details.image} alt="" />
									</Zoom>
								</CardHeader>
							</Col>
							<Col className="p-0">
								<CardBody className="px-2 py-0 h-restaurant">
									<h6 className="my-0 font-weight-bold item-name">{details.name} </h6>
								
									<div className="d-flex align-items-center justify-content-between text-muted pr-2 pt-1">
										<Col xs="12" className="p-0 d-flex">
											<span>Price = </span>
											<span className="mx-2">{currency_symbol + details.price}</span>
										</Col>
									</div>
								</CardBody>
							</Col>
							<Col xs="3" className="p-0 pt-1">
								<PackBoxCounter book={details} id={details.id} />
							</Col>
			</Card>

          
          <Link
            className="row fixed-bottom w-100 bg-primary p-3 m-0 text-white"
            to="/cart"
          >
            <Col xs="8" className="p-0">
              {basket.count} Item | {currency_symbol + basket.total}
            </Col>
            <Col className="text-right p-0">
              Checkout
              <IonIcon icon={cart} className="ml-2 align-text-top text-white" />
            </Col>
          </Link>
      
  
          <Addons />
        </IonContent>
      </IonPage>
    );
  };
  
  export default SingleItem;
  