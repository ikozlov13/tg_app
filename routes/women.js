const express = require('express');
const router = express.Router();

const products = [
  { id: '1', name: 'Футболка женская', price: 3499, sizes: ['S', 'M', 'L'], colors: ['Черная', 'Белая', 'Фуксия', 'Зеленая'], images: ['/images/women1.jpg'], description: 'Оверсайз, премиальный хлопок' },
  { id: '2', name: 'Костюм повседневный', price: 7499, sizes: ['S', 'M', 'L', 'XL'], colors: ['Графитовый', 'Пудровый'], images: ['/images/women2.jpg'], description: 'Брюки + кардиган' },
  // Добавьте остальные товары
];

router.get('/', (req, res) => {
  res.render('women', { products });
});
module.exports = router; // Экспортируем только router