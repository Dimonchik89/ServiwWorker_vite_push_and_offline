// Файл для работы на продакшене
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title || 'Новое уведомление', {
      body: data.body || '',
      icon: '/icon.png',
    })
  );
});