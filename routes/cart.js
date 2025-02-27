const express = require('express');
const router = express.Router();
const sendOrderToAdmin = require('../utils/sendOrder'); // Импорт функции

let cart = []; // Временное хранилище корзины

router.get('/', (req, res) => {
  res.render('cart', { cart });
});

router.post('/add', (req, res) => {
  const { productId, size, color } = req.body;
  const product = getProductById(productId);

  if (product) {
    const itemIndex = cart.findIndex(item => item.productId === productId && item.size === size && item.color === color);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += 1;
    } else {
      cart.push({ ...product, size, color, quantity: 1 });
    }
  }

  res.redirect('/cart');
});

router.post('/order', (req, res) => {
  const { phone, name, deliveryType, address } = req.body;

  const order = {
    name,
    phone,
    deliveryType,
    address,
    items: cart,
  };

  // Отправка заказа администратору
  sendOrderToAdmin(order);

  // Очистка корзины
  cart = [];

  res.json({ success: true, message: 'Заказ оформлен' });
});

// Вспомогательная функция для получения товара по ID
const getProductById = (productId) => {
  const allProducts = [
    ...require('./women').products,
    ...require('./men').products,
    ...require('./home-textile').products,
  ];
  return allProducts.find(product => product.id === productId);
};
// проверить логирование сервера
module.exports = router;
router.post('/add', (req, res) => {
  console.log('Данные запроса:', req.body); // Логируем данные запроса
  const { productId, size, color } = req.body;
  const product = getProductById(productId);

  if (product) {
    console.log('Найден товар:', product); // Логируем найденный товар
    const itemIndex = cart.findIndex(item => item.productId === productId && item.size === size && item.color === color);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += 1;
    } else {
      cart.push({ ...product, size, color, quantity: 1 });
    }
    res.redirect('/cart');
  } else {
    console.error('Товар не найден'); // Логируем ошибку
    res.status(404).json({ error: 'Товар не найден' });
  }
});