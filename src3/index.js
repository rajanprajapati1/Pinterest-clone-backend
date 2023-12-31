const express = require('express');
const session = require('express-session');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Sample products
const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 }
];

// Render product page
app.get('/', (req, res) => {
  res.status(200).json("welcome")
});

// API to get products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// API to add product to cart
app.post('/api/add-to-cart', (req, res) => {
  const productId = parseInt(req.body.productId);
  const product = products.find(p => p.id === productId);
  if (product) {
    req.session.cart = req.session.cart || [];
    req.session.cart.push(product);
    res.json({ success: true, cart: req.session.cart });
  } else {
    res.json({ success: false, message: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
