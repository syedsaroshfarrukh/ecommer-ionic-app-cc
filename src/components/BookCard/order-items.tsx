import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
// reactstrap components
import { Col, Row } from "reactstrap";

interface Params {
	order_books: [],
}

const CartItems: React.FC<Params> = ({ order_books }) => {

	const currency_symbol = useSelector((state: RootStateOrAny) => state.auth.currency_symbol);

	const addons = (order_adddons) => 'Addons: '+order_adddons.map((d) => d.name )

	const calcPrice = (count, price, addons_dish) => {
		let addons_cost = 0
		addons_dish.map(d =>
			addons_cost += parseInt(d.price)
		)
		return (count* price) + addons_cost
	}

	return (
		<>
			{
				order_books.map((dish: any) => {
					const { name, id, price, quantity, order_adddons } = dish;

					return (
						<Row className="flex-row flex-wrap shadow-0 py-2 px-3 border-bottom" key={id}>
							<Col xs="1" className="p-0">
								<span className={`dot && 'nonveg'}`} color="primary"></span>
							</Col><Col className="p-0">
								<h6 className="my-0 item-name">{quantity} X {name} </h6>
								{order_adddons.length > 0 && (
									<h6 className="my-0 mt-1 item-name">{addons(order_adddons)} </h6>
								)}
							</Col>
							<Col xs="3" className="p-0">
								{/* <span className="p-0 text-dark text-right d-block">{currency_symbol + (quantity * price)}</span> */}
								<span className="p-1 text-dark text-right d-block">{currency_symbol}{calcPrice(quantity, price, order_adddons)}</span>
							</Col>
						</Row>
					);
				})
			}
		</>
	)
};

export default CartItems;