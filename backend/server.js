import express from 'express';
import seedRouter from './routes/seedRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import orderRouter from './routes/orderRouter.js';
// import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('*******Connected to MongoDB********');
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();
// needed for the form data post req to be converted to json object inside req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// return paypal client id to frontend
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/frontend/build')));

app.use('/', (req, res) => {
  res
    .status(200)
    .send(
      'Oved Store Api - /api/seed  |  /api/products  |  /api/users  |  /api/orders'
    );
});
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is at: http://localhost:${port}`);
});
