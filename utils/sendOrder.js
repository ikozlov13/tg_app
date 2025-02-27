const { Telegraf } = require('telegraf');
const config = require('../config');

const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

const sendOrderToAdmin = (order) => {
  const adminChatId = config.ADMIN_CHAT_ID;
  const message = `Новый заказ!\n\nИмя: ${order.name}\nТелефон: ${order.phone}\nТип доставки: ${order.deliveryType}\nАдрес: ${order.address || 'Самовывоз'}\n\nТовары:\n${order.items.map(item => `- ${item.name} (${item.size}, ${item.color}) x ${item.quantity}`).join('\n')}`;

  bot.telegram.sendMessage(adminChatId, message);
};

module.exports = sendOrderToAdmin;