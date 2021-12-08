import React, { useEffect } from 'react'
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import actions from '../../actions/auth'

const Logout: React.FC = () => {

	const dispatch = useDispatch();
	useEffect(() => {
		localStorage.clear();
		dispatch(actions.logout())
	}, [])

	return <Redirect to="/auth/login" />
}

export default Logout;