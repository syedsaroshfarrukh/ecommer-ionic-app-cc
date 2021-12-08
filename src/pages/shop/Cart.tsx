import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackOutline, cardOutline, chevronForward } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import Ripples from 'react-ripples';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import CartBillings from '../../components/BookCard/cart-billing';
import CartItems from '../../components/BookCard/cart-items';
import axios from '../../helpers/axiosInterceptor';

import actions from '../../actions/cart'
import { Link } from 'react-router-dom';

const Cart: React.FC = (props: any) => {

	const [data, setData] = useState({
		details: {},
		charges: {},
		address: ''
	} as any);
	const [load, setLoad] = useState(false);
	const [coupon, setCoupon] = useState({
		code: '',
		request: false,
		returnData: false
	});

	//Selectors
	const getBookState = store => store.cart.books

	// Get index
	const getAllbooks = (store) => {
		const books = getBookState(store) ?? []
		let total = 0
		books.map((book) => {
			let addons_cost = 0
			book.addons_book.map(d =>
				d.addons.map(d => addons_cost += parseInt(d.price))
			)
			return total += (book.count * book.price) + addons_cost
		})
		return { count: books.length, total }
	}

	//Redux Hooks
	const basket_book_id = useSelector((state: RootStateOrAny) => state.cart.book_id);
	const couponStore = useSelector((state: RootStateOrAny) => state.cart.coupon);
	const sub_total = useSelector((state: RootStateOrAny) => getAllbooks(state));
	const default_address = useSelector((state: RootStateOrAny) => state.auth.default_address);
	const currency_symbol = useSelector((state: RootStateOrAny) => state.auth.currency_symbol);

	const dispatch = useDispatch();

	useEffect(() => {
		if (basket_book_id === '' || basket_book_id === undefined)
			return

		axios.get(`/cart/${basket_book_id}?t=${new Date().getTime()}`)
			.then(res => {
				const data = res.data
				setData({
					details: data.restaurant_details,
					charges: data.charges,
					address: data.address
				})
				setLoad(true);
			})
			.catch(err => {
				console.log(err)
			})
	}, [basket_book_id]);


	const couponSubmit = () => {

		if (coupon.code.trim() === '')
			return

		axios.post(`/coupon/verify`, { coupon_code: coupon.code })
			.then(res => {
				const data = res.data
				setCoupon({ ...coupon, request: true, returnData: res.data });
				if (data)
					dispatch(actions.coupon_add(res.data))
				else
					dispatch(actions.coupon_remove())
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<IonPage>
			<IonHeader className="bg-white ion-no-border border-bottom">
				<IonToolbar color="white">
					<IonButtons slot="start">
						<IonButton onClick={() => props.history.goBack()}>
							<IonIcon icon={arrowBackOutline} className="mr-2 align-text-top text-dark" />
						</IonButton>
					</IonButtons>
					<IonTitle className="p-0">
						<small className="font-weight-bold">Cart</small>
					</IonTitle>
				</IonToolbar>
			</IonHeader>


			<IonContent fullscreen>
				{(basket_book_id === '' || basket_book_id === undefined || (sub_total.count === 0 && sub_total.total === 0)) ?
					(
						<Container fluid={true} className="h-100 d-flex align-items-center">
							<Col>
								<h4 className="font-weight-bold text-center">Your cart is empty</h4>
								<img src={require('../../assets/img/icons/common/pan-toss.png')} className="p-4 w-100" alt="pan" />
								<p className="font-weight-bold text-center text-default">Good food gives you Good mood. <br />Add something to let us start cooking</p>
							</Col>
						</Container>
					)
					:
					(
						<>
							<Container fluid={true} className="my-3">
								<h6 className="font-weight-bold">ITEM IN CART</h6>
								<Row className="my-2">
									<Col lg="5" className="py-2 bg-white">
										<CartItems currency_symbol={currency_symbol} />
									</Col>
								</Row>
							</Container>

							<Container fluid={true} className="my-3 bg-white">
								<Row>
									<Col xs="2">
										<h3 className="m-0"> <IonIcon icon={cardOutline} className="text-muted mr-1 align-text-top" /> </h3>
									</Col>
									<Col>
										<Input placeholder="COUPONS CODE" onChange={(e) => setCoupon({ ...coupon, code: e.target.value })} defaultValue={couponStore && couponStore.coupon_code} className="border-0 shadow-0 p-0 font-weight-bold text-primary text-uppercase" type="text" />
									</Col>
									<Col xs="2">
										<Ripples className="p-0" onClick={couponSubmit}>
											<h3 className="m-0"> <IonIcon icon={chevronForward} className="text-muted mr-1 align-text-top" /> </h3>
										</Ripples>
									</Col>
								</Row>
								<Row>
									<Col className="ml-2">
										{(coupon.request || (couponStore && couponStore.coupon_code)) && (
											couponStore.id ? (
												<>
													<small className="text-success">Applied Coupon successfully!</small>
													<small className="text-danger ml-3 font-weight-bold" onClick={() => { setCoupon({ ...coupon, code: '', request: false, returnData: false }); dispatch(actions.coupon_remove()) }}>REMOVE COUPON</small>
												</>
											) :
												<small className="text-danger">Invalid Coupon. Try again!</small>
										)}
									</Col>
								</Row>
							</Container>

							<Container fluid={true} className="mt-3 pb-8">
								<h6 className="font-weight-bold">INVOICE DETAILS</h6>
								<Row>
									<Col lg="5" className="bg-white py-2 px-0">
										{load && (
											<CartBillings coupon={couponStore} sub_total={sub_total.total} currency_symbol={currency_symbol} charges={data.charges} />
										)}
									</Col>
								</Row>
							</Container>

							<Container fluid={true} className="position-fixed fixed-bottom w-100 bg-white p-0 shadow-lg border-top">
								<Row className="m-0 px-3 pt-3">
									<Col className="p-0">
										<h6 className="font-weight-bold">DELIVER TO</h6>
									</Col>
									<Col xs="3" className="p-0">
										<Link to="/address">
											<Button color="warning" size="sm" outline type="button">
												CHANGE
              				</Button>
										</Link>
									</Col>
								</Row>
								<Row className="m-0 py-0 px-3">
									<h6 className="font-weight-light text-capitalize">{(default_address && (<><b className="font-weight-bold"> {default_address.label} - </b> {default_address.full_address}</>)) ?? 'Add new address'}</h6>
								</Row>
								<Link to="/payment">
									<Button className="w-100 bg-success p-3 m-0 text-white">Proceed to Pay Now</Button>
								</Link>
							</Container>
						</>
					)}
			</IonContent>


		</IonPage >
	);
};

export default Cart;
