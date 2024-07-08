const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const MONGO_URI = 'mongodb+srv://asunny9333:0VAWRHrNyw10hgYt@cluster0.kf6iejc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = 3000;

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
