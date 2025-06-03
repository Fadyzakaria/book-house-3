const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const books = require('./data/books.json');



// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get('/',(req,res,nxt)=>{
  
  nxt()
}, (req, res,nxt) => {
  res.render('index', { userName: "",books }); // or whatever the actual value is
});


app.get("/categories", (req, res) => {
  res.render("categories", { userName: "" });
});

app.get("/about", (req, res) => {
  res.render("about", { userName: "" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { userName: "" });
});

app.get("/login", (req, res) => {
  res.render("login", { userName: "" });
});

app.get("/signup", (req, res) => {
  res.render("signup", { userName: "" });
});

app.get("/buy-now", (req, res) => {
  res.render("buy now"); // filename should be `buy now.ejs`
});


app.get('/art-of-fiction', (req, res) => {
  res.render('art-of-fiction', { userName: "" }); // or whatever the actual value is
});


app.get("/404", (req, res) => {
  res.render("404", { userName: "" });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("404", { userName: "" });

});








// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
