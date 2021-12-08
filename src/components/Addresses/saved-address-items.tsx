import React, { useEffect, useState } from "react";
// reactstrap components
import { Badge, CardBody, Col, Row } from "reactstrap";
import axios from '../../helpers/axiosInterceptor';
import GeneralSkeletonText from '../skeleton_text/general_book';
import { useDispatch } from "react-redux";

import actions from '../../actions/auth'

interface RoutesIF {
	history: any, // Change the required prop to an optional prop.
}

const SavedAddress: React.FC<RoutesIF> = ({ history }) => {

	const [addresses, setAddresses] = useState([]);
	const [defaultAddres, setDefaultAddres] = useState(0);
	const [load, setLoad] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		axios.get(`/user/addresses`)
			.then(res => {
				setAddresses(res.data);
				res.data.map((data) => (data.is_primary && setDefaultAddres(data.id)))
				setLoad(true);
			})
			.catch(err => {
				console.log(err)
			})
	}, []);

	const changeDefaultAddress = (id) => {
		console.log(id)
		axios.put(`/user/address`, { id })
			.then(res => {
				const data = res.data;
				dispatch(actions.set_address({ id: data.id, label: data.label, full_address: data.street }))
				history.goBack()
			})
			.catch(err => {
				console.log(err)
			})
	}

	const deleteAddress = (id) => {
		axios.delete(`/user/address`, { data: { id } })
			.then(res => {
				history.go(-1)
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<>
			{
				load ?
					addresses.map((address: any, i) => {
						return (
							<Row className="flex-row flex-wrap shadow-0 py-2 px-3 border-bottom" key={address.id}>
								<Col className="p-0">
									<div className="custom-control custom-radio mb-3">
										<input
											className="custom-control-input"
											id={`customCheck_${address.id}`}
											name="address"
											type="radio"
											value={address.id}
											{...((defaultAddres === address.id) && { defaultChecked: true })}
											onChange={() => changeDefaultAddress(address.id)}
										/>
										<label className="custom-control-label w-100" htmlFor={`customCheck_${address.id}`}>
											<CardBody className="pl-2 pr-0 py-0 h-restaurant">
												<h6 className="my-0 font-weight-bold text-capitalize">{address.label} </h6>
												<small className="text-capitalize item-name">{address.street}</small>
											</CardBody>
										</label>
									</div>

								</Col>
								{defaultAddres !== address.id && (
									<Col xs="2" className="p-0 pt-1">
										<Badge color="secondary" pill className="text-danger" onClick={() => deleteAddress(address.id)}>Delete</Badge>
									</Col>
								)}

							</Row>
						);
					}) :
					[...Array(4)].map((e, i) => (<GeneralSkeletonText key={i} />))
			}
		</>
	)
};

export default SavedAddress;