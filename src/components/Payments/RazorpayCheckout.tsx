import { IonIcon } from "@ionic/react";
import { cashOutline } from "ionicons/icons";
import React from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
// reactstrap components
import { Button, Col, Row } from "reactstrap";

import axios from '../../helpers/axiosInterceptor';
import actions from '../../actions/cart'
import { alertActions } from '../../actions/alert'

declare var Razorpay: any;

interface ListProps {
    history: any,
    client_id: string,
    currency_code: string,
}

const RazorpayCheckout: React.FC<ListProps> = ({ history, client_id, currency_code }) => {

    const cart = useSelector((state: RootStateOrAny) => state.cart);
    const user = useSelector((state: RootStateOrAny) => state.auth.user);

    const dispatch = useDispatch();

    const paymentHandler = async (e) => {
        e.preventDefault();
        const payment_amount = Math.round(cart.total * 100)
        const options = {
            key: client_id,
            currency: currency_code,
            name: "Order Payment",
            description: "Complete the payment process",
            amount: payment_amount,
            payment_capture: 1,
            handler: async (response) => {
                try {
                    dispatch(alertActions.page_loader(true))
                    const payment_id = response.razorpay_payment_id;
                    const captureResponse = await axios.post('payment/razorpay', { payment_id, payment_amount })
                    console.log(captureResponse.data);
                    let cartForm = cart
                    cartForm.method = "razorpay"
                    dispatch(actions.place_order(cartForm, history))
                } catch (err) {
                    console.log(err);
                }
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone
            },
            theme: {
                color: "#2dce89",
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    };

    return (
        <Row className="flex-row flex-wrap shadow p-3 m-3 bg-white border-bottom">
            <Col className="p-0">
                <h6 className="font-weight-bold text-center">Netbanking, Gpay, PhonePe, UPI, etc.,</h6>
                <Button className="w-100 bg-success p-2 m-0 text-white" onClick={paymentHandler}>
                    <h3 className="d-inline"> <IonIcon icon={cashOutline} className="text-white align-middle" /> </h3>
                    Checkout with RazorPay
                </Button>

            </Col>
        </Row>
    )
};

export default RazorpayCheckout;