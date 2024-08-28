const express = require('express');
const app = express();
const port = 8092;
const cors = require('cors');
const mongoose = require('mongoose');
const BankRoutes = require('./Routess/BankRoutes.js'); // Ensure path is correct

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
mongoose.connect('mongodb+srv://athirakv:athira@cluster0.vut69.mongodb.net/Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/', BankRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
