import { IonContent, IonLoading, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  UncontrolledAlert,
} from "reactstrap";
import actions from "../../actions/auth";

const Login: React.FC = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login({ email, password }, props.history);
  };

  return (
    <IonPage>
      <IonContent className="bg-secondary">
        <Row className="justify-content-center">
          <Col lg="5">
            <Card className="bg-secondary border-0">
              <CardImg
                top
                width="100%"
                src={require("../../assets/img/bg/welcome3.jpg")}
                alt="Card image cap"
              />
              <CardBody className="px-lg-5 py-lg-5 card-body mt-n5 rounded mx-3 shadow bg-secondary">
                <div className="text-center text-muted mb-3 px-3">
                  {/* <p className="h3">Welcome</p> */}
                  <img
                    src={require("../../assets/img/intro/logo2.svg")}
                    alt="Book"
                  />
                </div>
                <Form role="form" onSubmit={onSubmit}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  {props.state.errorMsg && (
                    <UncontrolledAlert color="warning">
                      <strong>{props.state.errorMsg}</strong>
                    </UncontrolledAlert>
                  )}
                  <div className="text-left text-muted my-3">
                    <span>
                      <Link className="text-warning" to="/auth/recover">
                        Forgot Password?
                      </Link>
                    </span>
                  </div>
                  <div className="text-center">
                    <Button
                      block
                      className="my-1 rounded-pill"
                      color="warning"
                      size="lg"
                      type="submit"
                    >
                      Sign in
                    </Button>
                  </div>
                </Form>

                <div className="text-center text-muted my-4">
                  <span>
                    Don't have an account?
                    <Link className="text-warning ml-2" to="/auth/register">
                      Sign up
                    </Link>
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <IonLoading isOpen={props.state.request} message={"Please wait..."} />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => {
  return { state: state.auth };
};

export default connect(mapStateToProps, actions)(Login);
