const express = require('express');
const router = express.Router();

const products = [
  { id: '3', name: 'Футболка мужская', price: 3499, sizes: ['L', 'XL'], colors: ['Черная', 'Белая', 'Зеленая'], images: ['/images/men1.jpg'], description: 'Премиальный хлопок' },
  // Добавьте остальные товары
];

router.get('/', (req, res) => {
  res.render('men', { products });
});

module.exports = { products, router }; // Экспортируем products и router