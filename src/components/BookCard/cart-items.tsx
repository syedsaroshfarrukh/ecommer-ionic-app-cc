import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
// reactstrap components
import { CardBody, Col, Row } from "reactstrap";
import PackBoxCounter from "../Utilities/pack-box-counter";

interface CartProps {
	currency_symbol: string,
}

const CartItems: React.FC<CartProps> = ({ currency_symbol }) => {

	//Selectors
	const getbookState = store => store.cart.books

	//Redux Hooks
	const basket_book_id = useSelector((state: RootStateOrAny) => state.cart.book_id);
	const basket = useSelector((state: RootStateOrAny) => getbookState(state)) ?? [];

	const addons_list = (addon_book) => addon_book.map(d =>
		<h6 className="my-0 font-weight-light item-name">{d.name}: {d.addons.map(d => d.name + ', ')}</h6>
	)

	const calcPrice = (count, price, addon_book) => {
		let addons_cost = 0
		addon_book.map(d =>
			d.addons.map(d => addons_cost += parseInt(d.price))
		)
		return (count* price) + addons_cost
	}

	return (
		<>
			{
				basket.map((book: any, i) => {
					const { name, id, price, count, addon_book } = book;

					return (
						<Row className="flex-row flex-wrap shadow-0 py-2 px-3 border-bottom" key={i}>
							<Col className="p-0">
								<CardBody className="pl-2 pr-0 py-0 h-restaurant">
									<h6 className="my-0 font-weight-bold item-name">{name} </h6>
									{addons_list(addon_book)}
									<div className="d-flex align-items-center justify-content-between text-muted pr-2 pt-1">
										<Col className="p-0 d-flex">
											<span className={`dot  && 'nonveg'}`} color="primary"></span>
											<span className="mx-2">{currency_symbol}{price}</span>
										</Col>
									</div>
								</CardBody>
							</Col>
							<Col xs="3" className="text-center p-0 pt-1">
								<PackBoxCounter book={book} id={basket_book_id} hide_addon={true} />
							</Col>
							<Col xs="2" className="p-0 pt-1">
								<span className="p-1 text-dark text-right d-block">{currency_symbol}{calcPrice(count, price, addon_book)}</span>
							</Col>
						</Row>
					);
				})
			}
		</>
	)
};

export default CartItems;