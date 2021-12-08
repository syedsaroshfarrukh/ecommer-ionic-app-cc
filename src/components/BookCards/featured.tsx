import { IonIcon, IonSlide, IonSlides } from "@ionic/react";
import { star, timeOutline } from "ionicons/icons";
import React from "react";
// reactstrap components
import { Card, CardBody, CardImg } from "reactstrap";
import Ripples from "react-ripples";

const slideOpts = {
  slidesPerView: "auto",
  speed: 400,
  zoom: false,
};

type ListProps = {
  history: any;
  books: any;
};

const FeaturedBooks: React.FC<ListProps> = ({ history, books }) => {
  const FeaturedElements = books.map((book: any) => {
    const { name, image, rating, id } = book;

    return (
      <IonSlide className="ml-3" style={{ width: "12rem" }} key={id}>
        <Ripples
          className="d-block"
          onClick={() => {
            setTimeout(function () {
              history.push(`/shop/${id}`);
            }, 275);
          }}
        >
          <Card className="shadow-sm p-0 m-0">
            <span className="featured-badge"></span>
            <CardImg className="rounded-lg" src={image} alt="" />
            <CardBody className="p-2 h-book text-left">
              <h6 className="my-0 font-weight-bold shop-name">{name}</h6>

              <div className="mt-1 d-flex align-items-center text-muted">
                <small>
                  <IonIcon icon={star} className="text-yellow" />
                  <b className="mx-1">{rating}</b>
                </small>
              </div>
            </CardBody>
          </Card>
        </Ripples>
      </IonSlide>
    );
  });

  return (
    <IonSlides pager={false} options={slideOpts}>
      {FeaturedElements}
    </IonSlides>
  );
};

export default FeaturedBooks;
