import React from "react";
import Ripples from 'react-ripples';
// reactstrap components
import { Card, CardBody } from "reactstrap";

interface Params {
	notifications: any,
}

const NotificationItems: React.FC<Params> = ({ notifications }) => {

	const RestaurantList = notifications.map((notification: any) => {
		const { message, id, created_at } = notification;

		return (
			<Ripples className="shadow-sm mb-3 border w-100" key={id}>
				<Card className="p-2 border-0  w-100">
					<CardBody className="pl-3 pr-0 py-0">
						<h6 className="my-0">{message} </h6>
						<small>{created_at}</small>
					</CardBody>
				</Card>
			</Ripples>
		);
	});

	return (
		<>
			{RestaurantList}
		</>
	)
};

export default NotificationItems;