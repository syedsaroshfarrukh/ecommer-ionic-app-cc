import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { camera, lockOpen, notifications, receipt } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from '../../helpers/axiosInterceptor';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

import { Plugins, CameraResultType } from "@capacitor/core";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

import actions from '../../actions/auth'
import Logout from '../auth/Logout';

const { Camera } = Plugins;

const Profile: React.FC = (props: any) => {

	const [modal, setModal] = useState(false);

	const dispatch = useDispatch();
	const user = useSelector((state: RootStateOrAny) => state.auth.user);

	const toggle = () => setModal(!modal);

	useEffect(() => {
		defineCustomElements(window);
	}, [])

	const updateAvatar = async (e) => {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.DataUrl
		})

		const imageUrl: any = image.dataUrl
		let blob = await fetch(imageUrl).then(r => r.blob()).then(blobFile => new File([blobFile], `image_${Math.floor(Math.random() * 10000000) + 1}.${image.format}`, { type: `image/${image.format}` }))

		let data = new FormData();
		data.append('image', blob);

		axios.post('/user/profile/image_update', data, {
			headers: {
				'accept': 'application/json',
				'Content-Type': `multipart/form-data;`,
			}
		}).then((response) => {
			console.log(response);
			dispatch(actions.update_avatar(response.data))
		}).catch((error) => {
			console.log(error);
		});
	}

	const logout = async (e) => {
		localStorage.clear();
		dispatch(actions.logout())
	}


	// useEffect(() => {
	// 	axios.get(`/profile`)
	// 		.then(res => {
	// 			const data = res.data
	// 			setProfile(data)
	// 			setLoad(true);
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 		})
	// }, []);

	return (
		<IonPage>
			<IonHeader className="bg-white ion-no-border border-bottom">
				<IonToolbar color="white">

					<IonTitle className="font-weight-bold text-default">
						Profile
         			 </IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>

				<Container className="px-4">
					<Card className="shadow-sm mt-7">
						<Row className="justify-content-center mt-n6">
							<Col xs="5">
								<div className="card-profile-image position-relative">
									<img
										alt="..."
										className="img-fluid rounded-circle shadow-lg"
										src={(user && user.avatar) ?? require('../../assets/img/icons/common/user.png')}
									/>
									<Button onClick={updateAvatar} color="primary" size="sm" type="button" className="camera-btn position-absolute rounded-circle px-2 py-1">
										<h5 className="m-0 p-0"> <IonIcon icon={camera} className="align-text-top text-white" /> </h5>
									</Button>

								</div>
							</Col>
						</Row>

						<Row className="justify-content-center mt-2 p-2">
							<Col xs="12">
								<Row className="m-0 p-2 border-bottom">
									<Col xs="12">
										<h6 className="w-100 text-left m-0 text-muted">Full Name</h6>
									</Col>
									<Col>
										<h6 className="font-weight-bold w-100 text-muted m-0">{user && user.name}</h6>
									</Col>
								</Row>
								<Row className="m-0 p-2 border-bottom">
									<Col xs="12">
										<h6 className="w-100 text-left m-0 text-muted">Email</h6>
									</Col>
									<Col>
										<h6 className="font-weight-bold w-100 text-muted m-0">{user && user.email}</h6>
									</Col>
								</Row>
								<Row className="m-0 p-2 border-0">
									<Col xs="12">
										<h6 className="w-100 text-left m-0 text-muted">Phone</h6>
									</Col>
									<Col>
										<h6 className="font-weight-bold w-100 text-muted m-0">{user && user.phone}</h6>
									</Col>
								</Row>
							</Col>
						</Row>

					</Card>

				</Container>

				<Container className="px-4">
					<Card className="shadow-sm mt-2">
						<Row className="justify-content-center p-2">
							<Col xs="12">
								<Row className="m-0 p-2 border-bottom">
									<Col>
										<Link to="/dashboard/orders">
											<h6 className="w-100 text-left m-0 text-muted">
												<IonIcon icon={receipt} className="mr-4 text-light" />
											My Order</h6>
										</Link>
									</Col>
								</Row>
								<Row className="m-0 p-2 border-bottom">
									<Col>
										<Link to="/notifications">
											<h6 className="w-100 text-left m-0 text-muted">
												<IonIcon icon={notifications} className="mr-4 text-light" />Notifications</h6>
										</Link>
									</Col>
								</Row>
								<Row className="m-0 p-2">
									<Col>
										<div onClick={logout}>
											<h6 className="font-weight-light w-100 text-left m-0 text-muted">
												<IonIcon icon={lockOpen} className="mr-4 text-light" />Logout</h6>
										</div>
									</Col>
								</Row>
							</Col>
						</Row>
					</Card>
				</Container>

				<Modal isOpen={modal} toggle={toggle} backdrop={true} keyboard={true} style={{ top: '20%' }}>
					<ModalHeader toggle={toggle}>Update Info</ModalHeader>
					<ModalBody>
						<Input
							id="exampleFormControlInput1"
							placeholder="name@example.com"
							type="email"
						/>
					</ModalBody>
					<ModalFooter className="justify-content-center">
						<Button block color="success" onClick={toggle}>Update</Button>
					</ModalFooter>
				</Modal>

			</IonContent>
		</IonPage>
	);
};

export default Profile;
