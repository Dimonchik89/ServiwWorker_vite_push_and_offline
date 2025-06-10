const PUBLIC_VAPID_KEY = 'BFSWYL9hZnNJfRYmQtvvAEOCg3ZfveBf5ZcEU8candXXp1D2HYwfQKJO8ciwWkaWFv3zuQQteVEY1O2xrGZrsa8';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

export async function subscribeUser() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('Разрешение на уведомления не получено');
      return;
    }

    // const reg = await navigator.serviceWorker.register('/sw.js'); // для продакшин режима
    const reg = await navigator.serviceWorker.register('/sw-dev.js'); // для тестов в режиме разработки
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    await fetch('http://localhost:8000/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    });
  }
}