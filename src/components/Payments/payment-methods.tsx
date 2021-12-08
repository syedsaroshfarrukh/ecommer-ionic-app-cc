import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import actions from '../../actions/cart';
import PaypalCheckout from "./PaypalCheckout";
import RazorpayCheckout from "./RazorpayCheckout";
import axios from '../../helpers/axiosInterceptor';
import GeneralSkeletonText from "../skeleton_text/general_book";

interface ListProps {
    history: any,
}
const PaymentMethods: React.FC<ListProps> = ({ history }) => {

    const [paymentGateway, setPaymentGateway] = useState({} as any)
    const [loaded, setLoaded] = useState(false)
    const cart = useSelector((state: RootStateOrAny) => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/settings/payment_options').then((res) => {
            const payment_options = res.data
            setPaymentGateway(payment_options)
            setLoaded(true)
        })
    }, [])

    const onCODPurchase = (e) => {
        console.log("cart",cart)
        let cartForm = cart
        cartForm.method = "COD"
        dispatch(actions.place_order(cartForm, history))
      
    }

    return (
        <>
            {
                loaded ? (
                    <>
                        {/* {paymentGateway.pg_paypal_active === "1" && <PaypalCheckout history={history} client_id={paymentGateway.pg_paypal_key} currency_code={paymentGateway.currency_code} />}
                        {paymentGateway.pg_razorpay_active === "1" && <RazorpayCheckout history={history} client_id={paymentGateway.pg_razorpay_client_key} currency_code={paymentGateway.currency_code} />} */}
                        {paymentGateway.pg_cod_active === "1" && (<Row className="flex-row flex-wrap shadow p-3 m-3 bg-white border-bottom" onClick={onCODPurchase}>
                            <Col xs="9" className="p-0">
                                <h5 className="font-weight-bold">COD</h5>
                                Cash on Delivery
                            </Col>
                            <Col xs="3" className="p-0">
                                <img src={require('../../assets/img/icons/common/cod-icon.png')} alt="sds" />
                            </Col>
                        </Row>
                        )}
                    </>
                ) :
                    [...Array(4)].map((e, i) => (<GeneralSkeletonText key={i} />))
            }

        </>
    )
};

export default PaymentMethods;