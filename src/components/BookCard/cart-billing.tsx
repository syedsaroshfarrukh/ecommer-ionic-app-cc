import React, { useEffect } from "react";
// reactstrap components
import { Col, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import actions from '../../actions/cart'

interface SubBillProps {
	currency_symbol?: string,
	sub_total?: any,
	restaurant_charge?: number,
	delivery_charge?: number,
	taxes?: number,
	charges?: any,
	coupon?: any
}

const CartBillings: React.FC<SubBillProps> = ({ currency_symbol, sub_total, charges, coupon }) => {

	const dispatch = useDispatch();

	function subTotal() {
		const subTotal = (parseInt(sub_total) + parseInt(charges.bookstore_charges) + parseInt(charges.delivery_charges))
		return subTotal
	}

	function tax() {
		const tax = (subTotal() - coupons()) * (parseInt(charges.taxes) / 100)
		return Math.round(tax * 100) / 100
	}

	function coupons() {
		let sub_total = subTotal()

		if (coupon.id) {
			if (coupon.discount_type === 'PERCENTAGE')
				sub_total = sub_total * ((coupon.discount) / 100)
			else if (coupon.discount_type === 'FIXED')
				sub_total = coupon.discount

			return Math.round(sub_total * 100) / 100
		}
		return 0
	}

	const grand_total = () => {
		let coupon = coupons()
		let sub_total = subTotal() - coupon

		const total = tax() + sub_total

		return Math.round(total * 100) / 100
	}

	const Taxes = () => <>{tax()}</>
	const Coupon = () => <>{coupons()}</>
	const GrandTotal = () => <>{grand_total()}</>



	useEffect(() => {
		dispatch(actions.grand_total(grand_total()))
	}, [coupon])

	return (
		<>
			<Row className="flex-row flex-wrap shadow-0 pt-2 px-3 m-0 border-0">
				<Col className="p-0">
					<h6 className="my-0 font-weight-light item-name">Item Sub-Total </h6>
					<div className="d-flex align-items-center justify-content-between text-muted pr-2 pt-1">

					</div>
				</Col>
				<Col xs="3" className="p-0">
					<span className="text-dark text-right font-weight-light d-block">{currency_symbol}{sub_total}</span>
				</Col>
			</Row>
			{
				(charges.bookstore_charges != null && parseInt(charges.bookstore_charges) !== 0) && (
					<Row className="flex-row flex-wrap shadow-0 pt-2 px-3 m-0 border-0">
						<Col className="p-0">
							<h6 className="my-0 font-weight-light item-name">Packaging Fee</h6>
							<div className="d-flex align-items-center justify-content-between text-muted pr-2 pt-1">

							</div>
						</Col>
						<Col xs="3" className="p-0">
							<span className="text-dark text-right font-weight-light d-block">{currency_symbol}{charges.bookstore_charges}</span>
						</Col>
					</Row>
				)
			}
			{
				(charges.delivery_charges != null && parseInt(charges.delivery_charges) !== 0) && (
					<Row className="flex-row flex-wrap shadow-0 pt-2 px-3 m-0 border-0">
						<Col className="p-0">
							<h6 className="my-0 font-weight-light item-name">Delivery Fee</h6>
							<div className="d-flex align-items-center justify-content-between text-muted pr-2 pt-1">

							</div>
						</Col>
						<Col xs="3" className="p-0">
							<span className="text-dark text-right font-weight-light d-block">{currency_symbol}{charges.delivery_charges}</span>
						</Col>
					</Row>
				)
			}
			{
				(coupon.discount) && (
					<Row className="flex-row flex-wrap shadow-0 pt-2 px-3 m-0 border-0">
						<Col className="p-0">
							<h6 className="my-0 font-weight-light text-success item-name">Coupon Disount</h6>
							<div className="d-flex align-items-center justify-content-between text-muted pr-2 pt-1">

							</div>
						</Col>
						<Col xs="3" className="p-0">
							<span className="text-success text-right font-weight-light d-block">(-) {currency_symbol}<Coupon /></span>
						</Col>
					</Row>
				)
			}
			{
				(charges.taxes != null && parseInt(charges.taxes) !== 0) && (
					<Row className="flex-row flex-wrap shadow-0 pt-2 px-3 m-0 border-0">
						<Col className="p-0">
							<h6 className="my-0 font-weight-light item-name">Taxes and Charges ({charges.taxes}%)</h6>
							<div className="d-flex align-items-center justify-content-between text-muted pr-2 pt-1">

							</div>
						</Col>
						<Col xs="3" className="p-0">
							<span className="text-dark text-right font-weight-light d-block">{currency_symbol}<Taxes /></span>
						</Col>
					</Row>
				)
			}
			<Row className="flex-row flex-wrap shadow py-2 px-3 mt-2 mx-0 border-top">
				<Col className="p-0">
					<h5 className="my-0 font-weight-bold">Grand Total</h5>
					<div className="d-flex align-items-center justify-content-between text-muted pr-2 pt-1">

					</div>
				</Col>
				<Col xs="3" className="p-0">
					<h5 className="text-dark text-right font-weight-bold pr-0">{currency_symbol}<GrandTotal /></h5>
				</Col>
			</Row>
		</>
	)
};

export default CartBillings;