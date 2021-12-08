import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import BookList from '../../components/BookCards/general';
import GeneralSkeletonText from '../../components/skeleton_text/general_book';
import axios from '../../helpers/axiosInterceptor';

const TopCategories: React.FC = (props: any) => {

	const [books, setbooks] = useState([]);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		setLoad(true)
		axios.get(`/top_categories/${props.match.params.id}`)
			.then(res => {
				setbooks(res.data);
				setLoad(false)
			})
			.catch(err => {
				setLoad(false)
			})
	}, [props.match.params.id]);


	return (
		<IonPage>

			<IonHeader className="bg-white ion-no-border border-bottom">
				<IonToolbar color="white">
					<IonTitle className="font-weight-bold">
						<IonIcon icon={arrowBackOutline} className="mr-2 align-text-top text-default"
							onClick={() => props.history.goBack()}
						/>
						Top Categories
					</IonTitle>
				</IonToolbar>
			</IonHeader>


			<IonContent fullscreen>

				<Container fluid={true} >

					{}

					{(books.length !== 0) ? (
						<Row className="mt-3">
							<Col>
								<h5 className="font-weight-bold px-3">Search Results</h5>
								<BookList history={props.history} books={books} />
							</Col>
						</Row>
					) : (books.length === 0 && load) ? (
						<Row className="mt-3">
							<Col>
								{[...Array(5)].map((e, i) => (<GeneralSkeletonText key={i} />))}
							</Col>
						</Row>
					) : (
								<Row className="d-flex align-items-center">
									<Col className="mt-5 p-7">
										<img className="dull-filter" src={require('../../assets/img/icons/common/search-restaurant.svg')} alt="search-restaurant" />
									</Col>
								</Row>
							)}

				</Container>
			</IonContent>


		</IonPage>
	);
};

export default TopCategories;
