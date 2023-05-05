
const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const genreRoutes = require('./routes/genreRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const commentRoutes = require('./routes/commentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');
const imageRoutes = require('./routes/imageRoutes');
const miniImageRoutes = require('./routes/miniImageRoutes');

const app = express();
const port = process.env.PORT || 4000;



// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

// ROUTES
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/genres', genreRoutes);
app.use('/products', productRoutes);
app.use('/ratings', ratingRoutes);
app.use('/comments', commentRoutes);
app.use('/orders', orderRoutes);
app.use('/reports', reportRoutes);
app.use('/images', imageRoutes);
app.use('/minis', miniImageRoutes);

// STRIPE CONNECTION
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  console.log('Price:', price);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(price) * 100, // Multiply the price by 100
    currency: "usd",
    payment_method_types: ["card"],
  });

  console.log('Client secret:', paymentIntent.client_secret);

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
});


// Serve your static files from the 'build' folder (in production)
app.use(express.static(path.join(__dirname, 'client', 'build')));

// All other routes should serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


mongoose.set('strictQuery', false); // To suppress the DeprecationWarning
require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URL);

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://jeffjiang13:Agneslover1@cluster0.kfwl3h5.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Successfully connected to database.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
