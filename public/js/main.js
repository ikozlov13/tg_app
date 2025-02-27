function addToCart(productId, size, color) {
    fetch('/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, size, color }),
    })
    .then(response => response.json())
    .then(data => {
      alert('Товар добавлен в корзину');
      window.location.reload();
    })
    .catch(error => console.error('Ошибка:', error));
  }
  
  function removeFromCart(productId, size, color) {
    fetch('/cart/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, size, color }),
    })
    .then(response => response.json())
    .then(data => {
      window.location.reload();
    })
    .catch(error => console.error('Ошибка:', error));
  }
  
  function placeOrder() {
    const phone = prompt('Введите ваш номер телефона:');
    const name = prompt('Введите ваше имя:');
    const deliveryType = document.querySelector('.delivery-options button.active')?.innerText.toLowerCase() || 'pickup';
    const address = deliveryType === 'delivery' ? prompt('Введите адрес доставки:') : '';
  
    fetch('/cart/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, name, deliveryType, address }),
    })
    .then(response => response.json())
    .then(data => {
      alert('Заказ оформлен');
      window.location.href = '/';
    })
    .catch(error => console.error('Ошибка:', error));
  }