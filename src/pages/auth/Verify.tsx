import { IonContent, IonLoading, IonPage } from '@ionic/react';
import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
// reactstrap components
import { Alert, Button, Card, CardBody, CardImg, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import { alertActions } from '../../actions/alert';
import actions from '../../actions/auth';
import axios from '../../helpers/axiosInterceptor';


const Verify: React.FC = (props: any) => {

	const [code, setCode] = useState("");

	const auth = useSelector((state: RootStateOrAny) => state.auth);
	const errorMsg = useSelector((state: RootStateOrAny) => state.auth.errorMsg);
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault()
		const phone = auth.user.phone
		const email = auth.user.email
		console.log(phone, email)

		dispatch(actions.verify({ code, phone, email }, props.history))
	}

	const resendOTP = async (e) => {
		try {
			const phone = auth.user.phone
			dispatch(alertActions.page_loader(true));
			await axios.post('/resend_otp', { phone_number: phone });
			dispatch(alertActions.page_loader(false));
		} catch (e) {
			dispatch(alertActions.page_loader(false));
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
									<p className="h4">Verify your Phone Number</p>
									<p className="h6">We have sent you verification code to your ({auth.user && auth.user.phone})</p>
								</div>
								{errorMsg && (
									<Alert color="warning">
										<strong>{errorMsg}</strong>
									</Alert>
								)}
								<Form role="form" onSubmit={onSubmit}>
									<FormGroup className="mb-3">
										<InputGroup className="input-group-alternative">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="ni ni-lock-circle-open" />
												</InputGroupText>
											</InputGroupAddon>
											<Input placeholder="Verification Code" type="number" name="code" onChange={e => setCode(e.target.value)} required />
										</InputGroup>
									</FormGroup>
									<div className="text-center">
										<Button
											block
											className="my-4 rounded-pill"
											color="warning"
											size="lg"
											type="submit"
										>
											Verify
                          				</Button>
									</div>
								</Form>

								<div className="text-center text-muted mb-4">
									<span>
										Didn't received the code? <span className="text-warning ml-2" onClick={resendOTP}>Resend</span>
									</span>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<IonLoading
					isOpen={auth.request}
					message={'Please wait...'}
				/>
			</IonContent>
		</IonPage>
	)
}

export default Verify;
