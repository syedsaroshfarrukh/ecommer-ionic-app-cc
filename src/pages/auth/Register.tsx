import { IonContent, IonLoading, IonPage } from "@ionic/react";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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

const Register: React.FC = (props: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Histryyyyy", props.history);
    console.log("props", props);
    props.register({ name, email, phone, password }, props.history);
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
                src={require("../../assets/img/bg/welcome2.jpg")}
                alt="Card image cap"
              />
              <CardBody className="px-lg-5 py-lg-5 card-body mt-n5 rounded mx-3 shadow bg-secondary">
                <div className="text-center text-muted mb-4">
                  <p className="h3">Register</p>
                </div>
                <Form role="form" onSubmit={onSubmit}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
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
                    <PhoneInput
                      country={"pk"}
                      buttonClass="bg-white border-0"
                      inputClass="input-group-alternative border-0 w-100"
                      value={phone}
                      onChange={(v) => setPhone(v)}
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                    />
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
                  <div className="text-center">
                    <Button className="my-3" color="primary" type="submit">
                      Create account
                    </Button>
                  </div>
                </Form>

                <div className="text-center text-muted mb-4">
                  <span>
                    Already have an account?
                    <Link className="text-warning ml-2" to="/auth/login">
                      Login
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

export default connect(mapStateToProps, actions)(Register);
