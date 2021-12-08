import { IonContent, IonPage, IonAlert, IonLoading } from '@ionic/react';
import React, { useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Card, CardBody, CardImg, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";

import axios from '../../helpers/axiosInterceptor';

const RecoverPassword: React.FC = (props: any) => {

	const [email, setEmail] = useState("");
	const [error, setError] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const passwordReset = async () => {
		setShowLoading(true)
		try {
			const response = await axios.post('/password/reset', { email });
			console.log(response)
			setShowAlert(true)
			setShowLoading(false)
		} catch (e) {
			setError(true)
			setShowLoading(false)
		}
	}

	return (
		<IonPage>
			<IonContent className="bg-secondary">
				<Row className="justify-content-center">
					<Col lg="5">
						<Card className="bg-secondary border-0">
							<CardImg top width="100%" src={require('../../assets/img/bg/welcome3.jpg')} alt="Card image cap" />
							<CardBody className="px-lg-5 py-lg-5 card-body mt-n5 rounded mx-3 shadow bg-secondary">
								<div className="text-center text-muted mb-4">
									<p className="h4">Forgot Password?</p>
									<p className="h6">Enter your registered email address.</p>
									{error && (<p className="h6 text-warning">Error: User not found.</p>)}
								</div>
								<Form role="form">
									<FormGroup className="mb-3">
										<InputGroup className="input-group-alternative">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="ni ni-email-83" />
												</InputGroupText>
											</InputGroupAddon>
											<Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
										</InputGroup>
									</FormGroup>
									<div className="text-center">
										<Button
											block
											className="my-4 rounded-pill"
											color="warning"
											size="lg"
											type="button"
											onClick={passwordReset}
										>
											Recover Password
                          </Button>
									</div>
								</Form>

								<div className="text-center text-muted mb-4">
									<span>
										Don't have an account?
												<Link
											className="text-warning ml-2"
											to="/auth/register"
										>
											Sign up
												</Link>
									</span>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</IonContent>
			<IonLoading
				cssClass='my-custom-class'
				isOpen={showLoading}
				onDidDismiss={() => setShowLoading(false)}
				message={'Please wait...'}
			/>
			<IonAlert
				isOpen={showAlert}
				onDidDismiss={() => setShowAlert(false)}
				header={'Password Mailed'}
				message={
					'We have e-mailed the password to your <strong>' + email + '</strong>'}
				buttons={[
					{
						text: 'Login now',
						handler: () => {
							props.history.goBack()
						}
					}
				]}
			/>
		</IonPage >
	)
}

export default RecoverPassword;
