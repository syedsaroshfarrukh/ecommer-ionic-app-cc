import { IonSlide, IonSlides } from '@ionic/react';
import React from "react";
// reactstrap components
import { Card, CardBody, CardImg, Col } from "reactstrap";
// import { Fade } from 'react-reveal';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import PackBoxCounter from '../Utilities/pack-box-counter';

const slideOpts = {
	slidesPerView: 'auto',
	spaceBetween: 0,
	speed: 400
};

const FeaturedMenu: React.FC = () => {

	const hotels: any[] = [
		{
			name: '54 Below',
			address: '856 Esta Underpass',
			rating: '4.8',
			rating_count: '256',
			for_two: '256',
		},
		{
			name: 'BurritoVille',
			address: '856 Esta Underpass',
			rating: '4.8',
			rating_count: '256',
			for_two: '256',
		},
		{
			name: 'Grotta AzzurraGrotta AzzurraGrotta',
			address: '856 Esta Underpass',
			rating: '4.8',
			rating_count: '256',
			for_two: '256',
		},
		{
			name: '54 Below',
			address: '856 Esta Underpass',
			rating: '4.8',
			rating_count: '256',
			for_two: '256',
		},
		{
			name: 'BurritoVille',
			address: '856 Esta Underpass',
			rating: '4.8',
			rating_count: '256',
			for_two: '256',
		},
		{
			name: 'Grotta AzzurraGrotta AzzurraGrotta',
			address: '856 Esta Underpass',
			rating: '4.8',
			rating_count: '256',
			for_two: '256',
		},
	]

	return (
		<Carousel slidesPerPage={2}
			draggable={true}
			keepDirectionWhenDragging={true}
			animationSpeed={200}
			itemWidth={190}
			offset={16}
			slidesPerScroll={2}>

			{hotels.map((hotel: any) => {
				const { name, address, rating, rating_count, for_two } = hotel;

				return (
					// <IonSlide className="d-block mr-4" style={{ width: '12rem' }}>
					<Card className="d-block shadow-sm p-0 m-0">
						<span className="featured-badge"></span>
						{/* <Fade> */}
						<CardImg className="rounded-lg" src={require('../../assets/img/bg/welcome2.jpg')} alt="" />
						{/* </Fade> */}
						<CardBody className="p-2 h-restaurant text-left">

							<h6 className="my-0 font-weight-bold item-name">{name}</h6>
							<div className="d-flex align-items-center text-muted">
								<Col xs="6" className="p-0 d-flex">
									<span className="dot nonveg" color="primary"></span>
									<small className="mx-2">${for_two}</small>
								</Col>
								<Col xs="6" className="p-0 text-center pl-1">
									{/* <PackBoxCounter /> */}
								</Col>
							</div>

						</CardBody>

					</Card>
					// </IonSlide>
				);
			})}
		</Carousel>
	)
}

export default FeaturedMenu;