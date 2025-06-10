// Файл для тестов в дев режиме

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