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
import FeaturedBooks from "../../components/BookCard/featured";
import Addons from "../../components/BookCard/addons";
import axios from "../../helpers/axiosInterceptor";
import FeaturedSkeletonText from "../../components/skeleton_text/featured_book";
import BookList from "../../components/BookCards/general";
import GeneralSkeletonText from "../../components/skeleton_text/general_book";
import { useSelector, RootStateOrAny } from "react-redux";

const Home: React.FC = (props: any) => {
  const [hide, setHide] = React.useState(false);

  const [details, setDetails] = useState({} as any);
  const [address, setAddress] = useState("");
  const [bookslist, setbookslist] = useState([]);
  const [featuredBooks, setfeaturedBooks] = useState([]);
  const [load, setLoad] = useState(false);

  //Selectors
  const getbookState = (store) => store.cart.books;

  // Get index
  const getAllbooks = (store) => {
    const books = getbookState(store) ?? [];
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
  const basket_restaurant_id = useSelector(
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
    window.addEventListener("ion-content", hideBar);
    axios
      .get(`/books`)
      .then((res) => {
        const data = res.data;
        setDetails(data);
        setbookslist(data);
        let featuredBooks = data.filter(function (e) {
          return e.featured === 1;
        });
        setfeaturedBooks(featuredBooks);
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
      {console.log("props", bookslist)}
      {(hide || (load && bookslist.length <= 2)) && (
        <IonHeader className="bg-white ion-no-border border-bottom">
          <IonToolbar color="white">
            <IonTitle className="font-weight-bold">
              {/* <IonIcon
                icon={arrowBackOutline}
                className="mr-2 align-text-top text-default"
                onClick={() => props.history.goBack()}
              /> */}
            Book Shop
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
              background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.85)),url(${details[0].image})`,
            }}
          >
            <Row className="shop-content mx-0">
             
              <Row className="mx-0 pt-3 w-100 border-top">
                <Col >
              
                  <h6 className="d-block w-100 m-0">
                    <IonIcon icon={star} className="text-white" />
                    <span className="mx-1 text-white">{details.rating}</span>
                  </h6>
                  <p className="d-block w-100 m-0">
                    <small className="text-light">User Ratings</small>
                  </p>
                </Col>
                    <span className="mx-1 text-white">{details.for_two}</span>
              </Row>
            </Row>
          </div>
        )}
        <Container fluid={true} className="my-3 p-0">
          <h5 className="font-weight-bold px-3">Featured Books</h5>
          <Row className="my-2">
            <Col lg="5">
              {load ? (
                featuredBooks.length > 0 ? (
                  <FeaturedBooks
                    restaurant_id={details.id}
                  />
                ) : (
                  <div className="bg-white shadow-sm py-4 m-3 text-center">
                    No featured books available
                  </div>
                )
              ) : (
                <FeaturedSkeletonText />
              )}
            </Col>
          </Row>
        </Container>

        <Container fluid={true} className="mt-3 pb-5">
          <h5 className="font-weight-bold">Recommended for you</h5>
          <Row>
            <Col lg="5">
              {load ? (
                bookslist.length > 0 ? (
                  <BookList
                    history={props.history}
                    books={bookslist}
                  />
                ) : (
                  <div className="bg-white shadow-sm py-4 my-2 w-100 text-center">
                    No Books available
                  </div>
                )
              ) : (
                [...Array(4)].map((e, i) => <GeneralSkeletonText key={i} />)
              )}
            </Col>
          </Row>
        </Container>

        {load && basket.count > 0 && (
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
        )}

        <Addons />
      </IonContent>
    </IonPage>
  );
};

export default Home;
