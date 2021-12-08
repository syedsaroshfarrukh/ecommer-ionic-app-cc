import { IonImg, IonSlide, IonSlides } from '@ionic/react';
import React from "react";
import { RootStateOrAny, useSelector } from 'react-redux';
import { Fade } from 'react-reveal';
// reactstrap components
import { Card, CardBody, Col } from "reactstrap";
import PackBoxCounter from '../Utilities/pack-box-counter';


const slideOpts = {
	slidesPerView: 'auto',
	spaceBetween: 0,
	speed: 400
};

interface ListProps {
	bookList?: any,
	restaurant_id: number,
}

const FeaturedBook: React.FC<ListProps> = ({ bookList }) => {

	const currency_symbol = useSelector((state: RootStateOrAny) => state.auth.currency_symbol);

	return (
		// <Fade>
		<IonSlides pager={false} options={slideOpts}>
			{bookList.map((book: any, i) => {
				const { name, id, price, image, is_veg  } = book;

				return (
					<IonSlide className="d-block ml-3" style={{ width: '12rem' }} key={id}>
						<Card className="shadow-sm p-0 m-0">
							<span className="featured-badge"></span>
							<Fade>
								<IonImg className="rounded-lg" src={image} alt="" />
							</Fade>
							<CardBody className="p-2 h-restaurant text-left">

								<h6 className="my-0 font-weight-bold item-name">{name}</h6>
								<div className="d-flex align-items-center text-muted">
									<Col xs="6" className="p-0 d-flex">
										<span className={`dot ${(is_veg === 0) && 'nonveg'}`} color="primary"></span>
										<small className="mx-2">{currency_symbol + price}</small>
									</Col>
									<Col xs="6" className="p-0 text-center pl-1">
										<PackBoxCounter book={book} id={book.book_id} />
									</Col>
								</div>

							</CardBody>

						</Card>
					</IonSlide>
				);
			})}
		</IonSlides>
		// </Fade>
	)
}

export default FeaturedBook;