import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type: String, require: true},
    image: {type: String, require: true},
    brand: {type: String, require: true},
    price: {type: Number, default: 0, require: true},
    category: {type: String, require: true},
    countInStock: {type: Number, default: 0, require: true},
    description: {type: String, require: true},
    rating: {type: Number, default: 0, require: true},
    numReviews: {type: Number, default: 0, require: true},
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;