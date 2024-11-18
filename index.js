const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3010;
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function cartAdd(productId, name, price, quantity) {
  let result = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };

  cart.push(result);

  console.log(cart);

  return cart;
}
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let result = cartAdd(productId, name, price, quantity);
  res.json({ cartItems: result });
});

function editQuantity(productId, quantity) {
  for (i = 0; i <= cart.length; i++) {
    if (cart[i].productId == productId) {
      cart[i].quantity = quantity;
      return cart;
      i = i + 1;
    } else {
      console.log('Id not found');
    }
  }
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  let result = editQuantity(productId, quantity);
  res.json({ cartItems: result });
});

function deleteByProductId(cartObj, productId) {
  return cartObj.productId != productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cartObj) => deleteByProductId(cartObj, productId));

  res.json({ cartItems: result });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function cartTotalQuantity() {
  let result = 0;

  for (i = 0; i < cart.length; i++) {
    result = result + cart[i].quantity;
    break;
  }
  return result;
}
app.get('/cart/total-quantity', (req, res) => {
  let result = cartTotalQuantity();
  res.json({ totalQuantity: result });
});

function cartTotalPrice() {
  let result = 0;
  for (i = 0; i < cart.length; i++) {
    result = result + cart[i].price;
  }
  return result;
}
app.get('/cart/total-price', (req, res) => {
  let result = cartTotalPrice();
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
