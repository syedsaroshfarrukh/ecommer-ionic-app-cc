import { IonIcon } from "@ionic/react";
import { star, walletOutline, timeOutline } from "ionicons/icons";
import React from "react";
import { Zoom } from "react-reveal";
import Ripples from "react-ripples";
// reactstrap components
import { Badge, Card, CardBody, CardHeader, CardImg, Col } from "reactstrap";

type ListProps = {
  history: any;
  books: any;
};

const BooksList: React.FC<ListProps> = ({ history, books }) => {
  const BooksList = books.map((book: any) => {
    const { id, name, image, rating, delivery_time, for_two, is_veg , price } =
      book;

    return (
      <>
        {/* {console.log("Restuarant", book)} */}
        <Ripples
          className="shadow-sm mb-3 border"
          onClick={() => {
            setTimeout(function () {
              history.push({
                pathname: `/single/${id}`,
                state: { id: id },
              });
            }, 175);
          }}
          key={id}
        >
          <Card className="flex-row flex-wrap p-2 border-0" key={name}>
            <Col xs="3" className="p-0">
              <CardHeader className="border-0 p-0 py-0">
                <Zoom>
                  <CardImg className="rounded-lg" src={image} alt="" />
                </Zoom>
              </CardHeader>
            </Col>
            <Col xs="9" className="p-0">
              <CardBody className="pl-3 pr-0 py-0 h-book">
                <h6 className="my-0 font-weight-bold">{name} </h6>
                <small className="text-muted">
                  <IonIcon className="mr-1 text-success" icon={walletOutline} />
                  Price:- {price}
                </small>
                <div className="mt-1 d-flex align-items-center justify-content-between text-muted">
                  <Col xs="6" className="p-0 text-left">
                    <small className="float-left">
                      <IonIcon icon={star} className="text-yellow" />
                      <b className="ml-1">{rating}</b>
                    </small>
                    {/* <small className="float-right">
                      <IonIcon icon={timeOutline} className="align-middle" />{" "}
                      {delivery_time} mins
                    </small> */}
                  </Col>
                  {/* <Col xs="6" className="p-0 text-center">
                    {is_veg === 1 && (
                      <Badge color="success" pill>
                        Pure Veg
                      </Badge>
                    )}
                  </Col> */}
                </div>
              </CardBody>
            </Col>
          </Card>
        </Ripples>
      </>
    );
  });

  return <>{BooksList}</>;
};

export default BooksList;
