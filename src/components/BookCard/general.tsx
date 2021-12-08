import React from "react";
import Zoom from 'react-reveal/Zoom';
// reactstrap components
import { Card, CardBody, CardHeader, CardImg, Col } from "reactstrap";
import PackBoxCounter from "../Utilities/pack-box-counter";
import { useSelector, RootStateOrAny } from "react-redux";
import { book } from "ionicons/icons";

interface ListProps {
	BookList?: any,
	book_id: number,
}

const BookList: React.FC<ListProps> = ({ BookList, book_id }) => {

	const currency_symbol = useSelector((state: RootStateOrAny) => state.auth.currency_symbol);

	return (
		<>
			{
				BookList.map((menu: any) => {
					const { name, description, id, price, image } = menu;

					return (
						<Card className="flex-row flex-wrap shadow-sm p-2 mb-3 border-0" key={id}>
							<Col xs="3" className="p-0">
								<CardHeader className="border-0 p-0 py-0 pr-1">
									<Zoom>
										<CardImg className="rounded-lg" src={image} alt="" />
									</Zoom>
								</CardHeader>
							</Col>
							<Col className="p-0">
								<CardBody className="px-2 py-0 h-restaurant">
									<h6 className="my-0 font-weight-bold item-name">{name} </h6>
									<small className="text-muted item-description d-block py-1">
										{description}
									</small>
									<div className="d-flex align-items-center justify-content-between text-muted pr-2 pt-1">
										<Col xs="12" className="p-0 d-flex">
											<span className={`dot && 'nonveg'}`} color="primary"></span>
											<span className="mx-2">{currency_symbol + price}</span>
										</Col>
									</div>
								</CardBody>
							</Col>
							<Col xs="3" className="p-0 pt-1">
								<PackBoxCounter book={menu} id={book_id} />
							</Col>
						</Card>
					);
				})
			}
		</>
	)
};

export default BookList;