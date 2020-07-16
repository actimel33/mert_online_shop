import express    from 'express';
import Product                     from '../models/productModel';
import {isAdmin, isAuth} from '../util';

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({data: products});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.put('/:id', isAdmin, isAuth, async (req, res) => {
    try {

        const productId = req.params.id;
        await Product.findOneAndUpdate({_id: productId}, {...req.body})
        const product = await Product.findOne({_id: productId})
        if (product) {
            res.json({data: product});
        }
        res.status(404).json({error: 'Product not found'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {

        const productId = req.params.id;
        const product = await Product.findOne({_id: productId})
        if (product) {
            res.json({data: product});
        }
        res.status(404).json({error: 'Product not found!'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
        });

        const newProduct = await product.save();
        if (newProduct) {
            return res.status(201).json({message: 'Product created!', data: newProduct});
        }
        return res.status(201).json({message: 'Error in creating product!'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/:id', isAdmin, isAuth, async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (deletedProduct) {
        return res.status(200).json({message: 'Product deleted'});
    }

    return res.status(404).json({message: 'Product not found!'})

})

export default router;