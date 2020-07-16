import express  from 'express';
import data     from './data';
import config   from 'config';
import mongoose from 'mongoose';
import userRout from './routes/userRoute';
import productRout from './routes/productRoute';

const mongodbUrl = config.get('MONGODB_URL');

const app = express();

app.use(express.json({extended: true}));

app.use('/users', userRout);
app.use('/products', productRout);

app.get('/api/products', (req, res) => {

    res.json({data});
});

app.get('/api/product/:id', (req, res) => {
    const candidate = data.find(item => item._id === req.params.id);

    if (!candidate) {
        return res.status(404).json({message: 'Product not found!'});
    }
    res.json({product: candidate});
});

async function start() {
    try {
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

start();

app.listen(5000, () => {
    console.log(`Server started on port 5000...`);
});