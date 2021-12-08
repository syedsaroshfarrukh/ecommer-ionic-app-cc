import React from "react";
// reactstrap components
import { Col, Row } from "reactstrap";

const FullPageLoader: React.FC = () => {
  return (
    <Row className="position-fixed fixed-top bg-white h-100">
      <Col className="d-flex align-items-center justify-content-center">
        <Row>
          <img
            className="img-fluid"
            src={require("../../assets/img/icons/common/loading4.gif")}
            alt="loading"
            style={{ transform: "scale(1)" }}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default FullPageLoader;
