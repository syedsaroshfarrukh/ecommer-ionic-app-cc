import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
// reactstrap components
import { Col, Row } from "reactstrap";
import actions from '../../actions/cart'

interface ListProps {
    history: any,
    client_id: string,
    currency_code: string,
}
const PaypalCheckout: React.FC<ListProps> = ({ history, client_id,currency_code }) => {

    const cart = useSelector((state: RootStateOrAny) => state.cart);
    const dispatch = useDispatch();

    const onSuccess = (details, data) => {
        let cartForm = cart
        cartForm.method = "paypal"
        dispatch(actions.place_order(cartForm, history))
    }

    const onError = (err) => {
        console.log("Error!", err);
    }

    return (
        <Row className="flex-row flex-wrap shadow p-3 m-3 bg-white border-bottom">
            <Col className="p-0">
                <PayPalButton
                    options={{
                        clientId: client_id,
                        currency: currency_code
                    }}
                    onSuccess={onSuccess}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: currency_code,
                                    value: cart.total
                                }
                            }],
                        });
                    }}
                    onError={onError} />
            </Col>
        </Row>
    )
};

export default PaypalCheckout;