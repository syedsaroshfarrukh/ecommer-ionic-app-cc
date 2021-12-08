import React from "react";
import Ripples from 'react-ripples';
// reactstrap components
import { Button, Row } from "reactstrap";

import actions from '../../actions/cart'
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { IonIcon } from "@ionic/react";
import { trash, trashBin, trashOutline, trashSharp } from "ionicons/icons";

interface PackCounterProps {
    book: any,
    id: number,
    hide_addon?: boolean,
}

const PackBoxCounter: React.FC<PackCounterProps> = ({ book, id, hide_addon = false }) => {

    const { id: book_id, price, name, addons_book } = book
    //Selectors
    const getbookState = store => store.cart.bookes ?? []

    const findbookById = (store, id) => {
        
        const index = getbookState(store).map((book, index) => book.id === id ? index : '').filter(String);
        const findIndex = getbookState(store)[index[0]]
        return  (index.length > 0 && findIndex) ? findIndex.count * index.length : 0
    }

    //Redux Hooks
    const count = useSelector((state: RootStateOrAny) => findbookById(state, book_id));
    const dispatch = useDispatch();

    const increment = () => {
       
            const amount = isNaN(price) ? parseFloat(price.substr(1)) : price
            dispatch(actions.increment({ book_id, name, amount, id }))
        
    }

    const decrement = () => {
        if (count > 0)
            dispatch(actions.decrement({ book_id, id }))
    }

    return (
        <>
           

            {(hide_addon == false || (addons_book && addons_book.length < 1)) ? (
                <>
                    <Row className="pack-box m-0">
                        <Ripples className="col-4 p-0">
                            <Button className="pack-btn shadow-none m-0 px-0" onClick={decrement}></Button>
                        </Ripples>
                        <small className="pack-count col-4 p-0">{count}</small>

                        <Ripples className="col-4 p-0">
                            <Button className="pack-btn-plus alt shadow-none m-0 px-2" onClick={increment}></Button>
                        </Ripples>
                    </Row>
                    {(hide_addon == false && addons_book && addons_book.length > 0) && (
                        <Row className="m-0 mt-1">
                            <small className="w-100 p-0 text-warning text-center">Addons</small>
                        </Row>
                    )}
                </>
            ) : (
                    <h4 onClick={decrement}><IonIcon icon={trashOutline} className="text-muted mr-1 align-text-top" /></h4>
                )}
        </>
    )
}

export default PackBoxCounter;