import * as firebase from "firebase/app";
import "firebase/messaging";
import { Plugins } from '@capacitor/core';

import axios from './axiosInterceptor';

const { Device } = Plugins;

const fcmInitialization = async () => {
	// const fcmInitialization: React.FC = () => {

	const info = await Device.getInfo()

	if (info.platform !== "web") return

	const response = await axios.get(`/settings/fcm`);
	const { fcm_sender_id, fcm_app_id, fcm_project_id, fcm_web_api_key, fcm_web_certificate } = response.data;

	const initializedFirebaseApp = firebase.initializeApp({
		messagingSenderId: fcm_sender_id,
		projectId: fcm_project_id,
		apiKey: fcm_web_api_key,
		appId: fcm_app_id
	});

	const messaging = initializedFirebaseApp.messaging();

	messaging.usePublicVapidKey(fcm_web_certificate);

	messaging.requestPermission()
		.then(async function () {
			const token = await messaging.getToken();
			localStorage.setItem("fcm_token", token)

			const storage = JSON.parse(localStorage.getItem('persist:storage') as any)
			if (storage) {
				const auth = storage.auth
				const auth_token = JSON.parse(auth).auth_token
				if (auth_token)
					await axios.post('/user/fcm_token', { fcm_token: token });
			}
		})
		.catch(function (err) {
			console.log("Unable to get permission to notify.", err);
		});

	// navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
}


export { fcmInitialization };
