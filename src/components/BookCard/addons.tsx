import React, { useState } from "react";
import Zoom from "react-reveal/Zoom";
// reactstrap components
import {
	Card,
	CardBody,
	CardHeader,
	CardImg,
	Col,
	Row,
	Container,
} from "reactstrap";
import PackBoxCounter from "../Utilities/pack-box-counter";

import actions from "../../actions/cart";

import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import {
	IonModal,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonRadioGroup,
	IonListHeader,
	IonLabel,
	IonItem,
	IonRadio,
	IonCheckbox,
	IonList,
	IonButtons,
	IonSegmentButton,
	IonIcon,
	IonButton,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { close } from "ionicons/icons";

const Addons: React.FC = () => {
	const [selectedOption, setSelectedOption] = useState({});

	const currency_symbol = useSelector(
		(state: RootStateOrAny) => state.auth.currency_symbol
	);

	//Selectors
	const getAddonState = useSelector(
		(state: RootStateOrAny) => state.cart.addons && state.cart.addons
	) ?? [];

	const getDishState = useSelector(
		(state: RootStateOrAny) => state.cart.addons && state.cart.addons
	) ?? {};

	// const [showModal, setShowModal] = useState(getAddonState.length > 0);
	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(actions.addons_hide());
	};

	const addAddons = () => {
		if (getAddonState.length > 0) {
			// getAddonState
			console.log(getDishState,selectedOption);

			const {
				id,
				price,
				name,
				book_id,
			} = getDishState;

			// let addons = getAddonState.map((d) => {
			// 	const v = d.addons_category;
			// 	if (selectedOption[v.id]){
			// 		if(v.type == "MULTIPLE"){
			// 			const selected_addons = v.addons.filter(ad => selectedOption[v.id].includes(ad.id))
			// 			return { id: v.id, name: v.name, addons: selected_addons };
			// 		}else
			// 			return { id: v.id, name: v.name, addons: v.addons };
			// 	}
			// });
			var addons = getAddonState.reduce(function (result, d) {
				const v = d.addons_category;
				if (selectedOption[v.id]) {
					if (v.type == "MULTIPLE") {
						const selected_addons = v.addons.filter(ad => selectedOption[v.id].includes(ad.id))
						result.push({ id: v.id, name: v.name, addons: selected_addons });
					} else{
						const selected_addons = v.addons.filter(ad => selectedOption[v.id] == ad.id)
						result.push({ id: v.id, name: v.name, addons: selected_addons });
						// result.push({ id: v.id, name: v.name, addons: v.addons });
					}
				}
				return result;
			}, []);

			const amount = isNaN(price) ? parseFloat(price.substr(1)) : price;
			dispatch(actions.increment({ id, name, amount, book_id, addons }))
			dispatch(actions.addons_hide());
			setSelectedOption({})
			// dispatch(actions.increment(getAddonState));
		}
	};

	const setSelected = (category_id, option_id, type) => {

		if (type === 2) {
			let addons = selectedOption[category_id]
			console.log(addons)
			if (addons != undefined) {
				const index = (addons as any).findIndex((addon: any) => addon === option_id);
				if (index !== -1) {
					addons.splice(index, 1);
					console.log(addons)
					setSelectedOption({ ...selectedOption, [category_id]: addons } as any);
				} else
					setSelectedOption({ ...selectedOption, [category_id]: [...selectedOption[category_id], option_id] } as any);
			} else
				setSelectedOption({ ...selectedOption, [category_id]: [option_id] } as any);

		}
		else if (type === 1)
			setSelectedOption({ ...selectedOption, [category_id]: option_id } as any);
	};

	const RenderAddons = (data) => {
		const { id, type, name, addons } = data.addons_category;

		if (type === "SINGLE") {
			return (
				<Row className="my-2">
					<Col lg="5">
						<IonRadioGroup
							value={selectedOption[id]}
							onIonChange={(e) => setSelected(id, e.detail.value, 1)}
						>
							<h5 className="font-weight-bold">{name}</h5>

							{addons.map((d, i) => (
								<IonItem lines="full" key={i}>
									<IonLabel>
										<Row>
											<Col>{d.name}</Col>
											<Col xs="4" className="text-default">
												{currency_symbol + d.price}
											</Col>
										</Row>
									</IonLabel>
									<IonRadio value={d.id} />
								</IonItem>
							))}
						</IonRadioGroup>
					</Col>
				</Row>
			);
		} else if (type === "MULTIPLE") {
			return (
				<Row className="my-2">
					<Col lg="5">
						<h5 className="font-weight-bold">{name}</h5>

						{addons.map((d, i) => (
							<IonItem lines="full" key={i}>
								<IonLabel>
									<Row>
										<Col>{d.name}</Col>
										<Col xs="4" className="text-default">
											{currency_symbol + d.price}
										</Col>
									</Row>
								</IonLabel>
								<IonCheckbox
									checked={selectedOption[id] != undefined ? (selectedOption[id].filter(e => e == d.id).length > 0) : false}
									onIonChange={(e) => setSelected(id, d.id, 2)}
								/>
							</IonItem>
						))}
					</Col>
				</Row>
			);
		} else return <></>;
	};

	return (
		<IonModal
			isOpen={getAddonState && getAddonState.length > 0}
			cssClass="my-custom-class"
		>
			<IonHeader>
				<IonToolbar>
					<IonTitle className="font-weight-bold">Addon Customization</IonTitle>
					<IonButtons slot="primary">
						<IonButton
							onClick={() => closeModal()}
							className="position-relative"
						>
							<IonIcon icon={close} className="text-default" />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<Container fluid={true} className="p-3">
					{getAddonState &&
						getAddonState.map((data, i) => (
							<RenderAddons {...data} key={i} />
						))}

					<Row
						className="row fixed-bottom w-100 bg-success p-3 m-0 text-white"
						to="/cart"
					>
						<Col
							className="text-center font-weight-bold p-0"
							onClick={() => addAddons()}
						>
							Add &amp; Continue
            </Col>
					</Row>
				</Container>
			</IonContent>
		</IonModal>
	);
};

export default Addons;
