const express = require('express');
const { Telegraf } = require('telegraf');
const path = require('path');
const config = require('./config');

const app = express();
const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/index'));
app.use('/women', require('./routes/women'));
app.use('/men', require('./routes/men'));
app.use('/home-textile', require('./routes/home-textile'));
app.use('/cart', require('./routes/cart'));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

// Запуск бота
bot.launch()
  .then(() => console.log('Бот запущен'))
  .catch(err => console.error('Ошибка запуска бота:', err));

// Функция для отправки заказа администратору
const sendOrderToAdmin = (order) => {
  const adminChatId = config.ADMIN_CHAT_ID;
  const message = `Новый заказ!\n\nИмя: ${order.name}\nТелефон: ${order.phone}\nТип доставки: ${order.deliveryType}\nАдрес: ${order.address || 'Самовывоз'}\n\nТовары:\n${order.items.map(item => `- ${item.name} (${item.size}, ${item.color}) x ${item.quantity}`).join('\n')}`;

  bot.telegram.sendMessage(adminChatId, message);
};

module.exports = { sendOrderToAdmin };