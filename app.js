const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const books = require('./data/books.json');
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, "public")));

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mock user data (replace with database later)
const users = [
  { id: 1, username: 'admin', password: 'adminpass', role: 'admin' },
  { id: 2, username: 'user', password: 'userpass', role: 'user' }
];

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect('/login');
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') return next();
  res.redirect('/');
};







app.post('/admin/add-book', isAuthenticated, isAdmin, (req, res) => {
  const { title, author, price, category } = req.body;
  const safePrice = Math.max(0, parseFloat(price));
  books.push({ title, author,price:safePrice.toFixed(2), category }); // Add to in-memory array
  res.redirect('/admin');
});



// Routes
app.get('/', (req, res) => {
  res.render('index', { userName: req.session.user ? req.session.user.username : '', books });
});

app.get('/login', (req, res) => {
  res.render('login', { userName: req.session.user ? req.session.user.username : '', message: req.query.message });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    if (user.role === 'admin') {
      res.redirect('/admin');
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/login?message=Invalid credentials');
  }
});

app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin', { userName: req.session.user.username ,books}); // Create admin.ejs
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

app.get('/categories', (req, res) => {
  res.render('categories', { userName: req.session.user ? req.session.user.username : '' });
});

app.get('/about', (req, res) => {
  res.render('about', { userName: req.session.user ? req.session.user.username : '' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { userName: req.session.user ? req.session.user.username : '' });
});

app.get('/signup', (req, res) => {
  res.render('signup', { userName: req.session.user ? req.session.user.username : '' });
});

app.get('/buy-now', (req, res) => {
  res.render('buy now'); // filename should be `buy now.ejs`
});

app.get('/art-of-fiction', (req, res) => {
  res.render('art-of-fiction', { userName: req.session.user ? req.session.user.username : '' });
});

app.get('/404', (req, res) => {
  res.render('404', { userName: req.session.user ? req.session.user.username : '' });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('404', { userName: req.session.user ? req.session.user.username : '' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});