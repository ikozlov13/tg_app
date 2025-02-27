const express = require('express');
const router = express.Router();

const products = [
  { id: '4', name: 'Вафельные полотенца', price: 650, sizes: ['45x75'], colors: ['Белый'], images: ['/images/home1.jpg'], description: '2 шт, 100% хлопок' },
  // Добавьте остальные товары
];

router.get('/', (req, res) => {
  res.render('home-textile', { products });
});

module.exports = { products, router }; // Экспортируем products и router