const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
var cors = require('cors')


const app = express();
const PORT = 8000;

app.use(cors())
app.use(bodyParser.json());


webpush.setVapidDetails(
  'mailto:you@example.com',
  "BFSWYL9hZnNJfRYmQtvvAEOCg3ZfveBf5ZcEU8candXXp1D2HYwfQKJO8ciwWkaWFv3zuQQteVEY1O2xrGZrsa8",
  "-jgebKieR8UbQtERefGbfgI4r5hGZbyNCojVyYWDq_0"
);

// Подписки храним временно в памяти
let subscriptions = [];

app.get("/", (req, res) => {
    res.json({ message: "ok" });
})

// Эндпоинт для получения подписки от клиента
app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Подписка сохранена' });
});


// Эндпоинт для отправки уведомления вручную 
// я как админ делаю запрос на этот ендпоинт и уведомления отправляються всем кто подписан
app.get('/api/send', async (req, res) => {
  const payload = JSON.stringify({
    title: 'Привет!',
    body: 'Это пуш-уведомление из вашего сервера!'
  });

  try {
    for (const sub of subscriptions) {
      await webpush.sendNotification(sub, payload);
    }
    res.status(200).json({ message: 'Уведомления отправлены' });
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})