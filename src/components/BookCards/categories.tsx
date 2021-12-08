import { IonSlide, IonSlides } from '@ionic/react';
import React from "react";
import Ripples from 'react-ripples';

const slideOpts = {
    slidesPerView: 'auto',
    speed: 400,
    zoom: false
};

type ListProps = {
    history: any,
    categories: any
}

const RestaurantCategories: React.FC<ListProps> = ({ history, categories }) => {

    const CategoriesElements = categories.map((category: any) => {
        const { name, image, id } = category;

        return (
            <IonSlide className="d-block ml-3" style={{ width: '6rem' }} key={id}>
                <Ripples className="d-block" onClick={() => {
                    setTimeout(function () {
                        history.push(`/top_category/${id}`);
                    }, 175)
                }}>
                    <img src={image} alt={name} className="rounded-lg shadow-sm" />
                    <h6 className="my-1 font-weight-bold">{name} </h6>
                </Ripples>
            </IonSlide>
        );
    });

    return (

        <IonSlides pager={false} options={slideOpts}>
            {CategoriesElements}
        </IonSlides>
    )
};

export default RestaurantCategories;