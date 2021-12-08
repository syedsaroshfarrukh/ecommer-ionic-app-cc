
import { Plugins } from '@capacitor/core';
import axios from '../helpers/axiosInterceptor';

const { Device, PushNotifications, LocalNotifications } = Plugins;

const push_register = async () => {

  const info = await Device.getInfo();
  if (info.platform === "web")
    return

  let auth, auth_token
  const storage = JSON.parse(localStorage.getItem('persist:storage') as any)

  if (storage) {
    auth = storage.auth
    auth_token = JSON.parse(auth).auth_token
  }

  if (!auth_token)
    return

  PushNotifications.register();

  PushNotifications.addListener('registration',
    async (token) => {
      let data = JSON.stringify({
        device_token: { device_token: token.value }
      });
      axios.post(`/user/fcm_token`, data).then(response => response.data.data)
        .then((res) => {
          localStorage.setItem("device_token", token.value)
        })
    }
  );

  PushNotifications.addListener('registrationError',
    (error) => {
      // alert('Error on registration: ' + JSON.stringify(error));
    }
  );

  PushNotifications.addListener('pushNotificationReceived',
    (notification: any) => {
      LocalNotifications.schedule({
        notifications: [
          {
            id: (Math.floor(Math.random() * 100) + 1),
            title: notification.title,
            body: notification.body,
            schedule: { at: new Date(Date.now() + 1000 * 2) },
            extra: notification
          }
        ]
      })
      LocalNotifications.addListener('localNotificationActionPerformed',
        (payload) => {
          window.location.href = `/dashboard/home`
        }
      )
    }
  );

  PushNotifications.addListener('pushNotificationActionPerformed',
    (payload) => {
      window.location.href = `/dashboard/home`
    }
  );
}

export { push_register };