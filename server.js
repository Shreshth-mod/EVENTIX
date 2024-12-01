const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
require("dotenv").config();
const Seat = require('./models/seats');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = process.env.uri;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully!!!");
  })
  .catch((error) => {
    console.error("Error connecting MongoDB", error);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views2"));
app.use(express.static(path.resolve("./assets")));
app.use(express.static(path.resolve("./scripts")));

app.get('/', (req, res) => {
  res.render('homepage');
});

app.get('/signin', (req, res) => {
  res.render('SignIn');
});

app.get('/theater', (req, res) => {
  res.render('threater');
});

app.get('/seatbooking', (req, res) => {
  res.render('seatbooking');
});

app.get('/payment', (req, res) => {
  res.render('paymentpage');
});

app.get('/login', (req, res) => {
  res.render('loginpage');
});

app.get('/forget', (req, res) => {
  res.render('forgetpage');
});

const User = require('./models/users');

app.post('/create-account', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const newUser = new User({
        fullName,
        email,
        phone,
        password
    });

    await newUser.save();
    res.status(201).redirect('/login');
} catch (error) {
    console.error('Error creating user:', error);
    res.redirect('/signin');
}
});

app.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ fullName: userName });
  if(!user){
    return res.redirect('/login');
  }
  if(user.password === password){
    return res.redirect('/');
  }
  else{
    return res.redirect('/login');
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/api/save-seats', async (req, res) => {
  try {
      const { selectedSeats, showtime } = req.body;

      // Loop through selected seats and save them
      for (const seat of selectedSeats) {
          const newSeat = new Seat({
              showtime,
              seatNumber: seat.seatNumber,
              category: seat.category,
              isSold: true,
          });
          await newSeat.save();
      }

      res.status(201).json({ message: 'Seats saved successfully!' });
  } catch (error) {
      console.error('Error saving seats:', error);
      res.status(500).json({ error: 'Failed to save seats' });
  }
});